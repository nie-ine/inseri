import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { ActionService } from '../../shared/action.service';
import { AlertService} from '../../shared/altert.service';

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
    console.log(localStorage);
    console.log('Next: iterate through existing actions');
    this.actions = JSON.parse(localStorage.getItem('actions')) || [];
    console.log(this.actions);
  }

  deleteAction(action: any) {
    console.log('Delete Action ' + action.id);
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

  checkIfDeleted( action: any ) {
    console.log('Check if deleted ' + action.id);
    const actions = JSON.parse(localStorage.getItem('actions')) || [];
    for ( const existingActions of actions ) {
        console.log( existingActions.id );
        if ( action.id === existingActions.id ) {
          return true;
      } else {
          return false;
        }
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  model: any = {};
  loading = false;
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private actionService: ActionService,
              private alertService: AlertService) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  register() {
    this.loading = true;
    this.actionService.create(this.model)
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('Registration successful', true);
          // this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
