import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { JoinedTextElement } from '../joined-text-view/joined-text-view.component';
import { JoinedTextLine } from '../joined-text-line/joined-text-line.component';
import { JoinedTextLinepart } from '../joined-text-linepart/joined-text-linepart.component';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';

export interface JoinedTextBlock extends JoinedTextElement {
  propertyIri: string;
  propertyDirection: string;
  sortByPropertyIri?: string;
  lines?: JoinedTextLine;
  lineparts?: JoinedTextLinepart;
}

/**
 * Combination of text lines into a specific form
 */
@Component({
  selector: 'app-joined-text-block',
  templateUrl: './joined-text-block.component.html',
  styleUrls: ['./joined-text-block.component.scss']
})
export class JoinedTextBlockComponent implements OnInit {

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
   * written by angular-cli
   */
  ngOnInit() {

    const graveSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.blockConfiguration, this.parentIri);

    this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
      .subscribe(d => {
        if (d['@graph']) {
          this.blocks = d['@graph'];
        } else {
          this.blocks = [d];
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

}
