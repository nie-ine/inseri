import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-our-demo-app',
  templateUrl: './our-demo-app.component.html',
  styleUrls: ['./our-demo-app.component.scss']
})
export class OurDemoAppComponent implements OnChanges {
  @Input() demoText: string;

  constructor() { }

  ngOnChanges() {
    console.log( 'Changes:' + this.demoText );
  }

}
