import {Component, Input, ViewChild} from '@angular/core';
import {SynopsisObject} from '../synopsis-object';
import {SynopsisTextData} from '../synopsis-object-data';

@Component({
  selector: 'app-synopsis-text-object',
  templateUrl: './synopsis-text-object.component.html',
  styleUrls: ['./synopsis-text-object.component.scss']
})
export class SynopsisTextObjectComponent implements SynopsisObject {

  @Input() data: SynopsisTextData;
  @ViewChild('textObject') textObject;
  nightView = false;
  rotation = 0;

  rotate(deg: number) {
    this.rotation = (this.rotation + deg) % 360;
  }

  toggleNightView() {
    this.nightView = !this.nightView;
  }

}
