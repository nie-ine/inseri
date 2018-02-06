import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFrameComponent } from './image-frame/image-frame.component';
import { ImageFrameSizesComponent } from './image-frame-sizes/image-frame-sizes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ImageFrameComponent, ImageFrameSizesComponent],
  exports: [ImageFrameComponent, ImageFrameSizesComponent]
})
export class ImageFrameModule { }
