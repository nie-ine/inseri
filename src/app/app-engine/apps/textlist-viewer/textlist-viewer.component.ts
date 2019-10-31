import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-textlist-viewer',
  templateUrl: './textlist-viewer.component.html',
  styleUrls: ['./textlist-viewer.component.scss']
})
export class TextlistViewerComponent implements OnChanges {
  @Input() textToDisplay;
  displayArray: boolean;
  constructor() {
  }
  ngOnChanges() {
    // console.log( 'Changes', this.textToDisplay );
  }
}
