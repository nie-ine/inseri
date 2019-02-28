import {Component} from '@angular/core';
import {DUMMYSYNOPSISOBJECTS} from '../dummy-synopsis-objects';
import {SynopsisObjectData} from '../synopsis-object-data';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map, startWith} from 'rxjs/operators';
import {MatDialogRef} from '@angular/material';
import {SynopsisObjectStorageService} from '../synopsis-object-storage.service';

@Component({
  selector: 'app-synopsis-object-manager',
  templateUrl: './synopsis-object-manager.component.html',
  styleUrls: ['./synopsis-object-manager.component.scss']
})
export class SynopsisObjectManagerComponent {

  thumbnails: SynopsisObjectData[];
  objectCtrl: FormControl;
  filteredObjects: Observable<any[]>;
  private loadedObjects: Array<SynopsisObjectData>;

  constructor(public dialogRef: MatDialogRef<SynopsisObjectManagerComponent>,
              private synopsisObjectStorageService: SynopsisObjectStorageService) {
    this.thumbnails = DUMMYSYNOPSISOBJECTS;
    this.objectCtrl = new FormControl();
    this.filteredObjects = this.objectCtrl.valueChanges
      .pipe(
        startWith(''),
        map(obj => obj ? this.filterObjects(obj) : this.thumbnails.slice())
      );
    this.synopsisObjectStorageService.synopsisObjects$.subscribe(objList => this.loadedObjects = objList);
  }

  filterObjects(name: string): SynopsisObjectData[] {
    return this.thumbnails.filter(obj =>
      obj.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  checkIfLoaded(id: string) {
    return this.loadedObjects && this.loadedObjects.some(x => x.id === id);
  }

  saveAndCloseDialog() {
    const splittedValue = this.objectCtrl.value.split('-');
    this.synopsisObjectStorageService.add(this.thumbnails[splittedValue[splittedValue.length - 1]]);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
