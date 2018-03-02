import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynopsisComponent } from './synopsis.component';
import { LightTableComponent } from './light-table/light-table.component';
import { DraggableDirective } from './draggable.directive';
import { DropTargetDirective } from './drop-target.directive';
import { RouterModule } from '@angular/router';
import { DragService } from './drag.service';
import { SynopsisThumbnailbarComponent } from './synopsis-thumbnailbar/synopsis-thumbnailbar.component';
import { SynopsisAnchorDirective } from './synopsis-anchor.directive';
import { SynopsisTextObjectComponent } from './synopsis-text-object/synopsis-text-object.component';
import { SynopsisImageObjectComponent } from './synopsis-image-object/synopsis-image-object.component';
import { SynopsisObjectToolboxComponent } from './synopsis-object-toolbox/synopsis-object-toolbox.component';
import { MaterialModule } from '../material.module';
import { SynopsisObjectModifierService } from './synopsis-object-modifier.service';
import { SelectableDirective } from './selectable.directive';
import { SynopsisObjectSelectorService } from './synopsis-object-selector.service';
import { ModifiableDirective } from './modifiable.directive';
import { SynopsisObjectManagerComponent } from './synopsis-object-manager/synopsis-object-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { SynopsisSaveLightTableComponent } from './synopsis-save-light-table/synopsis-save-light-table.component';
import { SynopsisLoadLightTableComponent } from './synopsis-load-light-table/synopsis-load-light-table.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'synopsis', component: SynopsisComponent}
    ])
  ],
  declarations: [
    SynopsisComponent,
    LightTableComponent,
    DraggableDirective,
    DropTargetDirective,
    SynopsisThumbnailbarComponent,
    SynopsisAnchorDirective,
    SynopsisTextObjectComponent,
    SynopsisImageObjectComponent,
    SynopsisObjectToolboxComponent,
    SelectableDirective,
    ModifiableDirective,
    SynopsisObjectManagerComponent,
    SynopsisSaveLightTableComponent,
    SynopsisLoadLightTableComponent
  ],
  providers: [
    DragService,
    SynopsisObjectModifierService,
    SynopsisObjectSelectorService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [
    SynopsisImageObjectComponent,
    SynopsisLoadLightTableComponent,
    SynopsisObjectManagerComponent,
    SynopsisSaveLightTableComponent,
    SynopsisTextObjectComponent
  ],
  exports: [
    SynopsisComponent,
    SynopsisObjectManagerComponent,
  ]
})
export class SynopsisModule {
}
