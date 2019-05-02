import { Component, Input, OnInit } from '@angular/core';

/**
 * A horizontal text element with the options of left and right columns for marginals or metadata
 */
@Component({
  selector: 'app-text-line',
  templateUrl: './text-line.component.html',
  styleUrls: ['./text-line.component.scss']
})
export class TextLineComponent implements OnInit {

  /**
   * Option to define the line breaking behavior of the text line. 'nowrap' makes an unbroken line. 'normal' makes floating text.
   * (Options of CSS style white-space)
   */
  @Input() whitespaceBehavior = 'nowrap';

  /**
   * The behavior of the text overflowing over the right border. 'visible' makes the content overlap with the content on the right.
   * (Options of CSS style overflow-x)
   */
  @Input() overflowX = 'visible';

  /**
   * The ratio of the widths of the columns (far far left margin, far left, left margin, middle, right margin, far right, far far right)
   */
  @Input() columnRatio = [1, 1, 1, 2, 1, 1, 1];

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
   * default witten by angular-cli
   */
  constructor() { }

  /**
   * written by angular-cli
   */
  ngOnInit() {
    this.calculateWidths();
  }

  /**
   * Given the declared relative column widths, calculate width percentages.
   */
  calculateWidths() {
    let sumOfRatios = 0;
    for (const s of this.columnRatio) {
      sumOfRatios += s;
    }

    if (this.columnRatio[0]) {
      this.widths.farfarleft = 100 / sumOfRatios * this.columnRatio[0] + '%';
    } else {
      this.widths.farfarleft = '0';
    }

    if (this.columnRatio[1]) {
      this.widths.farleft = 100 / sumOfRatios * this.columnRatio[1] + '%';
    } else {
      this.widths.farleft = '0';
    }

    if (this.columnRatio[2]) {
      this.widths.left = 100 / sumOfRatios * this.columnRatio[2] + '%';
    } else {
      this.widths.left = '0';
    }

    if (this.columnRatio[3]) {
      this.widths.middle = 100 / sumOfRatios * this.columnRatio[3] + '%';
    } else {
      this.widths.middle = '100%';
    }

    if (this.columnRatio[4]) {
      this.widths.right = 100 / sumOfRatios * this.columnRatio[4] + '%';
    } else {
      this.widths.right = '0';
    }

    if (this.columnRatio[5]) {
      this.widths.farright = 100 / sumOfRatios * this.columnRatio[5] + '%';
    } else {
      this.widths.farright = '0';
    }

    if (this.columnRatio[6]) {
      this.widths.farfarright = 100 / sumOfRatios * this.columnRatio[6] + '%';
    } else {
      this.widths.farfarright = '0';
    }
  }


}
