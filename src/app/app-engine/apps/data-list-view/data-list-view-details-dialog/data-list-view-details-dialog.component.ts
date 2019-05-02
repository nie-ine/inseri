import {Component, Inject, Injectable} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-data-list-view-details-dialog',
  templateUrl: './data-list-view-details-dialog.component.html'
})
@Injectable()
export class DataListViewDetailsDialogComponent {
  // DEFAULT values in case there is no message or button text passed from app
  message = '';
  cancelButtonText = 'close';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DataListViewDetailsDialogComponent>) {
    //
    // in case there is no data/message passed the default this.message will be displayed- Same for button text.
    //
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('800vw', '800vw');
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
