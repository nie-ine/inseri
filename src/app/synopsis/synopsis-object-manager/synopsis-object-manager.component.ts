import { Component, OnInit } from '@angular/core';
import { DUMMYSYNOPSISOBJECTS } from '../dummy-synopsis-objects';
import { SynopsisImageData, SynopsisObjectData, SynopsisTextData } from '../synopsis-object-data';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';
import { SynopsisObjectStorageService } from '../synopsis-object-storage.service';

@Component({
  selector: 'app-synopsis-object-manager',
  templateUrl: './synopsis-object-manager.component.html',
  styleUrls: ['./synopsis-object-manager.component.scss']
})
export class SynopsisObjectManagerComponent {

  thumbnails: SynopsisObjectData[];
  objectCtrl: FormControl;
  filteredObjects: Observable<any[]>;

  constructor(public dialogRef: MatDialogRef<SynopsisObjectManagerComponent>, private synopsisObjectStorageService: SynopsisObjectStorageService) {
    this.thumbnails = DUMMYSYNOPSISOBJECTS;
    this.objectCtrl = new FormControl();
    this.filteredObjects = this.objectCtrl.valueChanges
      .pipe(
        startWith(''),
        map(obj => obj ? this.filterObjects(obj) : this.thumbnails.slice())
      );
  }

  filterObjects(name: string): SynopsisObjectData[] {
    return this.thumbnails.filter(obj =>
      obj.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  closeDialog() {
    this.synopsisObjectStorageService.add(this.thumbnails[this.objectCtrl.value]);
    this.dialogRef.close();
  }

}
