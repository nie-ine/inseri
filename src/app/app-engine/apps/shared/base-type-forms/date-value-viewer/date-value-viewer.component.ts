import { Component, Input, OnInit } from '@angular/core';

/**
 * This components purpose is to make date values more readable.
 * Its only function is to take a date value and to show it.
 */
@Component({
  selector: 'app-date-value-viewer',
  templateUrl: './date-value-viewer.component.html',
  styleUrls: ['./date-value-viewer.component.scss']
})
export class DateValueViewerComponent implements OnInit {

  /**
   * The Knora date value as `{ 'calendar': <calendar>, 'era1': <era1>, 'dateval1': <dateval1>, 'era2': <era2>, 'dateval2': <dateval2> }
   */
  @Input() propertyValue: any;

  /**
   * Whether the date shall be shown as a range or as a date point.
   * @type {boolean}
   */
  useRange = true;

  /**
   * Whether the beginning era shall be displayed
   * @type {boolean}
   */
  showEra1 = false;

  /**
   * Whether the end year shall be displayed
   * @type {boolean}
   */
  showEra2 = false;

  /**
   * default written by angular-cli
   */
  constructor() {
  }

  /**
   * Initialize with setting parameters of what is to show.
   * Dates will be shown as a range if start and end are different.
   * The era will be shown for both values if they are BCE.
   * If a year is between 1 and 500, its era will be displayed.
   */
  ngOnInit() {

    if (this.propertyValue !== undefined) {

      if (this.propertyValue['dateval1'] === this.propertyValue['dateval2'] &&
        this.propertyValue['era1'] === this.propertyValue['era2']) {
        this.useRange = false;
      }

      if (this.propertyValue['era1'] === 'BCE') {
        this.showEra1 = true;
        this.showEra2 = true;
      }

      if (this.propertyValue['era2'] === 'BCE') {
        this.showEra1 = true;
        this.showEra2 = true;
      }

      if (Number(this.propertyValue['dateval1'].split('-')[0]) < 500) {
        this.showEra1 = true;
      }

      if (Number(this.propertyValue['dateval2'].split('-')[0]) < 500) {
        this.showEra2 = true;
      }
    }
  }

}
