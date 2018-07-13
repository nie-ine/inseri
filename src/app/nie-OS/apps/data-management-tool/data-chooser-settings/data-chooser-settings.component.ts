import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatFormField
} from '@angular/material';

@Component({
  selector: 'app-data-chooser-settings',
  templateUrl: './data-chooser-settings.component.html',
  styleUrls: ['./data-chooser-settings.component.scss']
})
export class DataChooserSettingsComponent {
  model: any = {};
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<DataChooserSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
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
