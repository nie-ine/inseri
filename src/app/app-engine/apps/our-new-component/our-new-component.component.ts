import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-new-component',
  templateUrl: './our-new-component.component.html',
  styleUrls: ['./our-new-component.component.scss']
})
export class OurNewComponentComponent implements OnInit {

  constructor() { }
  ourFirstVariable: string;
  secondVariable: string;

  ngOnInit() {
    this.ourFirstVariable = 'Hello, this is our first classwide variable';
    this.secondVariable = this.ourFirstVariable + ' and sth added to the first string';
  }

}
