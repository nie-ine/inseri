import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { AlertService} from '../../shared/nieOS/fake-backend/auth/altert.service';
import { ActionService } from '../../shared/nieOS/mongodb/action/action.service';
import { Action } from '../../shared/nieOS/mongodb/action/action.model';
import { map } from 'rxjs/operators';
import {ContactService} from '../../shared/nieOS/mongodb/contact/contact.service';
import {EditActionComponent} from './edit-action/edit-action.component';
import { DeleteActionComponent } from './delete-action/delete-action.component';
import { QueryListComponent } from '../../nie-OS/query-list/query-list.component';

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

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private alertService: AlertService,
    private actionService: ActionService,
    private contactService: ContactService
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
  }

  private updateActions() {
    console.log('Next: iterate through existing actions');
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
            };
          });
        }))
      .subscribe( transformedActions => {
        console.log(transformedActions);
        this.actions = transformedActions;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '700px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.updateActions();
      if (result) {
        if (result[0] === 'pageSet') {
          this.router.navigate(['/page-set'], { queryParams: { actionID: result[1]}});
        }
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
    action.isFinished = true;
  }

  continueAction( action: any ) {
    this.router.navigate( [ action.type ], { queryParams: { 'actionID': action.id } } );
  }

  sendMessage() {
    console.log('Send Message');
    console.log(this.message);
    this.contactService.sendMessage( this.message )
      .subscribe( response => {
        console.log(response);
        this.successfullySendMessage = true;
      }, error1 => {
        console.log(error1);
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

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private router: Router,
              private actionService: ActionService ) {
  }

  close() {
    this.dialogRef.close(this.pageSet);
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

  register() {
    this.loading = true;
    this.actionService.createAction(this.action)
      .subscribe((result) => {
        if (this.action.type === 'page-set') {
          this.pageSet = ['pageSet', result.action._id];
        }
        this.dialogRef.close(this.pageSet);
      });
  }
}
