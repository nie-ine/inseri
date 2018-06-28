import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-resource-view',
  templateUrl: './create-resource-view.component.html',
  styleUrls: ['./create-resource-view.component.scss']
})
export class CreateResourceViewComponent implements OnInit {

  projectIRI = 'http://rdfh.ch/projects/0041';
  constructor() { }

  ngOnInit() {
  }
  
  interpretPostedIRI(e) {
    alert(e);
  }

}
