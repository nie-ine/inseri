import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-query-information-dialog',
  templateUrl: './query-information-dialog.component.html'
})
export class QueryInformationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<QueryInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log( data );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
