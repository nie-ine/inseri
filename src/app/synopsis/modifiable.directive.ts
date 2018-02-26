import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {SynopsisObjectModifierService} from './synopsis-object-modifier.service';

@Directive({
  selector: '[appModifiable]'
})
export class ModifiableDirective {

  @Input() appModifiable: number;
  nightView = false;
  rotation = 0;

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

}
