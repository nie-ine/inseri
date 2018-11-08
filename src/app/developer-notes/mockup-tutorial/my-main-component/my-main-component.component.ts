import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-main-component',
  templateUrl: './my-main-component.component.html',
  styleUrls: ['./my-main-component.component.scss']
})
export class MyMainComponentComponent implements OnInit {

  mockupTexts = {
    text1: {
      zeile1: {
        text: 'Lorem Ipsum dolor Rom',
        zeile: 1
      },
      zeile2: {
        text: 'Dolor Impsum Lorem',
        zeile: 2,
        footnote: 'This is a footnote for testing purposes'
      },
    },
    text2: {
      zeile1: {
        text: 'Eins zwei Drei Bern',
        zeile: 1
      },
      zeile2: {
        text: 'Drei Zwei Eins',
        zeile: 2
      },
    },
    text3: {
      zeile1: {
        text: 'One two three London',
        zeile: 1
      },
      zeile2: {
        text: 'Three two one',
        zeile: 2
      },
    }
  };

  dictionary = {
    entryOne: {
      name: 'Bern',
      description: 'Verwaltungssitz Schweiz'
    },
    entryTwo: {
      name: 'London',
      description: 'Verwaltungssitz England'
    },
    entryThree: {
      name: 'Rom',
      description: 'Verwaltungssitz Italien'
    }
  };
  chosenText: any;
  constructor() { }

  ngOnInit() {
  }

  updateChosenText( chosenText: string ) {
    console.log( chosenText );
    this.chosenText = this.mockupTexts[ chosenText ];
  }

}
