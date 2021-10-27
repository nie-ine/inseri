import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { environment } from '../../../../environments/environment';

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
    if ( this.imageURL.search( 'test-node.nie-ine' ) !== -1 ) {
      console.log( 'replace query', environment.node );
      var oldUrl = this.imageURL;
      var newUrl = oldUrl.replace( 'http://test-node.nie-ine.ch', environment.node );
      console.log( newUrl );
      this.imageURL = newUrl;
      console.log( this.imageURL );
    }
    console.log( this.imageURL );
    if ( this.imageURL ) {
      this.imageURL = this.imageURL.replace( 'full/full', 'full/' + this.width + ',' );
    }
  }

}
