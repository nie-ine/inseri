import { NgModule } from '@angular/core';
import { TextDevViewModule } from './text-dev-view/text-dev-view.module';
import { ImageViewModule } from './image-view/image-view.module';
import { MetadataViewModule } from './metadata-view/metadata-view.module';

@NgModule({
  imports: [
    ImageViewModule,
    MetadataViewModule,
    TextDevViewModule
  ],
  exports: [TextDevViewModule]
})
export class DevelopmentViewsModule { }
