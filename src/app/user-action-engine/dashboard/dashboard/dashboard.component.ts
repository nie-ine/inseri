import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { ActionService } from '../../mongodb/action/action.service';
import { Action } from '../../mongodb/action/action.model';
import { map } from 'rxjs/operators';
import {ContactService} from '../../mongodb/contact/contact.service';
import {EditActionComponent} from './edit-action/edit-action.component';
import { DeleteActionComponent } from './delete-action/delete-action.component';
import { QueryListComponent } from '../../../query-engine/query-list/query-list.component';
import {PageService} from '../../mongodb/page/page.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../mongodb/auth/auth.service';
import { UsergroupService } from '../../mongodb/usergroup/usergroup.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any[] = JSON.parse(localStorage.getItem('currentUser')) || [];
  userFirstName: string;
  userID: string;
  actions: Action[] = [];
  message: string;
  successfullySendMessage = false;
  showArchivedDocuments = false;
  showUserGroups = false;
  userGroups: Array<any> = [];
  selected = 'option1';

  /**
   * Describes if user is logged in
   * */
  loggedIn = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private actionService: ActionService,
    private contactService: ContactService,
    private pageService: PageService,
    private authService: AuthService,
    private usergroupService: UsergroupService
  ) {

    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }

  ngOnInit() {
    this.userFirstName = localStorage.getItem('firstName');
    this.userID = localStorage.getItem('userId');
    this.updateActions();

    /**
     * If not logged in, preview instatiates the published page options.
     * */
    if ( !this.authService.getIsAuth() ) {
      this.loggedIn = false;
    }
    this.getUserGroups();
  }

  getUserGroups() {
    this.usergroupService.getAllUserGroups()
      .subscribe(
        usergroupresponse => {
          console.log( usergroupresponse );
          this.userGroups = ( usergroupresponse as any).body.groups;
        },
        error => console.log( error )
      );
  }

  private updateActions() {
    this.actionService.getAllActionsOfUser(this.userID)
      .pipe(
        map((response) => {
          return (response as any).actions.map(action => {
            return {
              title: action.title,
              description: action.description,
              type: action.type,
              id: action._id,
              creator: action.creator,
              hasPage: (action.hasPage) ? action.hasPage : null,
              hasPageSet: (action.hasPageSet) ? action.hasPageSet : null,
              isFinished: action.isFinished
            };
          });
        }))
      .subscribe( transformedActions => {
        console.log(transformedActions);
        this.actions = transformedActions;
        for ( const action of this.actions ) {
          if ( action.type === 'page-set' ) {
            this.actionService.getAction(action.id)
              .subscribe(data => {
                if ( data.body.action.hasPageSet.hasPages !== null && data.body.action.hasPageSet.hasPages[ 0 ]._id ) {
                  action.hasPage = data.body.action.hasPageSet.hasPages[ 0 ]._id;
                }
              }, error => {
                console.log(error);
              });
          }
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '700px',
      data: {
        showUserGroups: this.showUserGroups
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.updateActions();
      this.getUserGroups();
      if (result) {
        console.log( result );
        const newPage: any = {};
        this.actionService.getAction( result[ 1 ] )
          .subscribe(
            actionResult => {
              newPage.title = actionResult.body.action.title;
              newPage.description = actionResult.body.action.description;
              this.pageService.createPage(actionResult.body.action.hasPageSet._id, newPage)
                .subscribe((result2) => {
                  this.router.navigate(['/page'],
                    { queryParams:
                        { actionID: actionResult.body.action._id,
                          page: result2.page._id
                        }
                    });
                }, error => {
                  console.log( error );
                });
            }, error => {
              console.log( error );
            }
        );
      }
    });
  }

  editAction(action: any) {
    const dialogRef = this.dialog.open(EditActionComponent, {
      width: '700px',
      data: action
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        this.updateActions();
      });
  }

  deleteAction(action: any) {
    const dialogRef = this.dialog.open(DeleteActionComponent, {
      width: '700px',
      data: action
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        this.updateActions();
      });
  }

  markAsDone( action: any ) {
    if ( action.isFinished === true ) {
      action.isFinished = false;
    } else {
      action.isFinished = true;
    }
    this.actionService.updateAction( action )
      .subscribe(
        data => {
          console.log( data );
        }, error => {
          console.log( error );
        }
      );
  }

  continueAction( action: any ) {
    this.router.navigate( [ '/page' ],
      {
        queryParams: {
          'actionID': action.id,
          'page': action.hasPage
        },
      });
  }

  goToDocumentIndex( action: any ) {
    this.router.navigate( [ '/page-set' ],
      {
        queryParams: {
          'actionID': action.id
        },
      });
  }

  sendMessage() {
    console.log('Send Message');
    console.log(this.message);
    this.contactService.sendMessage( this.message )
      .subscribe( response => {
        console.log(response);
        this.successfullySendMessage = true;
        this.message = '';
      }, error1 => {
        console.log(error1);
      });
  }

  openQueryList() {
    const dialogRef = this.dialog.open(QueryListComponent, {
      width: '100%',
      height: '100%',
      data: {
        enableAdd: false
      }
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  action: Action = {
    id: undefined,
    title: '',
    description: '',
    isFinished: false,
    deleted: false,
    type: undefined,
    hasPageSet: undefined,
    hasPage: undefined,
    creator: undefined
  };
  loading = false;
  chooseNewAction: string;
  pageSet: [string, string];
  usergroup: any = {};

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private router: Router,
              private actionService: ActionService,
              private usergroupService: UsergroupService) {
  }

  close() {
    this.dialogRef.close(this.pageSet);
  }

  register() {
    this.loading = true;
    this.action.type = 'page-set';
    this.actionService.createAction(this.action)
      .subscribe((result) => {
        if (this.action.type === 'page-set') {
          this.pageSet = ['pageSet', result.action._id];
        }
        this.dialogRef.close(this.pageSet);
      });
  }

  createUserGroup() {
    console.log( this.usergroup.title, this.usergroup.description );
    this.usergroupService.createGroup(
      this.usergroup.title,
      this.usergroup.description )
      .subscribe(
        data => {
          console.log( data );
          this.dialogRef.close(data);
        }, error => {
          console.log( error );
        }
      );
  }
  assignUserToGroup() {
    this.usergroupService.assignUserToGroup(
      this.usergroup)
      .subscribe(
        response => {
          console.log(response);
        },
      error => {
          console.log( error );
        }
      );
  }
}
