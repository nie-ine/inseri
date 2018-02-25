import {Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';
import {DragService} from './drag.service';
import {SynopsisObjectData} from './synopsis-object-data';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  constructor(private dragService: DragService, private el: ElementRef) {
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
    this.el.nativeElement.style.opacity = 0.5;
    setTimeout(() => this.el.nativeElement.style.visibility = 'hidden', 1);
    this.dragService.startDrag('zone');
    this.data.mouseOffsetX = event.clientX - this.data.left;
    this.data.mouseOffsetY = event.clientY - this.data.top;
    event.dataTransfer.setData('Text', JSON.stringify(this.data));
  }

  @HostListener('dragend', ['$event'])
  onDragEnd() {
    this.el.nativeElement.style.opacity = 1;
    this.el.nativeElement.style.visibility = 'visible';
  }

}
