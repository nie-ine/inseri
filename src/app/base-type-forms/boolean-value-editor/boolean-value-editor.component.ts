import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * This component is an improved version for input to change Knora V1 data.
 * It takes the old value and gives the new value in a Knora V1 compatible format.
 */
@Component({
  selector: 'app-boolean-value-editor',
  templateUrl: './boolean-value-editor.component.html',
  styleUrls: ['./boolean-value-editor.component.scss']
})
export class BooleanValueEditorComponent implements OnInit {

  /**
   * Optional input with the old value to instanciate the input field
   */
  @Input() oldValue;

  /**
   * Event containing the new value like `{ 'boolean_value': true }`
   * @type {EventEmitter<any>}
   */
  @Output() booleanValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * When the content changes, the new value is sent by event.
   * @param {boolean} newValue
   */
  sendOutput(newValue: boolean) {
    this.booleanValue.emit({'boolean_value': newValue});
  }
}
