import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indirect-entry',
  templateUrl: './indirect-entry.component.html',
  styleUrls: ['./indirect-entry.component.scss']
})
export class IndirectEntryComponent implements OnInit {

  @Input() iri: string;

  constructor() { }

  ngOnInit() {


  }

}
