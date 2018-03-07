import {Directive, ViewContainerRef} from '@angular/core';

/**
 * Anchor point for a view container
 */
@Directive({
  selector: '[appSynopsisObjectAnchor]'
})
export class SynopsisObjectAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
