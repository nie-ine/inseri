import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';
import { JoinedTextLinepart } from './joined-text-linepart';

/**
 * A horizontal text element with the options of left and right columns for marginals or metadata
 */
@Component({
  selector: 'app-joined-text-linepart',
  templateUrl: './joined-text-linepart.component.html',
  styleUrls: ['./joined-text-linepart.component.scss']
})
export class JoinedTextLinepartComponent implements OnChanges {

  /**
   * Identifier of the parent of the line parts.
   */
  @Input() parentIri: string;

  /**
   * Address to the Knora instance with the data
   */
  @Input() backendAddress;

  /**
   * The parameters for the line part behaviour.
   */
  @Input() linepartConfiguration: JoinedTextLinepart;

  /**
   * Default style declarations.
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

  lineparts: Array<any>;

  /**
   * Namespaces around this this resource.
   */
  namespaces: any;

  /**
   * default written by angular-cli
   */
  constructor(private knoraV2Request: KnoraV2RequestService, private joinedTextViewKnoraRequest: JoinedTextViewKnoraRequestService) { }

  /**
   * load content with changing input variables
   */
  ngOnChanges() {

    if (this.backendAddress && this.linepartConfiguration && this.parentIri) {
      const graveSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.linepartConfiguration, this.parentIri);

      this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
        .subscribe(d => {
          if (d[ '@graph' ]) {
            this.lineparts = d[ '@graph' ];
          } else {
            this.lineparts = [ d ];
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
   * Give an event containing the unique word id if a word on the page description is clicked
   */
  hoverChange(resIri: string) {
    this.hoveredResourceChange.emit(resIri);
  }

  /**
   * When a line part is clicked, set the variable clickedResource to a parts unique identifier
   * and communicate this as output clickedResourceChange.
   * @param resIri: the unique identifier of a text element that is clicked
   */
  clickLinepart(resIri: string) {
    if (this.linepartConfiguration.clickable) {
      this.clickedResourceChange.emit(resIri);
    }
  }

  /**
   * When the mouse hovers on a line part, set the variable hoveredResource to a part's unique identifier and communicate this as output
   * hoveredResourceChange.
   * @param resIri: the unique identifier of a text element that is clicked
   */
  hoverOntoLinepart(resIri: string) {
    if (this.linepartConfiguration.hoverable) {
      this.hoveredResourceChange.emit(resIri);
    }
  }

  /**
   * When the mouse leaves from a line part, reset the variable hoveredResource and communicate this as output hoveredResourceChange.
   */
  hoverOutOfLinepart() {
    if (this.linepartConfiguration.hoverable) {
      this.hoveredResourceChange.emit(null);
    }
  }

  /**
   * Using an external style definition, get all the CSS definition for this element, depending on keys.
   * @param paramKey  The key of the definitions of the style environment for this element.
   * @param resId  The identifier of the element for specific highlighting.
   */
  getStyleDict(paramKey, resId) {
    const styles = {};

    if (this.styleDeclarations && this.linepartConfiguration[paramKey]) {
      for (const b of this.styleDeclarations) {
        if (b[ 'type' ] === 'component') {
          if (this.linepartConfiguration[paramKey].indexOf(b['name']) > -1) {
            for (const [key, value] of Object.entries((b['styles']))) {
              styles[key] = value;
            }
          }
        }
      }
    }
    if (this.highlighted && this.selectiveStyleDeclarations && this.linepartConfiguration[paramKey]) {
      for (const s of this.highlighted ) {
        const z = this.selectiveStyleDeclarations[s];
        for (const b of z) {
          if (b[ 'type' ] === 'component') {
            if (this.linepartConfiguration[paramKey].indexOf(b['name']) > -1) {
              for (const [key, value] of Object.entries((b['styles']))) {
                styles[key] = value;
              }
            }
          }
        }
      }
    }

    if (resId && resId === this.hoveredResource) {
      styles['background-color'] = this.linepartConfiguration.hoverColor;
    }

    if (resId && resId === this.clickedResource) {
      styles['background-color'] = this.linepartConfiguration.clickColor;
    }

    return styles;
  }

}
