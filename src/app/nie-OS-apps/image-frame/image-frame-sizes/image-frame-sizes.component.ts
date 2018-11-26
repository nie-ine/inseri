import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-frame-sizes',
  templateUrl: './image-frame-sizes.component.html',
  styleUrls: ['./image-frame-sizes.component.css']
})
export class ImageFrameSizesComponent implements OnInit {

  viewerWidth: number;
  viewerSize = 'small';
  @Output() viewerWidthChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.updateSize();
  }

  radioChange(v: string) {
    this.viewerSize = v;
    this.updateSize();
    this.viewerWidthChange.emit(this.viewerWidth);
  }

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
