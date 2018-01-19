import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionViewComponent } from './edition-view.component';
import { EditionViewToolsComponent } from './edition-view-tools/edition-view-tools.component';
import { EditionViewStructureComponent } from './edition-view-structure/edition-view-structure.component';
import { EditionViewMetadataComponent } from './edition-view-metadata/edition-view-metadata.component';
import { EditionViewCanvasComponent } from './edition-view-canvas/edition-view-canvas.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EditionViewComponent, EditionViewToolsComponent, EditionViewStructureComponent, EditionViewMetadataComponent, EditionViewCanvasComponent]
})
export class EditionViewModule {

}
