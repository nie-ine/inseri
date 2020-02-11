import {AfterViewChecked, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit, AfterViewChecked {
  @Input() url: string;
  @HostListener('window:message', ['$event'])
  onMessage(e) {
    console.log( e );
  }
  sanitized = false;
  sanitizedUrl: SafeUrl;
  alreadySet = false;

  constructor(
    private sanitizer: DomSanitizer,
    public route: ActivatedRoute
  ) {
    this.sanitizedUrl = this.getSantizeUrl( this.url );
  }

  ngOnInit() {

    setTimeout(() => {
      console.log( 'send message' );
      const iframe = document.getElementById('iframe');
      const iWindow = (<HTMLIFrameElement>iframe).contentWindow;

      iWindow.postMessage({
        'for': 'user',
        'data': 'anything'
      }, 'http://localhost:4201');
    }, 2000);


  }

  ngAfterViewChecked(): void {
    if ( !this.alreadySet ) {
      this.alreadySet = true;
      this.sanitizedUrl = this.getSantizeUrl( this.url );
    }
    if ( this.route.snapshot.queryParams.url !== undefined && this.route.snapshot.queryParams.url !== this.url ) {
      this.url = this.route.snapshot.queryParams.url;
      this.sanitizedUrl = this.getSantizeUrl( this.url );
    }
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
