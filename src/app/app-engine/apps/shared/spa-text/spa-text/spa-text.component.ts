import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { KnoraV2RequestService } from '../../../../../query-engine/knora/knora-v2-request.service';

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

  /**
   * Sanitized HTML content.
   */
  content: any;

  /**
   * Constructor initializes KnoraV2Service, DomSanitizer
   * @param knora2request  Service to access data on a Knora instance
   * @param sanitizer  Bypass HTML security
   */
  constructor(private knora2request: KnoraV2RequestService, private sanitizer: DomSanitizer) { }

  /**
   * written by angular-cli
   */
  ngOnInit() {
    if (this.spaTextIri && this.databaseAddress) {
      this.getContent();
    }
  }

  /**
   * Get the content of a text resource.
   */
  getContent() {
    this.knora2request.getResourceFromSpecificInstance(this.spaTextIri, this.databaseAddress)
      .subscribe(d => {
        if (d['language:hasContent'] && d['language:hasContent']['knora-api:textValueAsXml']) {
          this.content = this.sanitizer.bypassSecurityTrustHtml(d[ 'language:hasContent' ][ 'knora-api:textValueAsXml' ]);
        }
      }, error1 => {
        console.log(error1);
      });
  }

}
