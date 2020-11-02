import {Component, OnInit, Input, OnChanges, HostListener} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-textlist-viewer',
  templateUrl: './textlist-viewer.component.html',
  styleUrls: ['./textlist-viewer.component.scss']
})
export class TextlistViewerComponent implements OnChanges {
  @Input() textToDisplay;
  displayArray: boolean;
  safeHtml: SafeHtml;
  paramObj: any;
  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
    public router: Router,
    private route: ActivatedRoute
  ) {
  }

  @HostListener('click', ['$event'])
  public onClick(event) {
    // Handle same-page links with extra parameters through microservice-generated HTML
    // Indicate links with pageID and 1-n custom parameters:
    // e.g. /page?page=5f96f0f4a65e56001e21a3ee&verse-label=verse-001&param2=two
    if (event.target.tagName === 'A') {
      // Create object of all current parameters
      this.route.queryParamMap
        .subscribe((params) => {
            this.paramObj = { ...params.keys, ...params };
          }
        );
      // Get current pageID
      const currentPageID = this.paramObj.params.page;
      // Get page ID in microservice-generated link
      // It matches everything in the given href after 'page=' and before the next '&'
      const targetPageID = event.target.href.match(/(?<=page=)(.*?)(?=&)/)[1];

      // Check if it's a same-page link
      if ( currentPageID === targetPageID ) {
        // Get the complete custom parameter string after the given page ID + & (1-n)
        const targetParamsString = event.target.href.split(targetPageID + '&')[1];
        // Split the query parameter string at '&' to get each parameter (["param1=one", "param2=two"])
        const targetParams = targetParamsString.split('&');

        const addedParams = {};
        let i;
        for (i = 0; i < targetParams.length; i++) {
          const thisParam = targetParams[i].split('=');
          addedParams[thisParam[0]] = thisParam[1];
        }
        this.router.navigate( ['/page'], {
          queryParams: addedParams,
          queryParamsHandling: 'merge'
        } );
        event.preventDefault();
      } else {
        return;
      }
    } else {
      return;
    }
  }

  ngOnChanges() {
    if (  this.textToDisplay && this.textToDisplay.search( 'http' ) !== -1 ) {
      this.http.get( this.textToDisplay, { responseType: 'text' } )
        .subscribe(
          data => {
            // console.log( data );
            if ( data.search( 'utf-8' ) !== -1 && data.search( 'inseri' ) !== -1 ) { // check if response is html from inseri
              this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.textToDisplay);
            } else {
              this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml( data );
            }
          }, error => {
            this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.textToDisplay);
            // console.log( error );
          }
        );
    } else {
      this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.textToDisplay);
    }
  }

  linkify(linkText: string) {
    let replacedText;
    let replacePattern1;
    let replacePattern2;
    let replacePattern3;

    // URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = linkText.toString().replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    // Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
  }
}
