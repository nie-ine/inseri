import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * CSS like declaration of a style environment identifying elements and their style maps.
 */
export interface StyleDeclaration {
  /**
   * tag for the element name; class if the identification goes over the class attribute.
   */
  type: string;

  /**
   * The tag name or class name depending on the value of the variable `type`.
   */
  name: string;

  /**
   * Key-value like CSS, e.g. `background-color` : `black;`.
   */
  styles: {
    [key: string]: string;
  };
}

/**
 * `StyleDeclaration`s can be collected under keys to apply them bundled.
 */
export interface SelectableEnvironments {
  [key: string]: Array<StyleDeclaration>;
}

/**
 * This component takes an HTML text and style declarations and adds style to this text in an element.
 * Styles can also be applied dynamically.
 */
@Component({
  selector: 'app-text-rich-innerhtml',
  templateUrl: './text-rich-innerhtml.component.html',
  styleUrls: ['./text-rich-innerhtml.component.scss']
})
export class TextRichInnerhtmlComponent implements OnInit, OnChanges, AfterViewInit {

  /**
   * Plain HTML content.
   */
  @Input() htmlContent: any;

  /**
   * List of environments that are styled by default.
   */
  @Input() baseStyles: StyleDeclaration[];

  /**
   * Bundles of style environments that can selectively be applied.
   */
  @Input() selectableEnvironments: SelectableEnvironments;

  /**
   * Keys of selected style environment bundles.
   */
  @Input() selectedEnvironmentKeys: Set<string>;

  /**
   * Sanitized HTML content.
   */
  sanitizedContent;

  /**
   * Constructor initializes ElementRef, Renderer2, DomSanitizer
   * @param elementRef  Enables access to elements by class or tag name.
   * @param renderer  Enables applying styles to selected elements.
   * @param sanitizer  Enables passing HTML by security check (that could reduce styles).
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private sanitizer: DomSanitizer) { }

  /**
   * On initialization reset the HTML to the original input.
   */
  ngOnInit() {
  }

  /**
   * When the inputs change, reapply the styles.
   * @param changes  Changes by angular change detection.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.htmlContent && this.htmlContent) {
      this.cleanHtmlContent();
      this.clearStyles();
      this.applyBasicStyles();
      this.applySelectedStyles();
    }
    if (changes.selectedEnvironmentKeys) {
      this.clearStyles();
      this.applyBasicStyles();
      this.applySelectedStyles();
    }
  }

  /**
   * After the component is drawn, apply styles.
   */
  ngAfterViewInit() {
    this.applyBasicStyles();
    this.applySelectedStyles();
  }

  /**
   * Sanitize the HTML content.
   */
  cleanHtmlContent() {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);
  }

  /**
   * Apply the styles that are to be shown by default.
   */
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

  /**
   * Apply the styles that are part of the selected style bundles.
   */
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

  /**
   * Clear the text from the styles that are in the selectable style bundles.
   */
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
