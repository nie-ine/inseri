import {Component, Input, OnInit} from '@angular/core';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QueryService} from '../../../user-action-engine/mongodb/query/query.service';
import {AuthService} from '../../../user-action-engine/mongodb/auth/auth.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private queryService: QueryService
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
    const date = new Date().toLocaleDateString('en-GB');
    console.log( this.newComment );
    console.log( date );
    console.log( this.route.snapshot.queryParams );

    this.authService.getUser(localStorage.getItem('userId')).subscribe((result) => {
      console.log( result );
      this.commentArray.push(
        {
          commentText: this.newComment,
          date: date,
          params: this.route.snapshot.queryParams,
          user: result.user.lastName + ', ' + result.user.firstName,
          queries: [],
          userId: localStorage.getItem('userId'),
          page: this.route.snapshot.queryParams.page,
          action: this.route.snapshot.queryParams.page.actionID
        }
      );

      for ( const param in this.commentArray[ this.commentArray.length - 1 ].params ) {
        if ( param.search( ',' ) !== -1 ) {
          console.log( param );
          console.log( param.slice( 0, 24 ) );
          this.queryService.getQuery( param.slice( 0, 24 ) )
            .subscribe(
              data => {
                console.log( data );
                this.commentArray[ this.commentArray.length - 1 ].queries.push({
                  title: data.query.title,
                  index: this.commentArray[ this.commentArray.length - 1 ].params[ param ]
                });
              }, error => console.log( error )
            );
        }
      }

      console.log( this.commentArray );
    });
  }

  browseToComment( comment: any ) {
    this.router.navigate( [], {
      queryParams: comment.params,
      queryParamsHandling: 'merge'
    } );
  }

}
