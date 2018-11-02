import {Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-update-page-set',
  templateUrl: './update-page-set.component.html',
  styleUrls: ['./update-page-set.component.scss']
})
export class UpdatePageSetComponent {

  constructor(public dialogRef: MatDialogRef<UpdatePageSetComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  save() {
    this.dialogRef.close(this.data);
  }

  cancel() {
    this.dialogRef.close();
  }
}
