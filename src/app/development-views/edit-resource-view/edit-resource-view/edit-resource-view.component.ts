import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-resource-view',
  templateUrl: './edit-resource-view.component.html',
  styleUrls: ['./edit-resource-view.component.scss']
})
export class EditResourceViewComponent implements OnInit {
  
  resourceIRI: string = 'http://rdfh.ch/0041/Atharvaveda/cIQgaupHTfyrHZNt80MUvA';

  constructor() { }

  ngOnInit() {
  }

}
