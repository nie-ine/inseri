import {Component} from '@angular/core';
import {SynopsisObjectData, SynopsisObjectType} from '../synopsis-object-data';
import {SynopsisObjectStorageService} from '../synopsis-object-storage.service';
import {MatDialog} from '@angular/material';
import {RemoveObjectsByIdComponent} from '../remove-objects-by-id/remove-objects-by-id.component';

@Component({
  selector: 'app-thumbnailbar',
  templateUrl: './thumbnailbar.component.html',
  styleUrls: ['./thumbnailbar.component.scss']
})
export class ThumbnailbarComponent {

  thumbnails: SynopsisObjectData[] = [];
  synopsisObjectTypes = SynopsisObjectType;

  constructor(public dialog: MatDialog,
              private synopsisObjectStorageService: SynopsisObjectStorageService) {
    synopsisObjectStorageService.synopsisObjects$.subscribe(obj => this.thumbnails = obj);
  }

  // noinspection JSMethodCanBeStatic
  removeHtml(htmlString: string) {
    const regex = /(<([^>]+)>)/ig;
    return htmlString.replace(regex, '');
  }

  closeThumbnail(index: number) {
    this.openRemoveObjectsByIdDialog(this.thumbnails[index].id);
    this.synopsisObjectStorageService.remove(index);
  }

  openRemoveObjectsByIdDialog(id: string): void {
    this.dialog.open(RemoveObjectsByIdComponent, {
      width: '500px',
      data: {id: id}
    });
  }
}
