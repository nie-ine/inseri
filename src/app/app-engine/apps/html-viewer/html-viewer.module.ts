import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlViewerComponent } from './html-viewer/html-viewer.component';
import { RichTextModule } from '../shared/rich-text/rich-text.module';

@NgModule({
  declarations: [HtmlViewerComponent],
  imports: [
    CommonModule,
    RichTextModule
  ],
  exports: [HtmlViewerComponent]
})
export class HtmlViewerModule { }
