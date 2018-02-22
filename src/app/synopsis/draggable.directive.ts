import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import {DragService} from './drag.service';
import {SynopsisObjectData} from './synopsis-object-data';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  constructor(private dragService: DragService) {
  }

  @HostBinding('draggable')
  get draggable() {
    return true;
  }

  @Input()
  set appDraggable(data: SynopsisObjectData) {
    this.data = data;
  }

  private data: SynopsisObjectData;

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    this.dragService.startDrag('zone');
    event.dataTransfer.setData('Text', JSON.stringify(this.data));
  }

}
