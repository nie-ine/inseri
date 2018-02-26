import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { ImageFrameModule } from './image-frame/image-frame.module';
import { ImageViewComponent } from './image-view.component';
import { RegionToSvgService } from './region-to-svg.service';
// import { ArithmeticModule } from 'nie-ine';

@NgModule({
  imports: [
    CommonModule,
//    ArithmeticModule,
    ImageFrameModule,
    RouterModule.forChild([
      { path: 'image-view', component: ImageViewComponent }
    ])
  ],
  declarations: [ ImageViewComponent ],
  exports: [ ImageViewComponent ],
  providers: [ RegionToSvgService ]
})
export class ImageViewModule { }
