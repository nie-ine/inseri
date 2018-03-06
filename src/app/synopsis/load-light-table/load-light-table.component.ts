import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-load-light-table',
  templateUrl: './load-light-table.component.html',
  styleUrls: ['./load-light-table.component.scss']
})
export class LoadLightTableComponent {

  loadSnapshotFormControl = new FormControl('');

  constructor(public dialogRef: MatDialogRef<LoadLightTableComponent>,
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
