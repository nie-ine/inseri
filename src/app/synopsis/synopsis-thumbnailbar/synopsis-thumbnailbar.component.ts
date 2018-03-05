import {Component} from '@angular/core';
import {SynopsisObjectData, SynopsisObjectType} from '../synopsis-object-data';
import {SynopsisObjectStorageService} from '../synopsis-object-storage.service';

@Component({
  selector: 'app-synopsis-thumbnailbar',
  templateUrl: './synopsis-thumbnailbar.component.html',
  styleUrls: ['./synopsis-thumbnailbar.component.scss']
})
export class SynopsisThumbnailbarComponent {

  thumbnails: SynopsisObjectData[] = [];
  synopsisObjectTypes = SynopsisObjectType;

  constructor(private synopsisObjectStorageService: SynopsisObjectStorageService) {
    synopsisObjectStorageService.synopsisObjects$.subscribe(obj => this.thumbnails = obj);
  }

  removeHtml(htmlString: string) {
    const regex = /(<([^>]+)>)/ig;
    return htmlString.replace(regex, '');
  }

  closeThumbnail(index: number) {
    this.synopsisObjectStorageService.remove(index);
  }

}
