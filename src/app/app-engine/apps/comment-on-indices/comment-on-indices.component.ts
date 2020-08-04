import {Component, Input, OnInit} from '@angular/core';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment-on-indices',
  templateUrl: './comment-on-indices.component.html',
  styleUrls: ['./comment-on-indices.component.scss']
})
export class CommentOnIndicesComponent implements OnInit {
  @Input() textFile: string;
  @Input() appInputQueryMapping: string;
  @Input() hash: string;
  commentArray: Array<any> = [];
  newComment: string;
  constructor(
    private requestService: GeneralRequestService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
  }

  save() {
    this.requestService.updateFile(
      this.appInputQueryMapping[ this.hash ][ 'textFile' ][ 'serverUrl' ].split('/')[ 6 ],
      {
        [this.hash]: {
          textFile: this.textFile
        }
      }
    )
      .subscribe(
        data => {
          console.log( data );
          window.location.reload();
        }, error => console.log( error )
      );
  }

  addComment() {
    let date = new Date();
    console.log( this.newComment );
    console.log( date );
    console.log( this.route.snapshot.queryParams );

    this.commentArray.push(
      {
        commentText: this.newComment,
        date: date,
        params: this.route.snapshot.queryParams
      }
    );

    console.log( this.commentArray );

  }

}
