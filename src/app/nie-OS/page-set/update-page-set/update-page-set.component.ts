import { Component, OnInit, Inject } from '@angular/core';
import { ActionService } from '../../../shared/nieOS/fake-backend/action/action.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField} from '@angular/material';

@Component({
  selector: 'app-update-page-set',
  templateUrl: './update-page-set.component.html'
})
export class UpdatePageSetComponent {

  model: any = {};
  loading = false;
  chooseNewAction: string;

  constructor(
    public dialogRef: MatDialogRef<UpdatePageSetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private actionService: ActionService
  ) {
    this.model = data;
    console.log( data );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  register() {
    this.loading = true;
    console.log('register');
  }
}
