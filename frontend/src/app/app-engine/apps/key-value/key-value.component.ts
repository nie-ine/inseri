import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-key-value',
  templateUrl: './key-value.component.html',
  styleUrls: ['./key-value.component.scss']
})
export class KeyValueComponent implements OnChanges {

  @Input() key: string;
  @Input() value: string;

  constructor() { }

  ngOnChanges() {
  }

}
