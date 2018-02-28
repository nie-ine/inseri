import { Component } from '@angular/core';
import { SynopsisObjectData, SynopsisObjectType } from '../synopsis-object-data';
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
  synopsisObjectTypes = SynopsisObjectType;

  constructor(private synopsisObjectStorageService: SynopsisObjectStorageService, public dialog: MatDialog) {
    synopsisObjectStorageService.synopsisObjects$.subscribe(obj => this.thumbnails = obj);
  }

  openDialog(): void {
    this.dialog.open(SynopsisObjectManagerComponent, {
      width: '500px'
    });
  }

  removeHtml(htmlString: string) {
    const regex = /(<([^>]+)>)/ig;
    return htmlString.replace(regex, '');
  }

  closeThumbnail(index: number) {
    this.synopsisObjectStorageService.remove(index);
  }

}
