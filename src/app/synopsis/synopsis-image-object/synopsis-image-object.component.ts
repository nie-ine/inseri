import {Component, Input} from '@angular/core';
import {SynopsisObject} from '../synopsis-object';
import {SynopsisImageData} from '../synopsis-object-data';

@Component({
  selector: 'app-synopsis-image-object',
  templateUrl: './synopsis-image-object.component.html',
  styleUrls: ['./synopsis-image-object.component.scss']
})
export class SynopsisImageObjectComponent implements SynopsisObject {

  @Input() data: SynopsisImageData;

}
