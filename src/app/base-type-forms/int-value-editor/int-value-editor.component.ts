import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-int-value-editor',
  templateUrl: './int-value-editor.component.html',
  styleUrls: ['./int-value-editor.component.scss']
})
export class IntValueEditorComponent implements OnInit {

  @Input() oldValue;
  @Output() intValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  sendOutput(newValue: number) {
    const newIntValue = Math.floor(newValue);
    this.intValue.emit({'int_value': newIntValue});
  }
}
