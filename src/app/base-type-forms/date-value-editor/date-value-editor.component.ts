import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * This component is an improved version for input to change Knora V1 date values.
 * It takes the old value and gives the new value in a Knora V1 compatible format.
 */
@Component({
  selector: 'app-date-value-editor',
  templateUrl: './date-value-editor.component.html',
  styleUrls: ['./date-value-editor.component.scss']
})
export class DateValueEditorComponent implements OnInit {

  /**
   * Optionally take the old value as input for initialisation.
   */
  @Input() oldValue: any;

  /**
   * Calendar system JULIAN or GREGORIAN. Default GREGORIAN
   * @type {string}
   */
  calendar = 'GREGORIAN';

  /**
   * Era BCE (before common era) or CE (common era). Default CE
   * @type {string}
   */
  era1 = 'CE';

  /**
   * Start year of a range. Default 2000
   * @type {number}
   */
  year1 = 2000;

  /**
   * Month in start year. Default 0, i.e. only year granularity.
   * @type {number}
   */
  month1 = 0;

  /**
   * Day in start month. Default 0, i.e. only month granularity.
   * @type {number}
   */
  day1 = 0;

  /**
   * Give the year as a range or not. Default not.
   * @type {boolean}
   */
  useRange = false;

  /**
   * Era of the year in the end of the range
   * @type {string}
   */
  era2 = 'CE';

  /**
   * Year of the end of the range
   * @type {number}
   */
  year2 = 2000;

  /**
   * Month of the end of the range
   * @type {number}
   */
  month2 = 0;

  /**
   * Day of the end of the range
   * @type {number}
   */
  day2 = 0;

  /**
   * Output as event containing the formatted { 'date_value': <formatted value> } .
   * Sent out on any change.
   * @type {EventEmitter<any>}
   */
  @Output() dateValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  /**
   * If an old value is in the input, the variables are set to those values.
   */
  ngOnInit() {
    this.sendOutput();

    if (this.oldValue !== undefined) {

      if (this.oldValue['calendar'] !== undefined) {
        this.calendar = this.oldValue['calendar'];
      }

      if (this.oldValue['dateval1']) {
        const dateparts = this.oldValue['dateval1'].split('-');
        this.year1 = Number(dateparts[0]);

        if (dateparts.length > 1) {
          this.month1 = Number(dateparts[1]);
        }

        if (dateparts.length > 1) {
          this.day1 = Number(dateparts[2]);
        }
      }

      if (this.oldValue['dateval2'] !== undefined) {
        const dateparts = this.oldValue['dateval2'].split('-');
        this.year2 = Number(dateparts[0]);

        if (dateparts.length > 1) {
          this.month2 = Number(dateparts[1]);
        }

        if (dateparts.length > 1) {
          this.day2 = Number(dateparts[2]);
        }
      }

      if (this.oldValue['era1'] !== undefined) {
        this.era1 = this.oldValue['era1'];
      }

      if (this.oldValue['era2'] !== undefined) {
        this.era2 = this.oldValue['era2'];
      }
    }
  }

  /**
   * When the range is activated, the end is initialized equal to the first start date.
   * An output event is triggered, as this is a change.
   */
  changeRangeUsage() {

    this.era2 = this.era1;
    this.year2 = this.year1;
    this.month2 = this.month1;
    this.day2 = this.day1;

    this.sendOutput();
  }

  /**
   * When a change occurs the new falue is formatted and sent as an output.
   */
  sendOutput() {
    //   (GREGORIAN|JULIAN):YYYY[-MM[-DD]][ era][:YYYY[-MM[-DD]]][ era]
    //   'JULIAN:1291-08-01:1291-08-01'

    let dateString = this.calendar + ':' + this.year1;

    if (this.month1 !== 0) {
      dateString += '-' + ('00' + this.month1).slice(-2);

      if (this.day1 !== undefined && this.day1 !== 0) {
        dateString += '-' + ('00' + this.day1).slice(-2);
      }
    }

    dateString += ' ' + this.era1;

    if (this.useRange) {
      dateString += ':' + this.year2;
      if (this.month2 !== 0) {
        dateString += '-' + ('00' + this.month2).slice(-2);

        if (this.day2 !== undefined && this.day2 !== 0) {
          dateString += '-' + ('00' + this.day2).slice(-2);
        }
      }

      dateString += ' ' + this.era2;
    }

    this.dateValue.emit({'date_value': dateString});
  }
}
