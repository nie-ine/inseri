import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-decimal-value-editor',
  templateUrl: './decimal-value-editor.component.html',
  styleUrls: ['./decimal-value-editor.component.scss']
})
export class DecimalValueEditorComponent implements OnInit {

  @Input() oldValue;
  @Output() decimalValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  sendOutput(newValue: number) {
    this.decimalValue.emit({'decimal_value': newValue});
  }
}
