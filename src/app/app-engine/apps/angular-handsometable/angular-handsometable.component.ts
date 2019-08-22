import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-handsometable',
  templateUrl: './angular-handsometable.component.html',
  styleUrls: ['./angular-handsometable.component.scss']
})
export class AngularHandsometableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  save() {
    console.log( 'Save' );
  }

}
