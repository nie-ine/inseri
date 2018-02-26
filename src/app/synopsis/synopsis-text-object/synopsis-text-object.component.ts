import {Component, Input} from '@angular/core';
import {SynopsisObject} from '../synopsis-object';
import {SynopsisTextData} from '../synopsis-object-data';

@Component({
  selector: 'app-synopsis-text-object',
  templateUrl: './synopsis-text-object.component.html',
  styleUrls: ['./synopsis-text-object.component.scss']
})
export class SynopsisTextObjectComponent implements SynopsisObject {
  @Input() data: SynopsisTextData;
}
