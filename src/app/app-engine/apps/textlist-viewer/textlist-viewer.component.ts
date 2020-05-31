import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-textlist-viewer',
  templateUrl: './textlist-viewer.component.html',
  styleUrls: ['./textlist-viewer.component.scss']
})
export class TextlistViewerComponent implements OnChanges {
  @Input() textToDisplay;
  displayArray: boolean;
  safeHtml: SafeHtml;

  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient
  ) {
  }
  ngOnChanges() {
    console.log( 'Changes', this.textToDisplay );
    this.http.get( this.textToDisplay, { responseType: 'text' } )
      .subscribe(
        data => {
          console.log( data );
          this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml( data );
        }, error => {
          this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.textToDisplay);
          // console.log( error );
        }
      );
  }
}
