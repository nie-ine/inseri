import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-value-editor',
  templateUrl: './text-value-editor.component.html',
  styleUrls: ['./text-value-editor.component.scss']
})
export class TextValueEditorComponent implements OnInit {
  
  @Input() oldValue: any;
  @Output() textValue: EventEmitter<any> = new EventEmitter<any>();
  
  newText: string = '';
  
  constructor() { }

  ngOnInit() {
    if(this.oldValue) {
      try {
        this.newText = this.oldValue['utf8str'];
      } catch {
        this.newText = '';
      }
    }
  }
  
  sendOutput(newText) {
    this.textValue.emit({'text_value': { 'utf8str': newText }});
  }

}
