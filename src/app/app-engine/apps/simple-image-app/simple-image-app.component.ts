import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-image-app',
  templateUrl: './simple-image-app.component.html'
})
export class SimpleImageAppComponent implements OnChanges {
  @Input() imageURL: string;
  constructor() { }

  ngOnChanges() {
    if ( this.imageURL === undefined ) {
      this.imageURL = 'https://i5.walmartimages.com/asr/' +
        'c27ea99a-f737-4544-98d8-10e6ab7edac7_1.369c069765de792a1d31523a59cf9038.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF';
    } else {
      // console.log( this.imageURL );
    }
  }

}
