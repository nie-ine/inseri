import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KnoraV2ViewerComponent } from './knora-v2-viewer/knora-v2-viewer.component';
import { RichTextModule } from '../shared/rich-text/rich-text.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RichTextModule
  ],
  declarations: [
    KnoraV2ViewerComponent
  ],
  exports: [KnoraV2ViewerComponent]
})
export class KnoraV2ViewerModule { }
