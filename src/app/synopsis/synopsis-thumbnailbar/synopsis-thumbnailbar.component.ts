import { Component } from '@angular/core';
import { SynopsisObjectData } from '../synopsis-object-data';
import { SynopsisObjectStorageService } from '../synopsis-object-storage.service';
import { MatDialog } from '@angular/material';
import { SynopsisObjectManagerComponent } from '../synopsis-object-manager/synopsis-object-manager.component';

@Component({
  selector: 'app-synopsis-thumbnailbar',
  templateUrl: './synopsis-thumbnailbar.component.html',
  styleUrls: ['./synopsis-thumbnailbar.component.scss']
})
export class SynopsisThumbnailbarComponent {

  thumbnails: SynopsisObjectData[] = [];

  constructor(private synopsisObjectStorageService: SynopsisObjectStorageService, public dialog: MatDialog) {
    synopsisObjectStorageService.synopsisObjects$.subscribe(obj => this.thumbnails = obj);
  }

  removeObject(uid: number) {
    this.synopsisObjectStorageService.remove(uid);
  }

  openDialog(): void {
    this.dialog.open(SynopsisObjectManagerComponent, {
      width: '500px'
    });
  }

}
