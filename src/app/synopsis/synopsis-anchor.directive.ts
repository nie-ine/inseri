import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appSynopsisAnchor]'
})
export class SynopsisAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
