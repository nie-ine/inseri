import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnChanges {
  @Input() page: number;
  @Input() pdfLength: number;
  @Input () source: string;
  constructor() { }

  ngOnChanges() {
    console.log( this.page, this.source, this.pdfLength );
  }

}
