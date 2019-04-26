import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * This component is an improved version for input to change Knora V1 data.
 * It takes the old value and gives the new value in a Knora V1 compatible format.
 */
@Component({
  selector: 'app-int-value-editor',
  templateUrl: './int-value-editor.component.html',
  styleUrls: ['./int-value-editor.component.scss']
})
export class IntValueEditorComponent implements OnInit {

  /**
   * Optional input with the old value to instanciate the input field
   */
  @Input() oldValue;

  /**
   * Event containing the new value like `{ 'int_value': <number> }`. The value will be a number rounded down to the next integer.
   * @type {EventEmitter<any>}
   */
  @Output() intValue: EventEmitter<any> = new EventEmitter<any>();

  /**
   * default written by angular-cli
   */
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
    const newIntValue = Math.floor(newValue);
    this.intValue.emit({'int_value': newIntValue});
  }
}
