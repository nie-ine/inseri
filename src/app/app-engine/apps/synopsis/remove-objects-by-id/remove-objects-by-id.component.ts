import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';

@Component({
  selector: 'app-remove-objects-by-id',
  templateUrl: './remove-objects-by-id.component.html',
  styleUrls: ['./remove-objects-by-id.component.scss']
})
export class RemoveObjectsByIdComponent {

  constructor(public dialogRef: MatDialogRef<RemoveObjectsByIdComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private synopsisObjectModifierService: SynopsisObjectModifierService) {
  }

  removeAndCloseDialog() {
    this.synopsisObjectModifierService.closeObjectsById(this.data.id);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
