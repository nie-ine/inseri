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
    this.renderer.setStyle(this.el.nativeElement, 'resize', 'none');
    setTimeout(() => this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden'), 1);
    this.dragService.startDrag('zone');
    this.dragService.propagateObjectDimensions(
      this.el.nativeElement.getBoundingClientRect().width,
      this.el.nativeElement.getBoundingClientRect().height,
      event.clientX - this.data.left,
      event.clientY - this.data.top);
    event.dataTransfer.setData('Text', JSON.stringify(this.data));
  }

  @HostListener('dragend', ['$event'])
  @HostListener('drop', ['$event'])
  onDragEnd() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', 1);
    this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible');
    this.renderer.setStyle(this.el.nativeElement, 'resize', 'both');
    this.dragService.endDrag();
  }

}
