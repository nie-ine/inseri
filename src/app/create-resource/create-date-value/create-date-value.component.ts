import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-date-value',
  templateUrl: './create-date-value.component.html',
  styleUrls: ['./create-date-value.component.scss']
})
export class CreateDateValueComponent implements OnInit {

  calendarSystem: string = 'GREGORIAN';
  
  era: string = 'CE';
  year: number = 2000;
  month: number = 0;
  day: number = 0;
  
  // date range instead of exact date
  useRange: boolean = false;
  endEra: string = 'CE';
  endYear: number = 2000;
  endMonth: number = 0;
  endDay: number = 0;
  
  // the formatted date string is constantly updated
  @Output() dateValue: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.sendOutput();
  }
  
  changeRangeUsage() {
    // initialize end date with same values as start date

    this.endEra = this.era;
    this.endYear = this.year;
    this.endMonth = this.month;
    this.endDay = this. day;

    this.sendOutput();
  }
  
  sendOutput() {
    // format and emit output string
    //   (GREGORIAN|JULIAN):YYYY[-MM[-DD]][ era][:YYYY[-MM[-DD]]][ era]
    //   'JULIAN:1291-08-01:1291-08-01'
    
    let dateString = this.calendarSystem + ':' + this.year;
    
    if (this.month != 0) {
      dateString += '-' + ("00" + this.month).slice (-2);
      
      if (this.day != undefined && this.day != 0) {
        dateString += '-' + ("00" + this.day).slice (-2);
      }
    }
    
    dateString += ' ' + this.era; 
    
    if (this.useRange) {
      dateString += ':' + this.endYear;
      if (this.endMonth != 0) {
        dateString += '-' + ("00" + this.endMonth).slice (-2);
      
        if (this.endDay != undefined && this.endDay != 0) {
          dateString += '-' + ("00" + this.endDay).slice (-2);
        }
      }
    
      dateString += ' ' + this.endEra; 
    }    
    this.dateValue.emit(dateString);
  }
}
