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

  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
    public router: Router,
    private route: ActivatedRoute
  ) {
  }

  @HostListener('click', ['$event'])
  public onClick(event) {
    // Handle same-page links or bookmarks of microservice-generated HTML
    // Check if <a>
    if (event.target.tagName === 'A') {
      // Get href
      const href = event.target.href;
      if (href.startsWith('inseriparams')) {
        const addedParams = {};
        const paramsString = href.split('inseriparams:')[1];
        const addToURL = paramsString.split('&');
        let i;
        for (i = 0; i < addToURL.length; i++) {
          const thisParam = addToURL[i].split('=');
          addedParams[thisParam[0]] = thisParam[1];
        }
        this.router.navigate(['/page'], {
          queryParams: addedParams,
          queryParamsHandling: 'merge'
        });
        event.preventDefault();
      } else if ( href.startsWith('inseribookmark')) {
        const element = document.getElementById(href.split('inseribookmark:#')[1]);
        element.scrollIntoView();
        event.preventDefault();
      } else { // if regular href
        return;
      }
    } else { // if not <a>
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
