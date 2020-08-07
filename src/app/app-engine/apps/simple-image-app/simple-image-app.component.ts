import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-image-app',
  templateUrl: './simple-image-app.component.html'
})
export class SimpleImageAppComponent implements OnChanges {
  @Input() imageURL: string;
  @Input() height: number;
  @Input() width: number;
  constructor() { }

  ngOnChanges() {
    console.log( this.imageURL );
    if ( this.imageURL ) {
      this.imageURL = this.imageURL.replace( 'full/full', 'full/' + this.width + ',' );
    }
  }

}
