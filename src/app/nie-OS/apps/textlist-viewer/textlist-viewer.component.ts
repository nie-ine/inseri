import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-textlist-viewer',
  templateUrl: './textlist-viewer.component.html',
  styleUrls: ['./textlist-viewer.component.scss']
})
export class TextlistViewerComponent {
  @Input() textToDisplay;
  constructor() { }

}
