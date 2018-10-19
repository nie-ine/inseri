import { Component, OnInit, Inject } from '@angular/core';
import { ActionService } from '../../../shared/nieOS/fake-backend/action/action.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField} from '@angular/material';

@Component({
  selector: 'app-update-edition',
  templateUrl: './update-edition.component.html'
})
export class UpdateEditionComponent {

  model: any = {};
  loading = false;
  chooseNewAction: string;
  constructor(
    public dialogRef: MatDialogRef<UpdateEditionComponent>,
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
