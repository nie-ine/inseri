import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-parzival-fassung',
  templateUrl: './parzival-fassung.component.html',
  styleUrls: ['./parzival-fassung.component.scss']
})
export class ParzivalFassungComponent implements OnChanges {
  @Input() textJson: any;
  zeilen: Array<any> = [];
  constructor() { }

  ngOnChanges() {
    console.log( this.textJson );
    if ( this.textJson ) {
      this.zeilen = this.textJson.zeilen;
    }
  }

}
