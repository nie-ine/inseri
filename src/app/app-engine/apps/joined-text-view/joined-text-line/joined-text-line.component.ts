import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { JoinedTextElement } from '../joined-text-view/joined-text-view.component';
import { JoinedTextLinepart } from '../joined-text-linepart/joined-text-linepart.component';
import { JoinedTextMargin } from '../joined-text-margin/joined-text-margin.component';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';

export interface JoinedTextLine extends JoinedTextElement {
  propertyDirection: string;
  propertyIri: string;
  sortByPropertyIri?: string;
  lineparts?: JoinedTextLinepart;
  farfarleft?: JoinedTextMargin;
  farleft?: JoinedTextMargin;
  left?: JoinedTextMargin;
  right?: JoinedTextMargin;
  farright?: JoinedTextMargin;
  farfarright?: JoinedTextMargin;

  linepartsStyleKeys?: string[];
  farfarleftStyleKeys?: string[];
  farleftStyleKeys?: string[];
  leftStyleKeys?: string[];
  rightStyleKeys?: string[];
  farrightStyleKeys?: string[];
  farfarrightStyleKeys?: string[];

  prefix?: string;
  prefixStyleKeys?: string[];
  interfix?: string;
  interfixStyleKeys?: string[];
  interfix2?: string;
  interfix2StyleKeys?: string[];
  suffix?: string;
  suffixStyleKeys?: string[];

  hoverable?: boolean;
  clickable?: boolean;

  /**
   * The ratio of the widths of the columns (far far left margin, far left, left margin, middle, right margin, far right, far far right)
   */
  columnRatio?: string[];
}

/**
 * A horizontal text element with the options of left and right columns for marginals or metadata
 */
@Component({
  selector: 'app-joined-text-line',
  templateUrl: './joined-text-line.component.html',
  styleUrls: ['./joined-text-line.component.scss']
})
export class JoinedTextLineComponent implements OnInit {

  @Input() parentIri: string;

  @Input() backendAddress;
  @Input() lineConfiguration: JoinedTextLine;

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

  lines: Array<any>;

  namespaces: any;

  /**
   * Default values for the column ratios.
   */
  widths = {
    farfarleftStyleKeys: '12.5%',
    farleftStyleKeys: '12.5%',
    leftStyleKeys: '12.5%',
    middleStyleKeys: '25%',
    rightStyleKeys: '12.5%',
    farrightStyleKeys: '12.5%',
    farfarrightStyleKeys: '12.5%'
  };

  /**
   * default written by angular-cli
   */
  constructor(private knoraV2Request: KnoraV2RequestService, private joinedTextViewKnoraRequest: JoinedTextViewKnoraRequestService) { }

  /**
   * written by angular-cli
   */
  ngOnInit() {
    if (this.lineConfiguration.columnRatio) {
      this.calculateWidths(this.lineConfiguration.columnRatio);
    }

    const graveSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.lineConfiguration, this.parentIri);

    this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
      .subscribe(d => {
        if (d['@graph']) {
          this.lines = d['@graph'];
        } else {
          this.lines = [d];
        }
        this.namespaces = d['@context'];
      }, error1 => {
        console.log(error1);
      });
  }

  /**
   * Given the declared relative column widths, calculate width percentages.
   */
  calculateWidths(columnRatio) {

    if (columnRatio[0]) {
      this.widths.farfarleftStyleKeys = columnRatio[0];
    } else {
      this.widths.farfarleftStyleKeys = '0';
    }

    if (columnRatio[1]) {
      this.widths.farleftStyleKeys = columnRatio[1];
    } else {
      this.widths.farleftStyleKeys = '0';
    }

    if (columnRatio[2]) {
      this.widths.leftStyleKeys = columnRatio[2];
    } else {
      this.widths.leftStyleKeys = '0';
    }

    if (columnRatio[3]) {
      this.widths.middleStyleKeys = columnRatio[3];
    } else {
      this.widths.middleStyleKeys = '100%';
    }

    if (columnRatio[4]) {
      this.widths.rightStyleKeys = columnRatio[4];
    } else {
      this.widths.rightStyleKeys = '0';
    }

    if (columnRatio[5]) {
      this.widths.farrightStyleKeys = columnRatio[5];
    } else {
      this.widths.farrightStyleKeys = '0';
    }

    if (columnRatio[6]) {
      this.widths.farfarrightStyleKeys = columnRatio[6];
    } else {
      this.widths.farfarrightStyleKeys = '0';
    }
  }

  clickChange(resIri: string) {
    this.clickedResourceChange.emit(resIri);
  }

  hoverChange(resIri: string) {
    this.hoveredResourceChange.emit(resIri);
  }

  /**
   * When a line is clicked, set the variable clickedResource to a words unique identifier
   * and communicate this as output clickedResourceChange.
   * @param lineIri: the unique identifier of a text element that is clicked
   */
  clickLine(lineIri: string) {
    if (this.lineConfiguration.clickable) {
      this.clickedResourceChange.emit(lineIri);
    }
  }

  /**
   * When the mouse hovers on a line, set the variable hoveredResource to a line's unique identifier and communicate this as output
   * hoveredResourceChange.
   * @param lineIri: the unique identifier of a text element that is clicked
   */
  hoverOntoLine(lineIri: string) {
    if (this.lineConfiguration.hoverable) {
      this.hoveredResourceChange.emit(lineIri);
    }
  }

  /**
   * When the mouse leaves from a line, reset the variable hoveredResource and communicate this as output hoveredResourceChange.
   */
  hoverOutOfLine() {
    if (this.lineConfiguration.hoverable) {
      this.hoveredResourceChange.emit(null);
    }
  }


  getStyleDict(paramKey) {
    const styles = {};

    if (this.styleDeclarations && this.lineConfiguration[paramKey]) {
      for (const b of this.styleDeclarations) {
        if (b[ 'type' ] === 'component') {
          if (this.lineConfiguration[paramKey].indexOf(b['name']) > -1) {
            for (const [key, value] of Object.entries((b['styles']))) {
              styles[key] = value;
            }
          }
        }
      }
    }
    if (this.highlighted && this.selectiveStyleDeclarations && this.lineConfiguration[paramKey]) {
      for (const s of this.highlighted ) {
        const z = this.selectiveStyleDeclarations[s];
        for (const b of z) {
          if (b[ 'type' ] === 'component') {
            if (this.lineConfiguration[paramKey].indexOf(b['name']) > -1) {
              for (const [key, value] of Object.entries((b['styles']))) {
                styles[key] = value;
              }
            }
          }
        }
      }
    }
    styles['width'] = this.widths[paramKey];
    return styles;
  }

}
