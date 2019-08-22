import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit, OnChanges {
  @Input() url: string;
  sanitized = false;
  sanitizedUrl: SafeUrl;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.sanitizedUrl = this.getSantizeUrl( this.url );
  }

  ngOnInit() {
    // console.log( this.url );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sanitizedUrl = this.getSantizeUrl( this.url );
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
