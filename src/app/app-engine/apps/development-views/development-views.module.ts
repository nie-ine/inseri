import { NgModule } from '@angular/core';
import { TextDevViewModule } from './text-dev-view/text-dev-view.module';
import { CreateResourceViewModule } from './create-resource-view/create-resource-view.module';
import { ImageViewModule } from './image-view/image-view.module';
import { EditResourceViewModule } from './edit-resource-view/edit-resource-view.module';
import { MetadataViewModule } from './metadata-view/metadata-view.module';

@NgModule({
  imports: [
    CreateResourceViewModule,
    EditResourceViewModule,
    ImageViewModule,
    MetadataViewModule,
    TextDevViewModule
  ],
  exports: [TextDevViewModule]
})
export class DevelopmentViewsModule { }
