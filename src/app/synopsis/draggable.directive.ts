import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';
import {DragService} from './drag.service';
import {SynopsisObjectData} from './synopsis-object-data';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  constructor(private dragService: DragService, private el: ElementRef, private renderer: Renderer2) {
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
    this.renderer.setStyle(this.el.nativeElement, 'opacity', 0.5);
    setTimeout(() => this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden'), 1);
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
