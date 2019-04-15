import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


interface StyleDeclaration {
  type: string;
  name: string;
  styles: {
    [key: string]: string;
  };
}

interface SelectableEnvironments {
  [key: string]: Array<StyleDeclaration>;
}

@Component({
  selector: 'app-p0062-transcription',
  templateUrl: './p0062-transcription.component.html',
  styleUrls: ['./p0062-transcription.component.scss']
})
export class P0062TranscriptionComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() htmlContent: string;

  @Input() baseStyles: StyleDeclaration[];

  @Input() selectableEnvironments: SelectableEnvironments;

  @Input() selectedEnvironmentKeys: Set<string>;

  sanitizedContent;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.cleanHtmlContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.clearStyles();
    this.applyBasicStyles();
    this.applySelectedStyles();
  }

  ngAfterViewInit() {
    this.applyBasicStyles();
    this.applySelectedStyles();
  }

  cleanHtmlContent() {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);
  }

  applyBasicStyles() {
    if (this.baseStyles) {
      for (const b of this.baseStyles) {

        if (b[ 'type' ] === 'tag') {
          const elements = this.elementRef.nativeElement.getElementsByTagName(b[ 'name' ]);
          for (const e of elements) {
            for (const [key, value] of Object.entries((b['styles']))) {
              this.renderer.setStyle(e, key, value);
            }
          }
        } else if (b[ 'type' ] === 'class') {
          const elements = this.elementRef.nativeElement.getElementsByClassName(b[ 'name' ]);
          for (const e of elements) {
            for (const [key, value] of Object.entries((b['styles']))) {
              this.renderer.setStyle(e, key, value);
            }
          }
        }
      }
    }
  }

  applySelectedStyles() {
    if (this.selectedEnvironmentKeys && this.selectableEnvironments) {
      for (const s of Array.from(this.selectedEnvironmentKeys) ) {
        const z = this.selectableEnvironments[s];
        for (const b of z) {
          if (b[ 'type' ] === 'tag') {
            const elements = this.elementRef.nativeElement.getElementsByTagName(b[ 'name' ]);
            for (const e of elements) {
              for (const [key, value] of Object.entries((b['styles']))) {
                this.renderer.setStyle(e, key, value);
              }
            }
          } else if (b[ 'type' ] === 'class') {
            const elements = this.elementRef.nativeElement.getElementsByClassName(b[ 'name' ]);
            for (const e of elements) {
              for (const [key, value] of Object.entries((b['styles']))) {
                this.renderer.setStyle(e, key, value);
              }
            }
          }
        }
      }
    }
  }

  clearStyles() {
    if (this.selectableEnvironments) {
      for (const [keyz, z] of Object.entries(this.selectableEnvironments) ) {
        for (const b of z) {
          if (b[ 'type' ] === 'tag') {
            const elements = this.elementRef.nativeElement.getElementsByTagName(b[ 'name' ]);
            for (const e of elements) {
              for (const [key, value] of Object.entries((b['styles']))) {
                this.renderer.removeStyle(e, key);
              }
            }
          } else if (b[ 'type' ] === 'class') {
            const elements = this.elementRef.nativeElement.getElementsByClassName(b[ 'name' ]);
            for (const e of elements) {
              for (const [key, value] of Object.entries((b['styles']))) {
                this.renderer.removeStyle(e, key);
              }
            }
          }
        }
      }
    }
  }
}
