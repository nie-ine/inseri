import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-synopsis-load-light-table',
  templateUrl: './synopsis-load-light-table.component.html',
  styleUrls: ['./synopsis-load-light-table.component.scss']
})
export class SynopsisLoadLightTableComponent {

  loadSnapshotFormControl = new FormControl('');

  constructor(public dialogRef: MatDialogRef<SynopsisLoadLightTableComponent>,
              private synopsisObjectSerializerService: SynopsisObjectSerializerService) {
  }

  getAllFilenames(): string[] {
    return this.synopsisObjectSerializerService.getAllFilenames();
  }

  loadSnapshot(name: string) {
    this.synopsisObjectSerializerService.load(name);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
