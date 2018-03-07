import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {DragService} from './drag.service';
import {DropTargetOptions} from './drop-target-options';

@Directive({
  selector: '[appDropTarget]'
})
export class FloatDropTargetDirective implements AfterViewInit {

  private coordinates: any | ClientRect;

  constructor(private dragService: DragService, private el: ElementRef) {
  }

  @Input()
  set appFloatDropTarget(options: DropTargetOptions) {
    if (options) {
      this.options = options;
    }
  }

  @Output() appDrop = new EventEmitter();

  private options: DropTargetOptions = {};

  ngAfterViewInit(): void {
    this.coordinates = this.el.nativeElement.getBoundingClientRect();
  }

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
    const draggedObjDim = this.dragService.objectDimensions;
    if (event.clientY - draggedObjDim.mouseOffsetY < this.coordinates.top) {
      data.top = this.coordinates.top;
    } else if (event.clientY - draggedObjDim.mouseOffsetY + draggedObjDim.height > this.coordinates.bottom) {
      data.top = this.coordinates.bottom - draggedObjDim.height;
    } else {
      data.top = event.clientY - draggedObjDim.mouseOffsetY;
    }
    if (event.clientX - draggedObjDim.mouseOffsetX < this.coordinates.left) {
      data.left = this.coordinates.left;
    } else if (event.clientX - draggedObjDim.mouseOffsetX + draggedObjDim.width > this.coordinates.right) {
      data.left = this.coordinates.right - draggedObjDim.width - 10;
    } else {
      data.left = event.clientX - draggedObjDim.mouseOffsetX;
    }
    this.appDrop.next(data);
  }

}

