import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';

@Component({
  selector: 'app-synopsis-save-light-table',
  templateUrl: './synopsis-save-light-table.component.html',
  styleUrls: ['./synopsis-save-light-table.component.scss']
})
export class SynopsisSaveLightTableComponent {

  filenameFormControl = new FormControl('');

  constructor(public dialogRef: MatDialogRef<SynopsisSaveLightTableComponent>,
              private synopsisObjectSerializerService: SynopsisObjectSerializerService) {
  }

  saveAndCloseDialog() {
    this.synopsisObjectSerializerService.save(this.filenameFormControl.value);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
