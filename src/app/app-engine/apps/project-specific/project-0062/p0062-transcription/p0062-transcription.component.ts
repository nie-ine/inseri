import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-p0062-transcription',
  templateUrl: './p0062-transcription.component.html',
  styleUrls: ['./p0062-transcription.component.scss']
})
export class P0062TranscriptionComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() htmlContent;

  @Input() baseStyles;

  sanitizedContent;

  constructor(private elementRef: ElementRef, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);
  }

  ngOnChanges(changes: SimpleChanges): void{
  }

  ngAfterViewInit() {
    this.applyBasicStyles();
  }

  applyBasicStyles() {
    if (this.baseStyles) {
      for (const b of this.baseStyles['initial']) {

        if (b[ 'type' ] === 'tag') {
          const elements = this.elementRef.nativeElement.getElementsByTagName(b[ 'name' ]);
          for (const e of elements) {
            for (const [key, value] of Object.entries((b['styles']))) {
              e.style[ key ] = value;
            }
          }
        } else if (b[ 'type' ] === 'class') {
          const elements = this.elementRef.nativeElement.getElementsByClassName(b[ 'name' ]);
          for (const e of elements) {
            for (const [key, value] of Object.entries((b['styles']))) {
              e.style[ key ] = value;
            }
          }
        }
      }
    }
  }
}
