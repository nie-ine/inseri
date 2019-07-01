import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JoinedTextElement } from '../joined-text-view/joined-text-view.component';
import { JoinedTextLine } from '../joined-text-line/joined-text-line.component';
import { JoinedTextBlock } from '../joined-text-block/joined-text-block.component';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';
import { JoinedTextLinepart } from '../joined-text-linepart/joined-text-linepart.component';

export interface JoinedTextMargin extends JoinedTextElement {
  propertyIri: string;
  propertyDirection: string;
  lines?: JoinedTextLine;
  lineparts?: JoinedTextLinepart;
  blocks?: JoinedTextBlock;
  contentProperty?: string;
  sortByPropertyIri?: string;
  styleKeys: string[];

  fixHeight?: boolean;
  overflowX?: string;
  overflowY?: string;
  whitespaceBehavior?: string;
}

/**
 * This component can be used in TextLineComponent to add text or objects left of the line.
 */
@Component({
  selector: 'app-joined-text-margin',
  templateUrl: './joined-text-margin.component.html',
  styleUrls: ['./joined-text-margin.component.scss']
})
export class JoinedTextMarginComponent implements OnInit {

  /**
   * True means that the content in this cannot increase the space between lines in TextLineComponent and stays fix
   */
  fixHeight = true;

  @Input() parentIri: string;

  @Input() backendAddress;
  @Input() marginConfiguration: JoinedTextMargin;

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

  margins: Array<any>;

  namespaces: any;

  /**
   * default written by angular-cli
   */
  constructor(private knoraV2Request: KnoraV2RequestService, private joinedTextViewKnoraRequest: JoinedTextViewKnoraRequestService) { }

  /**
   * written by angular-cli
   */
  ngOnInit() {

    if (this.marginConfiguration.fixHeight) {
      this.fixHeight = this.marginConfiguration.fixHeight;
    }

    const graveSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.marginConfiguration, this.parentIri);

    this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
      .subscribe(d => {
        if (d['@graph']) {
          this.margins = d['@graph'];
        } else {
          this.margins = [d];
        }
        this.namespaces = d['@context'];
      }, error1 => {
        console.log(error1);
      });
  }

  clickChange(resIri: string) {
    this.clickedResourceChange.emit(resIri);
  }

  hoverChange(resIri: string) {
    this.hoveredResourceChange.emit(resIri);
  }


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
