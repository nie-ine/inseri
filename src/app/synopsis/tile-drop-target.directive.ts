import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { DragService } from './drag.service';
import { DropTargetOptions } from './drop-target.directive';

@Directive({
  selector: '[appTileDropTarget]'
})
export class TileDropTargetDirective implements AfterViewInit {

  private coordinates: any | ClientRect;

  constructor(private dragService: DragService, private el: ElementRef, private renderer: Renderer2) {
  }

  @Input()
  set appDropTarget(options: DropTargetOptions) {
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
    const imageObject = this.renderer.createElement('app-tiled-image-object');
    console.log(event);
    this.renderer.setAttribute(imageObject, 'data', JSON.parse(event.dataTransfer.getData('Text')));
    this.renderer.setStyle(imageObject, 'opacity', 0.5);
    this.renderer.appendChild(this.el.nativeElement, imageObject);
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
    this.appDrop.next(data);
  }

}
