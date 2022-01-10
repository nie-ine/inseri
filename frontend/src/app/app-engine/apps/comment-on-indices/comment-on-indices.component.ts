import {Component, Input, OnInit} from '@angular/core';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QueryService} from '../../../user-action-engine/mongodb/query/query.service';
import {AuthService} from '../../../user-action-engine/mongodb/auth/auth.service';
import {CommentService} from '../../../user-action-engine/mongodb/comment/comment.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-comment-on-indices',
  templateUrl: './comment-on-indices.component.html',
  styleUrls: ['./comment-on-indices.component.scss']
})
export class CommentOnIndicesComponent implements OnInit {
  @Input() textFile: string;
  @Input() appInputQueryMapping: string;
  @Input() hash: string;
  @Input() forDashboard: boolean;
  @Input() commentArray: Array<any> = [];
  loggedIn = false;
  newComment: string;
  constructor(
    private requestService: GeneralRequestService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private queryService: QueryService,
    private commentService: CommentService
  ) { }

  ngOnInit() {

    if ( !this.authService.getIsAuth() ) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
    if ( !this.forDashboard ) {
      this.commentService.getCommentsOfPage( this.route.snapshot.queryParams.page )
        .subscribe(
          data => {
            //console.log( data );
            this.commentArray = data.comments;
            for ( let i = 0; i < this.commentArray.length; i++ ) {
              if (!this.commentArray[i].creator.usrProfileFilePath) {
                this.commentArray[i].creator.usrProfileFilePath = environment.app + '/assets/img/team/user-icon-vector.jpg';
                console.log(this.commentArray[i].creator.creatorProfilePhotoUrl);
              }
              this.createQueryInformationOfComment( i );
            }
          }, error => console.log( error )
        );
    } else {
      for ( let i = 0; i < this.commentArray.length; i++ ) {
        this.createQueryInformationOfComment( i );
      }
    }
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
      // console.log( result );
     // console.log(result.user);
      const newComment = {
        commentText: this.newComment,
          date: date,
        params: this.route.snapshot.queryParams,
        user: result.user.lastName + ', ' + result.user.firstName,
        queries: undefined,
        creator: result.user,
        userId: localStorage.getItem('userId'),
        page: this.route.snapshot.queryParams.page,
        action: this.route.snapshot.queryParams.actionID
      };
      console.log(newComment);
      this.commentArray.push(
        newComment
      );

      this.createQueryInformationOfComment( this.commentArray.length - 1 );

      this.commentService.createComment( newComment )
        .subscribe( data => {
          console.log( data );
        }, error => console.log( error ));

    });

  }

  createQueryInformationOfComment( index: number ) {
    for ( const param in this.commentArray[ index ].params ) {
      if ( param.search( ',' ) !== -1 ) {
        // console.log( param );
        // console.log( param.slice( 0, 24 ) );
        this.queryService.getQuery( param.slice( 0, 24 ) )
          .subscribe(
            data => {
              console.log( data );
              this.commentArray[ index ].queries = [];
              this.commentArray[ index ].queries.push({
                title: data.query.title,
                index: this.commentArray[ index ].params[ param ]
              });
            }, error => console.log( error )
          );
      }
    }
  }

  browseToComment( comment: any ) {
    this.router.navigate( ['/page'], {
      queryParams: comment.params,
      queryParamsHandling: 'merge'
    } );
  }

  deleteComment( commentId: string ) {
    for ( let i = 0; i < this.commentArray.length; i++ ) {
      if ( this.commentArray[ i ]._id === commentId ) {
        this.commentArray.splice(i, 1);
      }
    }
    console.log( commentId );
    this.commentService.deletecomment( commentId )
      .subscribe(
        data => {
          console.log( data );
        }, error => console.log( error )
      );
  }

  editComment( commentId: string, updatedText: string ) {
    this.commentService.updateText(commentId, updatedText)
      .subscribe(
        response => console.log(response),
        error => console.log( error )
      );
    for ( let i = 0; i < this.commentArray.length; i++ ) {
      if ( this.commentArray[ i ]._id === commentId ) {
        this.commentArray[ i ].commentText = updatedText;
      }
    }
  }


}
