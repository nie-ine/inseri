import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-line-number',
  templateUrl: './text-line-number.component.html',
  styleUrls: ['./text-line-number.component.scss']
})
export class TextLineNumberComponent implements OnInit {

  /**
   * Number of the line the line number is to be added.
   */
  @Input() lineNumber: number;

  /**
   * Interval with which the line numbers will be repeated and shown.
   */
  @Input() repeatAfter = 5;

  /**
   * Number where the line numbers start.
   */
  @Input() startRepeatingAt = 0;

  /**
   * A list of line numbers that will have labels in any case. E.g. '[1]' will enforce it on the first line.
   */
  @Input() forceLabelAt: Array<number> = [];

  /**
   * The text that is added next to a line representing the line number
   */
  label = '';

  constructor() { }

  /**
   * On creation of the component, the line number will be created as label to be shown.
   */
  ngOnInit() {
    if (this.forceLabelAt.indexOf(this.lineNumber) >= 0 ) {
      this.label = String(this.lineNumber);
    } else if ((this.lineNumber - this.startRepeatingAt) % this.repeatAfter === 0) {
      this.label = String(this.lineNumber);
    }

  }

}
