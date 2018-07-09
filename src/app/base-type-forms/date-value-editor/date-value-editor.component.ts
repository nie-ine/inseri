import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-value-editor',
  templateUrl: './date-value-editor.component.html',
  styleUrls: ['./date-value-editor.component.scss']
})
export class DateValueEditorComponent implements OnInit {
  
  @Input() oldValue: any;

  calendar: string = 'GREGORIAN';
  
  era1: string = 'CE';  
  year1: number = 2000;
  month1: number = 0;
  day1: number = 0;
  
  // date range instead of exact date
  useRange: boolean = false;
  
  era2: string = 'CE';
  year2: number = 2000;
  month2: number = 0;
  day2: number = 0;
  
  // the formatted date string is constantly updated
  @Output() dateValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.sendOutput();
    
    if (this.oldValue != undefined) {
         
      if (this.oldValue['calendar'] != undefined) {
        this.calendar = this.oldValue['calendar'];
      }
    
      if (this.oldValue['dateval1']) {
        let dateparts = this.oldValue['dateval1'].split('-');
        this.year1 = Number(dateparts[0]);

        if (dateparts.length > 1) {
          this.month1 = Number(dateparts[1]);
        }

        if (dateparts.length > 1) {
          this.day1 = Number(dateparts[2]);
        }
      }

      if (this.oldValue['dateval2'] != undefined) {
        let dateparts = this.oldValue['dateval2'].split('-');
        this.year2 = Number(dateparts[0]);

        if (dateparts.length > 1) {
          this.month2 = Number(dateparts[1]);
        }

        if (dateparts.length > 1) {
          this.day2 = Number(dateparts[2]);
        }
      }
      
      if (this.oldValue['era1'] != undefined) {
        this.era1 = this.oldValue['era1'];
      }
      
      if (this.oldValue['era2'] != undefined) {
        this.era2 = this.oldValue['era2'];
      }
    }
  }
  
  changeRangeUsage() {
    // initialize end date with same values as start date

    this.era2 = this.era1;
    this.year2 = this.year1;
    this.month2 = this.month1;
    this.day2 = this. day1;

    this.sendOutput();
  }
  
  sendOutput() {
    // format and emit output string
    //   (GREGORIAN|JULIAN):YYYY[-MM[-DD]][ era][:YYYY[-MM[-DD]]][ era]
    //   'JULIAN:1291-08-01:1291-08-01'
    
    let dateString = this.calendar + ':' + this.year1;
    
    if (this.month1 != 0) {
      dateString += '-' + ("00" + this.month1).slice (-2);
      
      if (this.day1 != undefined && this.day1 != 0) {
        dateString += '-' + ("00" + this.day1).slice (-2);
      }
    }
    
    dateString += ' ' + this.era1; 
    
    if (this.useRange) {
      dateString += ':' + this.year2;
      if (this.month2 != 0) {
        dateString += '-' + ("00" + this.month2).slice (-2);
      
        if (this.day2 != undefined && this.day2 != 0) {
          dateString += '-' + ("00" + this.day2).slice (-2);
        }
      }
    
      dateString += ' ' + this.era2; 
    }
    
    this.dateValue.emit({'date_value': dateString});
  }
}
