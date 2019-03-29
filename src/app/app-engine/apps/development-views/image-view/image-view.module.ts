import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { ImageFrameModule } from '../../image-frame/image-frame.module';
import { ImageViewComponent } from './image-view/image-view.component';
import { ImageFrameOldComponent } from './image-frame/image-frame-old.component';
// import { ArithmeticModule } from 'nie-ine';

@NgModule({
  imports: [
    CommonModule,
//    ArithmeticModule,
    ImageFrameModule,
    RouterModule.forChild([
      { path: 'dev/image', component: ImageViewComponent }
    ])
  ],
  declarations: [ ImageViewComponent, ImageFrameOldComponent ],
  exports: [ ImageViewComponent, ImageFrameOldComponent ]
})
export class ImageViewModule { }
