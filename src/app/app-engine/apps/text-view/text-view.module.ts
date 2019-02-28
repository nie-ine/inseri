import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextViewComponent} from './text-view.component';
import {TextViewToolsComponent} from './text-view-tools/text-view-tools.component';
import {TextViewStructureComponent} from './text-view-structure/text-view-structure.component';
import {TextViewMetadataComponent} from './text-view-metadata/text-view-metadata.component';
import {TextViewCanvasComponent} from './text-view-canvas/text-view-canvas.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material.module';
import {CanvasOptionsService} from './canvas-options.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'text-view', component: TextViewComponent}
    ])],
  declarations: [
    TextViewComponent,
    TextViewToolsComponent,
    TextViewStructureComponent,
    TextViewMetadataComponent,
    TextViewCanvasComponent],
  providers: [CanvasOptionsService],
  exports: [TextViewComponent]
})
export class TextViewModule {

}
