import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../shared/models/person';
import {JulianDate} from '../../shared/models/julian-date';
import {Place} from '../../shared/models/place';

@Component({
  selector: 'app-edition-view-metadata',
  templateUrl: './edition-view-metadata.component.html',
  styleUrls: ['./edition-view-metadata.component.scss']
})
export class EditionViewMetadataComponent implements OnInit {

  @Input() authors: Person;
  @Input() title: string;
  @Input() date: JulianDate;
  @Input() place: Place;
  @Input() editors: Person;

  constructor() { }

  ngOnInit() {
  }

}
