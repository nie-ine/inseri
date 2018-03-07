import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';
import {DragService} from './drag.service';
import {DropTargetOptions} from './drop-target-options';

@Directive({
  selector: '[appTileDropTarget]'
})
export class TileDropTargetDirective implements AfterViewInit {

  private coordinates: any | ClientRect;
  private overlay;

  constructor(private dragService: DragService, private el: ElementRef, private renderer: Renderer2) {
    this.createOverlay();
  }

  @Input()
  set appTileDropTarget(options: DropTargetOptions) {
    if (options) {
      this.options = options;
    }
  }

  @Output() appDrop = new EventEmitter();

  private options: DropTargetOptions = {};

  ngAfterViewInit(): void {
    this.coordinates = this.el.nativeElement.getBoundingClientRect();
  }

  // @HostListener('dragenter', ['$event']) // For IE compatibility
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    const {zone = 'zone'} = this.options;
    if (this.dragService.accepts(zone)) {
      event.preventDefault();
    }
  }

  @HostListener('dragenter')
  onDragEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', 0.5);
    this.renderer.appendChild(this.el.nativeElement, this.overlay);
  }

  @HostListener('dragleave')
  onDragLeave() {
    this.renderer.removeChild(this.el.nativeElement, this.overlay);
    this.renderer.setStyle(this.el.nativeElement, 'opacity', 1);
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
    this.renderer.removeChild(this.el.nativeElement, this.overlay);
    this.renderer.setStyle(this.el.nativeElement, 'opacity', 1);
    this.appDrop.next(data);
  }

  private createOverlay() {
    this.overlay = this.renderer.createElement('div');
    this.renderer.addClass(this.overlay, 'overlay');
    const text = this.renderer.createText('Drop here');
    this.renderer.appendChild(this.overlay, text);
  }

}
