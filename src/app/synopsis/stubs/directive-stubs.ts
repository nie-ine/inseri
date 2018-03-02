// tslint:disable-next-line:directive-selector
import { Directive, Input } from '@angular/core';

@Directive({selector: '[appDraggable]'})
export class DraggableStubDirective {
  @Input() appDraggable;
}

// tslint:disable-next-line:directive-selector
@Directive({selector: '[appSelectable]'})
export class SelectableStubDirective {
  @Input() appSelectable;
}

// tslint:disable-next-line:directive-selector
@Directive({selector: '[appModifiable]'})
export class ModifiableStubDirective {
  @Input() appModifiable;
}
