import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';
import { JoinedTextBlock } from './joined-text-block';

/**
 * Combination of text lines into a specific form
 */
@Component({
  selector: 'app-joined-text-block',
  templateUrl: './joined-text-block.component.html',
  styleUrls: ['./joined-text-block.component.scss']
})
export class JoinedTextBlockComponent implements OnChanges {

  /**
   * Address to the backend with the resource with parentIri.
   */
  @Input() backendAddress;

  /**
   * The parent resource of all resources displayed as blocks.
   */
  @Input() parentIri: string;

  /**
   * Configuration for this component.
   */
  @Input() blockConfiguration: JoinedTextBlock;

  /**
   * Default style declration.
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
   * The resources to be displayed as text blocks.
   */
  blocks: Array<any>;

  /**
   * The ontological namespaces by prefix.
   */
  namespaces: any;

  /**
   * default written by angular-cli
   */
  constructor(private knoraV2Request: KnoraV2RequestService, private joinedTextViewKnoraRequest: JoinedTextViewKnoraRequestService) { }

  /**
   * load new content with new input variables
   */
  ngOnChanges() {

    if (this.parentIri && this.blockConfiguration && this.backendAddress) {
      const graveSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.blockConfiguration, this.parentIri);

      this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
        .subscribe(d => {
          if (d[ '@graph' ]) {
            this.blocks = d[ '@graph' ];
          } else {
            this.blocks = [ d ];
          }
          this.namespaces = d[ '@context' ];
        }, error1 => {
          console.log(error1);
        });
    }
  }

  /**
   * When an element is clicked (in this component or in a child), give the identifier of that element as output to be used outside for
   * updating the query parameter.
   * @param resIri  The identifier of a the clicked resource that is further used as query parameter.
   */
  clickChange(resIri: string) {
    this.clickedResourceChange.emit(resIri);
  }

  /**
   * When an element is hovered over (in this component or in a child), give the identifier of that element as output to be used outside for
   * updating the query parameter.
   * @param resIri  The identifier of a the hovered resource that is further used as query parameter.
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

    if (this.styleDeclarations && this.blockConfiguration[paramKey]) {
      for (const b of this.styleDeclarations) {
        if (b[ 'type' ] === 'component') {
          if (this.blockConfiguration[paramKey].indexOf(b['name']) > -1) {
            for (const [key, value] of Object.entries((b['styles']))) {
              styles[key] = value;
            }
          }
        }
      }
    }
    if (this.highlighted && this.selectiveStyleDeclarations && this.blockConfiguration[paramKey]) {
      for (const s of this.highlighted ) {
        const z = this.selectiveStyleDeclarations[s];
        for (const b of z) {
          if (b[ 'type' ] === 'component') {
            if (this.blockConfiguration[paramKey].indexOf(b['name']) > -1) {
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
