import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * This component is an improved version for input to change Knora V1 data.
 * It takes the old value and gives the new value in a Knora V1 compatible format.
 */
@Component({
  selector: 'app-text-value-editor',
  templateUrl: './text-value-editor.component.html',
  styleUrls: ['./text-value-editor.component.scss']
})
export class TextValueEditorComponent implements OnInit {

  /**
   * Optional input with the old value to instanciate the input field
   */
  @Input() oldValue: any;

  /**
   * Event containing the new value like `{ 'richtext_value': { 'utf8str': <text> } }`
   * @type {EventEmitter<any>}
   */
  @Output() textValue: EventEmitter<any> = new EventEmitter<any>();

  /**
   * The new text value
   * @type {string}
   */
  newText = '';

  constructor() {
  }

  /**
   * On init check of an old value is defined. Set the new value to it if yes, start with an empty text of not.
   */
  ngOnInit() {
    if (this.oldValue) {
      try {
        this.newText = this.oldValue['utf8str'];
      } catch {
        this.newText = '';
      }
    }
  }

  /**
   * When the content changes, the new value is sent by event.
   * @param {string} newText
   */
  sendOutput(newText) {
    this.textValue.emit({'richtext_value': {'utf8str': newText}});
  }

}
