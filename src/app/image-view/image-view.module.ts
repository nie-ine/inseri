import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { ImageFrameModule } from './image-frame/image-frame.module';
import { ImageViewComponent } from './image-view.component';

@NgModule({
  imports: [
    CommonModule,
    ImageFrameModule,
    RouterModule.forChild([
      { path: 'image-view', component: ImageViewComponent }
    ])
  ],
  declarations: [ ImageViewComponent ],
  exports: [ ImageViewComponent ]
})
export class ImageViewModule { }
