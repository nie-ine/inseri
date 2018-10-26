import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnChanges {

  @Input() dictionary: any;
  constructor() { }

  ngOnChanges() {
    console.log(this.dictionary);
  }

}
