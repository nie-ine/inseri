import { Component, Input, OnInit } from '@angular/core';
import { SubjectTag } from './tag';

@Component({
  selector: 'app-tag-chips',
  templateUrl: './tag-chips.component.html',
  styleUrls: ['./tag-chips.component.scss']
})
export class TagChipsComponent implements OnInit {

  @Input() indexBasePath: string;
  @Input() tags: Array<SubjectTag>;

  constructor() { }

  ngOnInit() {
  }

}
