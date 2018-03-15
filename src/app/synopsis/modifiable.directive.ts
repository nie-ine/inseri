import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import {SynopsisObjectModifierService} from './synopsis-object-modifier.service';
import { SynopsisObjectData } from './synopsis-object-data';

@Directive({
  selector: '[appModifiable]'
})
export class ModifiableDirective implements OnInit {

  @Input() appModifiable: SynopsisObjectData;
  nightView: boolean;
  rotation: number;
  bottomRightCornerArea: [number, number];

  constructor(private synopsisObjectModifierService: SynopsisObjectModifierService,
              private el: ElementRef,
              private renderer: Renderer2) {
    synopsisObjectModifierService.rotateObject$.subscribe(x => {
      if (x[0] === this.appModifiable.uid) {
        this.rotate(x[1]);
      }
    });
    synopsisObjectModifierService.invertColors$.subscribe(uid => {
      if (uid === this.appModifiable.uid) {
        this.invertColors();
      }
    });
  }

  ngOnInit() {
    this.rotation = this.appModifiable.transform ? this.appModifiable.transform : 0;
    if (this.appModifiable.invertedColors) {
      this.nightView = true;
      this.renderer.addClass(this.el.nativeElement, 'night-view');
    }
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
      this.appModifiable.uid,
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
