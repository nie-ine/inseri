import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {SynopsisObjectSelectorService} from './synopsis-object-selector.service';

@Directive({
  selector: '[appSelectable]'
})
export class SelectableDirective implements AfterViewInit {

  @Input() appSelectable: number;
  zindex: number;

  constructor(private synopsisObjectSelectorService: SynopsisObjectSelectorService,
              private el: ElementRef,
              private renderer: Renderer2) {
    this.synopsisObjectSelectorService.selectNewObject$.subscribe(uid => {
      if (uid !== this.appSelectable) {
        this.deselectObject();
      }
    });
  }

  ngAfterViewInit(): void {
    this.zindex = 999;
    this.selectObject();
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.selectObject();
  }

  private selectObject() {
    this.renderer.setStyle(this.el.nativeElement, 'z-index', 999);
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px #9ecaed solid');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 0 10px #9ecaed');
    this.synopsisObjectSelectorService.selectNewObject(this.appSelectable);
  }

  private deselectObject() {
    this.zindex--;
    this.renderer.setStyle(this.el.nativeElement, 'z-index', this.zindex);
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px lightgray solid');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'none');
  }

}
