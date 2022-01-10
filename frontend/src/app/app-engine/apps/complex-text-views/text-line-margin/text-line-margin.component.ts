import { Component, Input, OnInit } from '@angular/core';

/**
 * This component can be used in TextLineComponent to add text or objects left of the line.
 */
@Component({
  selector: 'app-text-line-margin',
  templateUrl: './text-line-margin.component.html',
  styleUrls: ['./text-line-margin.component.scss']
})
export class TextLineMarginComponent implements OnInit {

  /**
   * Behavior of the content in the left margin. 'normal' means floating text,
   * 'nowrap' makes an unbroken line of text (like CSS style white-space)
   */
  @Input() whitespaceBehavior = 'normal';

  /**
   * True means that the content in this cannot increase the space between lines in TextLineComponent and stays fix
   */
  @Input() fixHeight = true;

  /**
   * This corresponds to the CSS style overflow-x if the content does not break and overlaps into the TextLineComponent.
   * 'visible' makes it written into TextLineComponent.
   */
  @Input() overflowX = 'visible';

  /**
   * This corresponds to the CSS style overflow-y if the height cannot expand and overlaps into the TextLeftMarginComponent of the next row.
   * 'visible' makes it written into the text below.
   */
  @Input() overflowY = 'visible';

  /**
   * This corresponds to the CSS style background-color and makes it possible to use a background color behind for example line numbers.
   */
  @Input() backgroundColor = 'white';

  /**
   * default written by angular-cli
   */
  constructor() { }

  /**
   * written by angular-cli
   */
  ngOnInit() {
  }

}
