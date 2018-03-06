import {Component} from '@angular/core';
import {SynopsisObjectData, SynopsisObjectType} from '../synopsis-object-data';
import {SynopsisObjectStorageService} from '../synopsis-object-storage.service';

@Component({
  selector: 'app-thumbnailbar',
  templateUrl: './thumbnailbar.component.html',
  styleUrls: ['./thumbnailbar.component.scss']
})
export class ThumbnailbarComponent {

  thumbnails: SynopsisObjectData[] = [];
  synopsisObjectTypes = SynopsisObjectType;

  constructor(private synopsisObjectStorageService: SynopsisObjectStorageService) {
    synopsisObjectStorageService.synopsisObjects$.subscribe(obj => this.thumbnails = obj);
  }

  // noinspection JSMethodCanBeStatic
  removeHtml(htmlString: string) {
    const regex = /(<([^>]+)>)/ig;
    return htmlString.replace(regex, '');
  }

  closeThumbnail(index: number) {
    this.synopsisObjectStorageService.remove(index);
  }

}
