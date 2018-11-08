import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.scss']
})
export class TextDisplayComponent implements OnChanges {

  @Input() chosenText: any;
  textArray: Array<any> = [];
  constructor() { }

  ngOnChanges() {
    this.textArray = [];
    console.log('Text Display component on changes');
    console.log(this.chosenText);
    for ( const text in this.chosenText ) {
      console.log(text);
      console.log(this.chosenText[text]);
      const length = this.textArray.length
      this.textArray[ length ] = [];
      this.textArray[ length ].text = this.chosenText[text].text;
      this.textArray[ length ].zeile = this.chosenText[text].zeile;
      console.log(this.textArray);
    }
  }

  generateTextArray() {
    if ( !this.textArray ) {
      return [];
    } else {
      return this.textArray;
    }
  }

}
