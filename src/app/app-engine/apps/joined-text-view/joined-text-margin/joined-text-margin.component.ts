import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';
import { JoinedTextMargin } from './joined-text-margin';

/**
 * This component can be used in TextLineComponent to add text or objects left of the line.
 */
@Component({
  selector: 'app-joined-text-margin',
  templateUrl: './joined-text-margin.component.html',
  styleUrls: ['./joined-text-margin.component.scss']
})
export class JoinedTextMarginComponent implements OnChanges {

  /**
   * True means that the content in this cannot increase the space between lines in TextLineComponent and stays fix
   */
  fixHeight = true;

  /**
   * IRI of the resource that bundles the margin resources.
   */
  @Input() parentIri: string;

  /**
   * Address to the Knora instance with the text data.
   */
  @Input() backendAddress;

  /**
   * Configuration about the behaviour of this component.
   */
  @Input() marginConfiguration: JoinedTextMargin;

  /**
   * Default style declaration.
   */
  @Input() styleDeclarations: Array<StyleDeclaration>;

  /**
   * Dynamic style declarations.
   */
  @Input() selectiveStyleDeclarations: SelectableEnvironments;

  /**
   * Keys of selected selectiveStyleDeclarations.
   */
  @Input() highlighted: Array<string>;

  /**
   * The unique id of the word that was last clicked and counts as activated. Only one word can be counted as activated at a time.
   */
  @Input() clickedResource: string;

  /**
   * Give an event containing the unique word id if a word on the page description is clicked
   */
  @Output() clickedResourceChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The unique id of the word the mouse is hovering on.
   */
  @Input() hoveredResource: string;

  /**
   * Give an event containing the unique word id if the mouse hovers on a word in the page description
   */
  @Output() hoveredResourceChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Margins that are to be shown in this component (usually 1).
   */
  margins: Array<any>;

  /**
   * Namespaces around this resources.
   */
  namespaces: any;

  /**
   * default written by angular-cli
   */
  constructor(private knoraV2Request: KnoraV2RequestService, private joinedTextViewKnoraRequest: JoinedTextViewKnoraRequestService) { }

  /**
   * load content on changing input variables
   */
  ngOnChanges(changes: SimpleChanges) {

    if (this.marginConfiguration.fixHeight) {
      this.fixHeight = this.marginConfiguration.fixHeight;
    }

    if ((this.backendAddress && this.marginConfiguration && this.parentIri) && (changes['parentIri'] || changes['backendAddress'] || changes['marginConfiguration'])) {

      const gravSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.marginConfiguration, this.parentIri);

      this.knoraV2Request.extendedSearchFromSpecificInstance(gravSearchRequest, this.backendAddress)
        .subscribe(d => {
          if (d[ '@graph' ]) {
            this.margins = d[ '@graph' ];
          } else {
            this.margins = [ d ];
          }
          this.namespaces = d[ '@context' ];
        }, error1 => {
          console.log(error1);
        });
    }
  }

  /**
   * Give an event containing the unique word id if a word on the page description is clicked
   */
  clickChange(resIri: string) {
    this.clickedResourceChange.emit(resIri);
  }

  /**
   * Give an event containing the unique word id if the mouse hovers on a word in the page description
   */
  hoverChange(resIri: string) {
    this.hoveredResourceChange.emit(resIri);
  }

  /**
   * Using an external style definition, get all the CSS definition for this element, depending on keys.
   * @param paramKey  The key of the definitions of the style environment for this element.
   */
  getStyleDict(paramKey) {
    const styles = {};

    if (this.styleDeclarations && this.marginConfiguration[paramKey]) {
      for (const b of this.styleDeclarations) {
        if (b[ 'type' ] === 'component') {
          if (this.marginConfiguration[paramKey].indexOf(b['name']) > -1) {
            for (const [key, value] of Object.entries((b['styles']))) {
              styles[key] = value;
            }
          }
        }
      }
    }
    if (this.highlighted && this.selectiveStyleDeclarations && this.marginConfiguration[paramKey]) {
      for (const s of this.highlighted ) {
        const z = this.selectiveStyleDeclarations[s];
        for (const b of z) {
          if (b[ 'type' ] === 'component') {
            if (this.marginConfiguration[paramKey].indexOf(b['name']) > -1) {
              for (const [key, value] of Object.entries((b['styles']))) {
                styles[key] = value;
              }
            }
          }
        }
      }
    }
    return styles;
  }


}
