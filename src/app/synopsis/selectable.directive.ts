import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { SynopsisObjectSelectorService } from './synopsis-object-selector.service';

@Directive({
  selector: '[appSelectable]'
})
export class SelectableDirective implements AfterViewInit {

  @Input() appSelectable: number;
  @Output() showMenu = new EventEmitter<boolean>();
  zindex: number;
  private selected: boolean;

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

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.selected) {
      this.showMenu.emit(true);
    }
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.showMenu.emit(true);
    this.selectObject();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.showMenu.emit(false);
  }

  private selectObject() {
    this.renderer.setStyle(this.el.nativeElement, 'z-index', 999);
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px #9ecaed solid');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 0 10px #9ecaed');
    this.synopsisObjectSelectorService.selectNewObject(this.appSelectable);
    this.selected = true;
  }

  private deselectObject() {
    this.zindex--;
    this.renderer.setStyle(this.el.nativeElement, 'z-index', this.zindex);
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px lightgray solid');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'none');
    this.selected = false;
  }

}
