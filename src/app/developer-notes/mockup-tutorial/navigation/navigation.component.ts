import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() texts: any;
  // wichtig! in Angular kann man in html nur ueber Arrays iterieren.
  textArray: Array<any> = [];
  chosenTextIndex = 0;
  @Output() sendChosenTextIndexBack: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log(this.texts);
    this.textArray = Object.keys(this.texts);
  }

  iterateOptionsThroughJson() {
    console.log('Schleife 1 - keys');
    for ( const entry in this.texts ) {
      console.log('Key:' + entry);
    }
    console.log('Schleife 2 - values vom key');
    for ( const entry in this.texts ) {
      const length = this.textArray.length;
      this.textArray[ length ] = this.texts[ entry ];
      console.log( this.texts[ entry ] );
    }
    console.log(this.textArray);
    console.log('Schleife 3 - Erste Zeile jeden Eintrags');
    for ( const entry in this.texts ) {
      console.log( this.texts[ entry ].zeile1 );
    }
  }

  chooseText( chosenText: string ) {
    console.log(chosenText);
    this.sendChosenTextIndexBack.emit(
      chosenText
    );
  }

  chooseLeft() {
    if ( this.chosenTextIndex === 0 ) {
      this.chosenTextIndex = this.textArray.length - 1;
    } else {
      this.chosenTextIndex -= 1;
    }
    console.log(this.chosenTextIndex);
    console.log(this.textArray[this.chosenTextIndex]);
    const chosenText = this.textArray[this.chosenTextIndex];
    this.sendChosenTextIndexBack.emit(
      chosenText
    );
  }

  chooseRight() {
    if ( this.chosenTextIndex === this.textArray.length - 1 ) {
      this.chosenTextIndex = 0;
    } else {
      this.chosenTextIndex += 1;
    }
    console.log(this.chosenTextIndex);
    console.log(this.textArray[this.chosenTextIndex]);
    const chosenText = this.textArray[this.chosenTextIndex];
    this.sendChosenTextIndexBack.emit(
      chosenText
    );
  }
}
