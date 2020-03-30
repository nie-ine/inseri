import { Component, Input, OnInit } from '@angular/core';

/**
 * deprecated
 * This component was intended for showing an object's properties with manually set values.
 */
@Component({
  selector: 'app-fact-sheet',
  templateUrl: './fact-sheet.component.html',
  styleUrls: ['./fact-sheet.component.scss']
})
export class FactSheetComponent implements OnInit {

  /**
   * List of the labels for the props.
   */
  @Input() labels: Array<any>;

  /**
   * List of properties in Knora v2 format.
   */
  @Input() props: any;

  /**
   * default written by angular-cli
   */
  constructor() { }

  /**
   * default written by angular-cli
   */
  ngOnInit() {

  }

}
