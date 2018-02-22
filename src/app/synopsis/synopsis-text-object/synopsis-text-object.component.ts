import {Component, Input, OnInit} from '@angular/core';
import {SynopsisDataObject} from '../synopsis-data-object';

@Component({
  selector: 'app-synopsis-text-object',
  templateUrl: './synopsis-text-object.component.html',
  styleUrls: ['./synopsis-text-object.component.scss']
})
export class SynopsisTextObjectComponent implements SynopsisDataObject {

  @Input() data: any;

}
