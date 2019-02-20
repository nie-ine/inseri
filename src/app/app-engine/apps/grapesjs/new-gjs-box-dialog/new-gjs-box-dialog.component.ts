import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-new-gjs-box-dialog',
  templateUrl: './new-gjs-box-dialog.component.html'
})
export class NewGjsBoxDialogComponent {
  box: any = {};
  constructor(
    public dialogRef: MatDialogRef<NewGjsBoxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
