import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() texts: any;
  @Output() sendChosenTextIndexBack: EventEmitter<any> = new EventEmitter<any>();
  textArray: Array<any> = [];
  chosenTextIndex = 0;
  chosenText: string;
  constructor() { }

  ngOnInit() {
    console.log(this.texts);
    for ( const entry in this.texts ) {
      console.log(entry);
      console.log(this.texts[entry]);
      this.textArray[ this.textArray.length ] = entry;
    }
  }

  chooseOtherText() {
    if ( this.chosenTextIndex < this.textArray.length - 1 ) {
      this.chosenTextIndex += 1;
    } else {
      this.chosenTextIndex = 0;
    }
    this.chosenText = this.textArray[ this.chosenTextIndex ];
    this.sendChosenTextIndexBack.emit(
      this.textArray[ this.chosenTextIndex ]
    );
  }

}
