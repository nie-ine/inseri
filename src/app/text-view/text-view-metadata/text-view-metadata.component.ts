import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../shared/models/person';
import {JulianDate} from '../../shared/models/julian-date';
import {Place} from '../../shared/models/place';

@Component({
  selector: 'app-text-view-metadata',
  templateUrl: './text-view-metadata.component.html',
  styleUrls: ['./text-view-metadata.component.scss']
})
export class TextViewMetadataComponent implements OnInit {

  @Input() authors: Person;
  @Input() title: string;
  @Input() date: JulianDate;
  @Input() place: Place;
  @Input() editors: Person;

  constructor() { }

  ngOnInit() {
  }

}
