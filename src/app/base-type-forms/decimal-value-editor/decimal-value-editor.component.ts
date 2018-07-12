import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * This component is an improved version for input to change Knora V1 data.
 * It takes the old value and gives the new value in a Knora V1 compatible format.
 */
@Component({
  selector: 'app-decimal-value-editor',
  templateUrl: './decimal-value-editor.component.html',
  styleUrls: ['./decimal-value-editor.component.scss']
})
export class DecimalValueEditorComponent implements OnInit {

  /**
   * Optional input with the old value to instanciate the input field
   */
  @Input() oldValue;

  /**
   * Event containing the new value like { 'decimal_value': <number> }`
   * @type {EventEmitter<any>}
   */
  @Output() decimalValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * When the content changes, the new value is sent by event.
   * @param {number} newValue
   */
  sendOutput(newValue: number) {
    this.decimalValue.emit({'decimal_value': newValue});
  }
}
