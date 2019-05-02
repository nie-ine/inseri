import { Component, Input, OnInit } from '@angular/core';
import { KnoraV2RequestService } from '../../../../../query-engine/knora/knora-v2-request.service';
import { StyleDeclaration } from '../text-rich-innerhtml/text-rich-innerhtml.component';
import { SelectableEnvironments } from '../text-rich-innerhtml/text-rich-innerhtml.component';

/**
 * This component is as of now a placeholder and should later be expanded to its full functionality for positional semantic annotations.
 */
@Component({
  selector: 'app-spa-text',
  templateUrl: './rich-text-by-iri.component.html',
  styleUrls: ['./rich-text-by-iri.component.scss']
})
export class RichTextByIriComponent implements OnInit {

  /**
   * The IRI of the text element that has annotations.
   */
  @Input() spaTextIri: string;

  /**
   * The database the text is on.
   */
  @Input() databaseAddress: string;

  /**
   * Plain HTML content.
   */
  @Input() htmlContent: string;

  /**
   * List of environments that are styled by default.
   */
  @Input() baseStyles: StyleDeclaration[];

  /**
   * Bundles of style environments that can selectively be applied.
   */
  @Input() selectableEnvironments: SelectableEnvironments;

  /**
   * Keys of selected style environment bundles.
   */
  @Input() selectedEnvironmentKeys: Set<string>;

  /**
   * Literal HTML content.
   */
  content: string;

  /**
   * Constructor initializes KnoraV2Service, DomSanitizer
   * @param knora2request  Service to access data on a Knora instance
   */
  constructor(private knora2request: KnoraV2RequestService) { }

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
          this.content = d[ 'language:hasContent' ][ 'knora-api:textValueAsXml' ];
        }
      }, error1 => {
        console.log(error1);
      });
  }

}
