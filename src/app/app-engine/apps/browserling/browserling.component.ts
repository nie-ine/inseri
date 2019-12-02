import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

declare var Browserling: any;

@Component({
  selector: 'app-browserling',
  templateUrl: './browserling.component.html',
  styleUrls: ['./browserling.component.scss']
})
export class BrowserlingComponent implements OnInit, AfterViewChecked {

  @Input() apiKey;
  urlBaseBrowserling = 'https://api.browserling.com/raw_browser?';
  @Input() platform_name;
  @Input() platform_version;
  @Input() browser;
  @Input() version;
  @Input() url;
  @Input() my_cursor;
  @Input() idle_timeout; // timeout after 60 seconds of idling;
  @Input() session_timeout; // session times out after 5 minutes
  @Input() resolution;
  sanitized = false;
  sanitizedUrl: SafeUrl;
  alreadySet = false;

  constructor(
    private sanitizer: DomSanitizer,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.generateUrl();
  }

  ngAfterViewChecked(): void {
    this.generateUrl();
  }

  generateUrl() {
    if (!this.alreadySet && this.checkIfAllParametersAreDefined()) {
      this.alreadySet = true;
      this.sanitizedUrl = this.getSantizeUrl(
        this.urlBaseBrowserling
        + '&api_key=' + encodeURIComponent(this.apiKey)
        + '&platform_name=' + encodeURIComponent( this.platform_name )
        + '&platform_version=' + encodeURIComponent( this.platform_version )
        + '&browser=' + encodeURIComponent( this.browser )
        + '&version=' + encodeURIComponent( this.version )
        + '&url=' + encodeURIComponent( this.url )
        + '&my_cursor=' + this.my_cursor
        + '&idle_timeout=' + this.idle_timeout
        + '&session_timeout=' + this.session_timeout
        + '&resolution=' + this.resolution
      );
    }
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  checkIfAllParametersAreDefined() {
    if (
      this.apiKey &&
      this.platform_name &&
      this.platform_version &&
      this.browser &&
      this.version &&
      this.url &&
      this.my_cursor &&
      this.idle_timeout &&
      this.session_timeout &&
      this.resolution
    ) {
      return true;
    } else {
      return false;
    }
  }

}
