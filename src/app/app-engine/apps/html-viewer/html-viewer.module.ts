import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlViewerComponent } from './html-viewer/html-viewer.component';
import { HtmlViewerInnerhtmlComponent } from './html-viewer-innerhtml/html-viewer-innerhtml.component';

@NgModule({
  declarations: [HtmlViewerComponent, HtmlViewerInnerhtmlComponent],
  imports: [
    CommonModule
  ],
  exports: [HtmlViewerComponent]
})
export class HtmlViewerModule { }
