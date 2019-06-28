import { Component, Input, OnInit } from '@angular/core';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { JoinedTextElement } from '../joined-text-view/joined-text-view.component';
import { JoinedTextLinepart } from '../joined-text-linepart/joined-text-linepart.component';
import { JoinedTextWord } from '../joined-text-word/joined-text-word.component';
import { JoinedTextMargin } from '../joined-text-margin/joined-text-margin.component';

export interface JoinedTextLine extends JoinedTextElement {
  propertyDirection: string;
  propertyIri: string;
  lineparts?: JoinedTextLinepart;
  words?: JoinedTextWord;
  farfarleft?: JoinedTextMargin;
  farleft?: JoinedTextMargin;
  left?: JoinedTextMargin;
  right?: JoinedTextMargin;
  farright?: JoinedTextMargin;
  farfarright?: JoinedTextMargin;

  prefix?: string;
  interfix?: string;
  suffix?: string;

  whitespaceBehavior?: string;

  /**
   * The behavior of the text overflowing over the right border. 'visible' makes the content overlap with the content on the right.
   * (Options of CSS style overflow-x)
   */
  overflowX?: string;

  /**
   * The ratio of the widths of the columns (far far left margin, far left, left margin, middle, right margin, far right, far far right)
   */
  columnRatio?: number[];
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

  lines: Array<any>;

  namespaces: any;

  /**
   * Option to define the line breaking behavior of the text line. 'nowrap' makes an unbroken line. 'normal' makes floating text.
   * (Options of CSS style white-space)
   */
  whitespaceBehavior = 'nowrap';

  /**
   * The behavior of the text overflowing over the right border. 'visible' makes the content overlap with the content on the right.
   * (Options of CSS style overflow-x)
   */
  overflowX?: string;

  /**
   * Default values for the column ratios.
   */
  widths = {
    farfarleft: '12.5%',
    farleft: '12.5%',
    left: '12.5%',
    middle: '25%',
    right: '12.5%',
    farright: '12.5%',
    farfarright: '12.5%'
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

    if (this.lineConfiguration.overflowX) {
      this.overflowX = this.lineConfiguration.overflowX;
    }

    if (this.lineConfiguration.whitespaceBehavior) {
      this.whitespaceBehavior = this.lineConfiguration.whitespaceBehavior;
    }

    const graveSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.lineConfiguration, this.parentIri);

    this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
      .subscribe(d => {
        console.log(d);
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

    let sumOfRatios = 0;
    for (const s of columnRatio) {
      sumOfRatios += s;
    }

    if (columnRatio[0]) {
      this.widths.farfarleft = 100 / sumOfRatios * columnRatio[0] + '%';
    } else {
      this.widths.farfarleft = '0';
    }

    if (columnRatio[1]) {
      this.widths.farleft = 100 / sumOfRatios * columnRatio[1] + '%';
    } else {
      this.widths.farleft = '0';
    }

    if (columnRatio[2]) {
      this.widths.left = 100 / sumOfRatios * columnRatio[2] + '%';
    } else {
      this.widths.left = '0';
    }

    if (columnRatio[3]) {
      this.widths.middle = 100 / sumOfRatios * columnRatio[3] + '%';
    } else {
      this.widths.middle = '100%';
    }

    if (columnRatio[4]) {
      this.widths.right = 100 / sumOfRatios * columnRatio[4] + '%';
    } else {
      this.widths.right = '0';
    }

    if (columnRatio[5]) {
      this.widths.farright = 100 / sumOfRatios * columnRatio[5] + '%';
    } else {
      this.widths.farright = '0';
    }

    if (columnRatio[6]) {
      this.widths.farfarright = 100 / sumOfRatios * columnRatio[6] + '%';
    } else {
      this.widths.farfarright = '0';
    }
  }


}
