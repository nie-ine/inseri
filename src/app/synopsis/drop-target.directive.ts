import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {DragService} from './drag.service';

@Directive({
  selector: '[appDropTarget]'
})
export class DropTargetDirective {

  constructor(private dragService: DragService) {
  }

  @Input()
  set appDropTarget(options: DropTargetOptions) {
    if (options) {
      this.options = options;
    }
  }

  @Output('appDrop') drop = new EventEmitter();

  private options: DropTargetOptions = {};

  @HostListener('dragenter', ['$event']) // For IE compatibility
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    const {zone = 'zone'} = this.options;
    if (this.dragService.accepts(zone)) {
      event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    const data = JSON.parse(event.dataTransfer.getData('Text'));
    data.top = event.clientY;
    data.left = event.clientX;
    this.drop.next(data);
  }

}

export interface DropTargetOptions {
  zone?: string;
}
