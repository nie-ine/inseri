import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { SynopsisObjectModifierService } from './synopsis-object-modifier.service';

@Directive({
  selector: '[appModifiable]'
})
export class ModifiableDirective {

  @Input() appModifiable: number;
  nightView = false;
  rotation = 0;
  bottomRightCornerArea: [number, number];

  constructor(private synopsisObjectModifierService: SynopsisObjectModifierService,
              private el: ElementRef,
              private renderer: Renderer2) {
    synopsisObjectModifierService.rotateObject$.subscribe(x => {
      if (x[0] === this.appModifiable) {
        this.rotate(x[1]);
      }
    });
    synopsisObjectModifierService.invertColors$.subscribe(uid => {
      if (uid === this.appModifiable) {
        this.invertColors();
      }
    });
  }

  private rotate(angle: number) {
    this.rotation = (this.rotation + angle) % 360;
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'rotate(' + this.rotation + 'deg)');
  }

  private invertColors() {
    this.nightView = !this.nightView;
    if (this.nightView) {
      this.renderer.addClass(this.el.nativeElement, 'night-view');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'night-view');
    }
  }

  @HostListener('mouseenter')
  @HostListener('mouseup')
  onPossibleResize() {
    this.bottomRightCornerArea = [
      this.el.nativeElement.getBoundingClientRect().right - 16,
      this.el.nativeElement.getBoundingClientRect().bottom - 16
    ];
    this.synopsisObjectModifierService.resizeObject(
      this.appModifiable,
      this.el.nativeElement.getBoundingClientRect().width,
      this.el.nativeElement.getBoundingClientRect().height
    );
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    if (event.clientX > this.bottomRightCornerArea[0] && event.clientY > this.bottomRightCornerArea[1]) {
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'se-resize');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'move');

    }
  }

}
