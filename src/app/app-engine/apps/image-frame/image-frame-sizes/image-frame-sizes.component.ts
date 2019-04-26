import {Component, EventEmitter, OnInit, Output} from '@angular/core';

/**
 * This component can wrap a image-with-overlay and change its size.
 */
@Component({
  selector: 'app-image-frame-sizes',
  templateUrl: './image-frame-sizes.component.html',
  styleUrls: ['./image-frame-sizes.component.css']
})
export class ImageFrameSizesComponent implements OnInit {

  /**
   * The selected width of the viewer.
   */
  viewerSize = 'small';

  /**
   * The width of the viewer in pixels.
   */
  viewerWidth: number;

  /**
   * The width of the viewer as output.
   */
  @Output() viewerWidthChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * default written by angular-cli
   */
  constructor() { }

  /**
   * Initialize with default size.
   */
  ngOnInit() {
    this.updateSize();
  }

  /**
   * Change the width of the viewer.
   * @param v  size description: small, normal, large
   */
  radioChange(v: string) {
    this.viewerSize = v;
    this.updateSize();
    this.viewerWidthChange.emit(this.viewerWidth);
  }

  /**
   * Apply numbers to width.
   */
  updateSize() {
    if (this.viewerSize === 'large') {
      this.viewerWidth = 900;
    } else if (this.viewerSize === 'normal') {
      this.viewerWidth = 600;
    } else {
      this.viewerWidth = 300;
    }
  }

}
