import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * This component is as of now a placeholder and should later be expanded to its full functionality for positional semantic annotations.
 */
@Component({
  selector: 'app-spa-text',
  templateUrl: './spa-text.component.html',
  styleUrls: ['./spa-text.component.scss']
})
export class SpaTextComponent implements OnInit {

  /**
   * The IRI of the text element that has annotations.
   */
  @Input() spaTextIri: string;

  /**
   * The database the text is on.
   */
  @Input() databaseAddress: string;

  basicAuthentication = 'email=root%40example.com&password=test'; // TODO: integrate into login framework

  content: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  /**
   * written by angular-cli
   */
  ngOnInit() {
    if (this.spaTextIri && this.databaseAddress) {
      this.getContent();
    }
  }

  getContent() {
    this.http.get(this.databaseAddress + '/v2/resources/' + encodeURIComponent(this.spaTextIri) + '?' + this.basicAuthentication)
      .subscribe(d => {
        if (d['language:hasContent'] && d['language:hasContent']['knora-api:textValueAsXml']) {
          this.content = this.sanitizer.bypassSecurityTrustHtml(d[ 'language:hasContent' ][ 'knora-api:textValueAsXml' ]);
        }
      });
  }

}
