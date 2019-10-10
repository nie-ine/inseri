import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-app-input-component',
  templateUrl: './app-input-component.component.html'
})
export class AppInputComponentComponent {

  constructor(
    public dialogRef: MatDialogRef<AppInputComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log( data );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
