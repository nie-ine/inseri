import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { ActionService } from '../../shared/action.service';
import { AlertService} from '../../shared/altert.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  animal: string;
  name: string;
  user: any[] = JSON.parse(localStorage.getItem('currentUser')) || [];
  username: string;
  actions: Array<any>;

  constructor(
    public dialog: MatDialog,
    router: Router,
    private actionService: ActionService,
    private alertService: AlertService
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '700px',
      data: { name: this.name, animal: this.animal }
    });

  }

  ngOnInit() {
    this.username = (this.user as any).firstName;
    console.log('Next: iterate through existing actions');
    this.actions = JSON.parse(localStorage.getItem('actions')) || [];
    console.log(this.actions);
  }

  deleteAction(action: any) {
    console.log('Delete Action ' + action.id);
    action.deleted = true;
    this.actionService.delete(action.id)
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('Deletion successful', true);
          // this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
        });
  }

  markAsDone( action: any ) {
    action.isFinished = true;
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  model: any = {};
  loading = false;
  chooseNewAction: string;
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private actionService: ActionService) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  register() {
    this.loading = true;
    this.actionService.create(this.model)
      .subscribe(
        data => {
          console.log('Action created');
          const actions = JSON.parse(localStorage.getItem('actions')) || [];
          console.log(actions);
          this.onNoClick();
          const params = new HttpParams().set('actionId', actions.lengt);
          params.append('actionId', actions.length);
          this.router.navigate( [ this.model.type ], { queryParams: { 'actionID': actions.length } } );
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }
}
