import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boolean-value-editor',
  templateUrl: './boolean-value-editor.component.html',
  styleUrls: ['./boolean-value-editor.component.scss']
})
export class BooleanValueEditorComponent implements OnInit {

  @Input() oldValue;
  @Output() booleanValue: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
  }
  
  sendOutput(newValue: boolean) {
    this.booleanValue.emit({'boolean_value': newValue})
  }
}
