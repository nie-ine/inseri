import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImageWithOverlayComponent } from './image-with-overlay/image-with-overlay.component';
import { RegionToSvgService } from './region-to-svg.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ ImageWithOverlayComponent],
  exports: [ ImageWithOverlayComponent],
  providers: [ RegionToSvgService ]
})
export class ImageFrameModule { }
