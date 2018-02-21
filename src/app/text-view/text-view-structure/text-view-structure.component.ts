import { Component, OnInit } from '@angular/core';
import {Standoff} from '../../shared/models/standoff';

@Component({
  selector: 'app-text-view-structure',
  templateUrl: './text-view-structure.component.html',
  styleUrls: ['./text-view-structure.component.scss']
})
export class TextViewStructureComponent implements OnInit {

  structure: Array<Standoff>;

  constructor() { }

  ngOnInit() {
  }

}
