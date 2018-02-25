import {Component, Input, ViewChild} from '@angular/core';
import {SynopsisObject} from '../synopsis-object';
import {SynopsisImageData} from '../synopsis-object-data';

@Component({
  selector: 'app-synopsis-image-object',
  templateUrl: './synopsis-image-object.component.html',
  styleUrls: ['./synopsis-image-object.component.scss']
})
export class SynopsisImageObjectComponent implements SynopsisObject {

  @Input() data: SynopsisImageData;
  @ViewChild('imageObject') imageObject;
  nightView = false;
  rotation = 0;

  rotate(deg: number) {
    this.rotation = (this.rotation + deg) % 360;
  }

  toggleNightView() {
    this.nightView = !this.nightView;
  }
}
