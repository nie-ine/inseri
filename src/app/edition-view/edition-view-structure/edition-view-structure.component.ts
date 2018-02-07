import { Component, OnInit } from '@angular/core';
import {Standoff} from '../../shared/models/standoff';

@Component({
  selector: 'app-edition-view-structure',
  templateUrl: './edition-view-structure.component.html',
  styleUrls: ['./edition-view-structure.component.scss']
})
export class EditionViewStructureComponent implements OnInit {

  structure: Array<Standoff>;

  constructor() { }

  ngOnInit() {
  }

}
