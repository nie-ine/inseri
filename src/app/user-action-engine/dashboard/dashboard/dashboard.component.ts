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
import {PageListDialogComponent} from '../../../app-engine/page/page-list-dialog/page-list-dialog.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {PageSetService} from '../../mongodb/pageset/page-set.service';
import {FileService} from '../../file/file.service';
import * as JSZipUtils from 'jszip-utils';
import * as Fs from 'fs';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import {CommentService} from '../../mongodb/comment/comment.service';
import {error} from 'util';

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
  usergroup: any = {};
  groupMembers: Array<any> = [];
  email: string;
  showComments = false;
  commentArray: Array<any> = [];


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
    private usergroupService: UsergroupService,
    private spinner: NgxSpinnerService,
    private commentService: CommentService
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
    this.commentService.getAllCommentsOfUser()
      .subscribe(
        data => {
          console.log( data );
          this.commentArray = ( data as any ).comments;
        }, error1 => console.log( error1 )
      );
  }

  getUserGroups() {
    console.log( 'get user groups' );
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
        console.log( transformedActions );
        this.actions = transformedActions;
      });
  }

  createHasPage() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '700px',
      data: {
        showUserGroups: this.showUserGroups
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.updateActions();
      this.getUserGroups();
      if (result) {
        console.log( result );
        const newPage: any = {};
        this.actionService.getAction( result[ 1 ] )
          .subscribe(
            actionResult => {
              console.log('actionService - get Action: ');
              console.log(actionResult);
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
    if ( action.type === 'page-set' ) {
      this.actionService.getAction(action.id)
        .subscribe(data => {
          if ( data.body.action.hasPageSet.hasPages !== null && data.body.action.hasPageSet.hasPages[ 0 ]._id ) {
            action.hasPage = data.body.action.hasPageSet.hasPages[ 0 ]._id;
            this.router.navigate( [ '/page' ],
              {
                queryParams: {
                  'actionID': action.id,
                  'page': action.hasPage
                },
              });
          }
        }, error => {
          console.log(error);
        });
    }
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

  assignUserToGroup() {
    this.usergroupService.assignUserToGroup(
      this.usergroup, this.email)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log( error );
        }
      );
  }
  removeUserFromGroup() {
    this.usergroupService.removeUserFromGroup(
      this.usergroup, this.email)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log( error );
        }
      );
  }
  showGroupMembers( title: string ) {
    console.log( 'show group members' );
    this.usergroupService.showGroupMembers( title )
      .subscribe(
        groupMembers => {
          console.log( groupMembers );
          this.groupMembers = ( groupMembers as any).body.result.users;
        },
        error => {
          console.log( error );
        });
  }

  openAllPagesDialog() {
    const dialogRef = this.dialog.open(PageListDialogComponent, {
      width: '100%',
      height: '80%',
      data: {
        showDuplicateButton: false
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log( result );
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private router: Router,
              private actionService: ActionService,
              private pageSetService: PageSetService,
              private pageService: PageService,
              private usergroupService: UsergroupService,
              private fileService: FileService) {
  }
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

  // importProjectAsFile($event: Event) {
  //   let project = {};
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.fileService.addZipFileToSrvr(file).subscribe(responseData => {
  //     console.log(responseData);
  //     const path = './backend/files/' + responseData.fileName;
  //     console.log(path);
  //     const fileReader = new FileReader();
  //     fileReader.onload = (e) => {
  //       this.action = JSON.parse(fileReader.result.toString());
  //       project = JSON.parse(fileReader.result.toString());
  //       const detailsArray = Object.entries(project).map((e) => ({[e[0]]: e[1]}));
  //       // console.log(detailsArray);
  //       // console.log('the action is');
  //       // console.log(this.action);
  //
  //       let action, pageSet, pages, queries;
  //       for (let i = 0; i < detailsArray.length; i++) {
  //         console.log(detailsArray[i]);
  //         if (detailsArray[i]['action']) {
  //           action = JSON.parse(JSON.parse(JSON.stringify(detailsArray[i]))['action']);
  //         } else if (detailsArray[i]['pageSet']) {
  //           pageSet = JSON.parse(JSON.parse(JSON.stringify(detailsArray[i]))['pageSet']);
  //         } else if (detailsArray[i]['pages']) {
  //           pages = JSON.parse(JSON.parse(JSON.stringify(detailsArray[i]))['pages']);
  //         } else if (detailsArray[i]['queries']) {
  //           queries = JSON.parse(JSON.parse(JSON.stringify(detailsArray[i]))['queries']);
  //         }
  //         // console.log(detailsArray['action']);
  //       }
  //       console.log(action, pageSet, pages, queries);
  //       console.log('calling the create Project function');
  //       this.actionService.createProject(action, pageSet, pages, queries)
  //         .subscribe((actionResult) => {
  //           if (action.type === 'page-set') {
  //             this.pageSet = ['pageSet', action._id];
  //           }
  //           this.dialogRef.close(this.pageSet);
  //         });
  //
  //       // console.log(fileReader.result);
  //     };
  //     fileReader.readAsText(file);
  //     //
  //     // console.log(readStream);
  //   });
  //
  // }
  p_pageSetId: string;

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
  deleteUserGroup(title: string) {
    console.log( 'show group members' );
    this.usergroupService.deleteGroup( title )
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log( error );
        }
      );
  }

  importProjectAsZip($event: Event) {
    const zipFile = (event.target as HTMLInputElement).files[0];
    let action, pageSet, pages, queries, allFiles, jsonQueries, oldHostUrl, filesJson;
    // const projectFiles = [];
    const projectFiles = new Array<{fileName: string, fileContent: Blob}>();
    let counter = 0;
    JSZip.loadAsync(zipFile)
      .then(function (zip) {
        allFiles = Object.entries(zip.files);
        counter = allFiles.length;
        zip.forEach(function (relativePath, zipEntry) {
          if (!zipEntry.dir) {
            zip.file(relativePath).async('text').then(function (content) {
              if (relativePath === 'action.json') {
                action = content; // JSON.parse(JSON.parse(JSON.stringify(content)));
                counter--;
              } else if (relativePath === 'pageSet.json') {
                pageSet = content; // JSON.parse(JSON.parse(JSON.stringify(content)));
                counter--;
              } else if (relativePath === 'pages.json') {
                pages = content; // JSON.parse(JSON.parse(JSON.stringify(content)));
                counter--;
              } else if (relativePath === 'queries.json') {
                if (content.length > 0) {
                  queries = content; // JSON.parse(JSON.parse(JSON.stringify(content)));
                }
                counter--;
              } else if (relativePath === 'JSONFile.json') {
                if (content.length > 0) {
                  jsonQueries = content; // JSON.parse(JSON.parse(JSON.stringify(content)));
                }
                counter--;
              } else if (relativePath === 'files.json') {
                if (content.length > 0) {
                  filesJson = content; // JSON.parse(JSON.parse(JSON.stringify(content)));
                }
                counter--;
              } else if (relativePath === 'oldHostUrl.txt') {
                if (content.length > 0) {
                  oldHostUrl = content;
                  counter--;
                }
              } else {
                zip.file(relativePath).async('blob').then(content => {
                  projectFiles.push({fileName: relativePath.substr(6), fileContent: content});
                  // new File([content], relativePath.substr(6)));
                  console.log(projectFiles);
                });
                counter--;
              }
            });
          } else { // The folders were counted as well
            counter--;
          }
        });
      });
    let isFinished = false;
    const mainObject = this;
    const timeout = setInterval(function () {
      if (!isFinished && counter === 0) {
        clearInterval(timeout);
        isFinished = true;
        mainObject.actionService.createProject(action, pageSet, pages, queries, jsonQueries, oldHostUrl, filesJson, projectFiles)
          .subscribe((actionResult) => {
            if (action.type === 'page-set') {
              mainObject.pageSet = ['pageSet', action._id];
            }
            mainObject.dialogRef.close(mainObject.pageSet);
          });
      }
    }, 100);
  }
  reloadProject(pageSetId: string) {
    console.log(pageSetId);
    this.actionService.reloadProject(pageSetId)
      .subscribe((actionResult) => {
        if (actionResult.type === 'page-set') {
          this.pageSet = ['pageSet', actionResult._id];
        }
        this.dialogRef.close(this.pageSet);
      });
  }
  reloadFiles() {
    this.fileService.reloadFiles().subscribe( fileResults => {
      console.log(fileResults);
    });
  }
}
