import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fact-sheet',
  templateUrl: './fact-sheet.component.html',
  styleUrls: ['./fact-sheet.component.scss']
})
export class FactSheetComponent implements OnInit {

  @Input() labels: Array<any>;
  @Input() props: any;

  constructor() { }

  ngOnInit() {

  }

}
