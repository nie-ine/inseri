import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JoinedTextElement } from '../joined-text-view/joined-text-view.component';
import { JoinedTextLine } from '../joined-text-line/joined-text-line.component';
import { JoinedTextBlock } from '../joined-text-block/joined-text-block.component';
import { JoinedTextWord } from '../joined-text-word/joined-text-word.component';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';

export interface JoinedTextMargin extends JoinedTextElement {
  propertyIri: string;
  propertyDirection: string;
  lines?: JoinedTextLine;
  blocks?: JoinedTextBlock;
  words?: JoinedTextWord;
  contentProperty?: string;

  fixHeight?: string;
  overflowX?: string;
  overflowY?: string;
  whitespaceBehavior?: string;
  backgroundColor?: string;
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
   * Behavior of the content in the left margin. 'normal' means floating text,
   * 'nowrap' makes an unbroken line of text (like CSS style white-space)
   */
  whitespaceBehavior = 'normal';

  /**
   * True means that the content in this cannot increase the space between lines in TextLineComponent and stays fix
   */
  fixHeight = 'true';

  /**
   * This corresponds to the CSS style overflow-x if the content does not break and overlaps into the TextLineComponent.
   * 'visible' makes it written into TextLineComponent.
   */
  overflowX = 'visible';

  /**
   * This corresponds to the CSS style overflow-y if the height cannot expand and overlaps into the TextLeftMarginComponent of the next row.
   * 'visible' makes it written into the text below.
   */
  overflowY = 'visible';

  /**
   * This corresponds to the CSS style background-color and makes it possible to use a background color behind for example line numbers.
   */
  backgroundColor = 'white';



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
  @Input() clickedWord: string;

  /**
   * Give an event containing the unique word id if a word on the page description is clicked
   */
  @Output() clickedWordChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The unique id of the word the mouse is hovering on.
   */
  @Input() hoveredWord: string;

  /**
   * Give an event containing the unique word id if the mouse hovers on a word in the page description
   */
  @Output() hoveredWordChange: EventEmitter<string> = new EventEmitter<string>();

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

    if (this.marginConfiguration.overflowX) {
      this.overflowX = this.marginConfiguration.overflowX;
    }

    if (this.marginConfiguration.overflowY) {
      this.overflowY = this.marginConfiguration.overflowY;
    }

    if (this.marginConfiguration.whitespaceBehavior) {
      this.whitespaceBehavior = this.marginConfiguration.whitespaceBehavior;
    }

    if (this.marginConfiguration.backgroundColor) {
      this.backgroundColor = this.marginConfiguration.backgroundColor;
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


}
