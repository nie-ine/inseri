import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textlist-viewer',
  templateUrl: './textlist-viewer.component.html',
  styleUrls: ['./textlist-viewer.component.scss']
})
export class TextlistViewerComponent {
  textToDisplay = [ 'test1', 'test2' ];
  constructor() { }

}
