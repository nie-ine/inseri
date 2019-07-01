import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JoinedTextLine } from '../joined-text-line/joined-text-line.component';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { JoinedTextElement } from '../joined-text-view/joined-text-view.component';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';

export interface JoinedTextLinepart extends JoinedTextElement {
  propertyIri: string;
  propertyDirection: string;
  sortByPropertyIri?: string;
  lineparts?: JoinedTextLinepart;
  clickable?: boolean;
  hoverable?: boolean;

  prefix?: string;
  interfix?: string;
  suffix?: string;
}

/**
 * A horizontal text element with the options of left and right columns for marginals or metadata
 */
@Component({
  selector: 'app-joined-text-linepart',
  templateUrl: './joined-text-linepart.component.html',
  styleUrls: ['./joined-text-linepart.component.scss']
})
export class JoinedTextLinepartComponent implements OnInit {

  @Input() parentIri: string;

  @Input() backendAddress;
  @Input() linepartConfiguration: JoinedTextLine;
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

  namespaces: any;

  /**
   * default written by angular-cli
   */
  constructor(private knoraV2Request: KnoraV2RequestService, private joinedTextViewKnoraRequest: JoinedTextViewKnoraRequestService) { }

  /**
   * written by angular-cli
   */
  ngOnInit() {

    const graveSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.linepartConfiguration, this.parentIri);

    this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
      .subscribe(d => {
        if (d['@graph']) {
          this.lineparts = d['@graph'];
        } else {
          this.lineparts = [d];
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

}
