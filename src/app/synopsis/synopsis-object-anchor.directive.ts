import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appSynopsisObjectAnchor]'
})
export class SynopsisObjectAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
