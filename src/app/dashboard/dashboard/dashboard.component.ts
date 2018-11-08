import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { ActionService } from '../../shared/nieOS/fake-backend/action/action.service';
import { AlertService} from '../../shared/nieOS/fake-backend/auth/altert.service';
import { MongoActionService } from '../../shared/nieOS/mongodb/action/action.service';
import { Action } from '../../shared/nieOS/mongodb/action/action.model';
import { map } from'rxjs/operators';
import {MongoContactService} from '../../shared/nieOS/mongodb/contact/contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any[] = JSON.parse(localStorage.getItem('currentUser')) || [];
  userFirstName: string;
  actions: Action[] = [];
  message: string;
  successfullySendMessage = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private actionService: ActionService,
    private alertService: AlertService,
    private mongoActionService: MongoActionService,
    private mongoContactService: MongoContactService
  ) {

    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }

  ngOnInit() {
    this.userFirstName = localStorage.getItem('firstName');
    this.updateActions();
  }

  private updateActions() {
    console.log('Next: iterate through existing actions');
    // this.actions = JSON.parse(localStorage.getItem('actions')) || [];
    this.mongoActionService.getAllActions()
      .pipe(
        map((response) => {
          return (response as any).actions.map(action => {
            return {
              title: action.title,
              description: action.description,
              type: action.type,
              id: action._id,
              creator: action.creator
            };
          });
        }))
      .subscribe( transformedActions => {
        console.log(transformedActions);
        this.actions = transformedActions;
      });
    console.log(this.actions);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '700px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(() => this.updateActions());
  }

  deleteAction(action: any) {
    console.log('Delete Action ' + action.id);
    action.deleted = true;
    this.mongoActionService.deleteAction( action.id).subscribe(() => this.updateActions());
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
    this.mongoContactService.sendMessage( this.message )
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
    hasViews: undefined
  };
  loading = false;
  chooseNewAction: string;

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private actionService: ActionService,
              private mongoActionService: MongoActionService ) {
  }

  close() {
    this.dialogRef.close();
  }

  register() {
    this.loading = true;
    this.mongoActionService.createAction(this.action)
      .subscribe((result) => {
        this.dialogRef.close(result);
      });
  }
}
