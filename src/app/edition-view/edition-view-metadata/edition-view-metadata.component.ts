import { Component, OnInit } from '@angular/core';
import {Person} from '../../shared/models/person';
import {JulianDate} from '../../shared/models/julian-date';

@Component({
  selector: 'app-edition-view-metadata',
  templateUrl: './edition-view-metadata.component.html',
  styleUrls: ['./edition-view-metadata.component.scss']
})
export class EditionViewMetadataComponent implements OnInit {

  author: Person;
  title: string;
  date: JulianDate;
  place: string;
  editor: Person;

  constructor() { }

  ngOnInit() {
  }

}
