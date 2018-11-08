import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  @Input() dictionary: any;
  dictionaryArray: Array<any> = [];
  constructor() { }

  ngOnInit() {
    console.log(this.dictionary);
    for ( const entry in this.dictionary ) {
      console.log(entry);
      console.log(this.dictionary[ entry ]);
      const length = this.dictionaryArray.length;
      this.dictionaryArray[ length ] = [];
      this.dictionaryArray[ length ].name = this.dictionary[ entry ].name;
      this.dictionaryArray[ length ].description = this.dictionary[ entry ].description;
      console.log(this.dictionaryArray);
    }
  }

}
