import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-value-viewer',
  templateUrl: './date-value-viewer.component.html',
  styleUrls: ['./date-value-viewer.component.scss']
})
export class DateValueViewerComponent implements OnInit {
  
  @Input() propertyValue: any;
  
  useRange: boolean = true;
  
  showEra1: boolean = false;
  showEra2: boolean = false;

  constructor() { }

  ngOnInit() {
    
    if (this.propertyValue != undefined) {
      
      if (this.propertyValue['dateval1'] == this.propertyValue['dateval2'] &&
      this.propertyValue['era1'] == this.propertyValue['era2']) {
        this.useRange = false;
      }
      
      if (this.propertyValue['era1'] == "BCE") {
        this.showEra1 = true;
        this.showEra2 = true;
      }
      
      if (this.propertyValue['era2'] == "BCE") {
        this.showEra1 = true;
        this.showEra2 = true;
      }
      
      if (Number(this.propertyValue['dateval1'].split('-')[0]) < 500) {
        this.showEra1 = true;
      }
      
      if (Number(this.propertyValue['dateval2'].split('-')[0]) < 500) {
        this.showEra1 = true;
      }
    }
  }

}
