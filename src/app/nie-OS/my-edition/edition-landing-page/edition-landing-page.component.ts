import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { ActionService } from '../../../shared/action.service';
import { AlertService} from '../../../shared/altert.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-edition-landing-page',
  templateUrl: './edition-landing-page.component.html',
  styleUrls: ['./edition-landing-page.component.scss']
})
export class EditionLandingPageComponent implements OnInit {

  animal: string;
  name: string;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateNewViewComponent, {
      width: '700px',
      data: { name: this.name, animal: this.animal }
    });
  }

}

@Component({
  selector: 'dialog-create-new-view',
  templateUrl: './dialog-create-new-view.html',
})
export class DialogCreateNewViewComponent {
  model: any = {};
  loading = false;
  chooseNewAction: string;
  constructor(public dialogRef: MatDialogRef<DialogCreateNewViewComponent>,
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
          console.log(this.model.type.search('salsah'));
          if ( this.model.type.search('salsah') !== -1 ) {
            console.log('Navigate to Salsah');
            window.open('http://salsah2.nie-ine.ch/', '_blank');
          } else {
            const params = new HttpParams().set('actionId', actions.lengt);
            params.append('actionId', actions.length);
            this.router.navigate( [ this.model.type ], { queryParams: { 'actionID': actions.length } } );
          }
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }
}
