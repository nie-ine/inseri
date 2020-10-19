import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KnoraV2ViewerComponent } from './knora-v2-viewer/knora-v2-viewer.component';
import { KnoraV2ViewerInnerhtmlComponent } from './text-rich-innerhtml/knora-v2-viewer-innerhtml.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    KnoraV2ViewerComponent,
    KnoraV2ViewerInnerhtmlComponent
  ],
  exports: [KnoraV2ViewerComponent]
})
export class KnoraV2ViewerModule { }
