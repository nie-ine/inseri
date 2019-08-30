import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-prime-editor',
  templateUrl: './prime-editor.component.html',
  styleUrls: ['./prime-editor.component.scss']
})
export class PrimeEditorComponent implements OnChanges {
  @Input() text: string;
  @Input() hash: string;
  @Input() type: string;
  @Output() sendTextBack: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnChanges() {
  }

  save() {
    this.sendTextBack.emit(
      {
        text: this.text,
        hash: this.hash,
        type: this.type
      }
    );
  }

}
