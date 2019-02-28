import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SynopsisComponent} from './synopsis.component';
import {LightTableComponent} from './light-table/light-table.component';
import {DraggableDirective} from './draggable.directive';
import {FloatDropTargetDirective} from './float-drop-target.directive';
import {RouterModule} from '@angular/router';
import {DragService} from './drag.service';
import {ThumbnailbarComponent} from './thumbnailbar/thumbnailbar.component';
import {SynopsisObjectAnchorDirective} from './synopsis-object-anchor.directive';
import {FloatingTextObjectComponent} from './floating-text-object/floating-text-object.component';
import {FloatingImageObjectComponent} from './floating-image-object/floating-image-object.component';
import {SynopsisObjectToolboxComponent} from './synopsis-object-toolbox/synopsis-object-toolbox.component';
import {MaterialModule} from '../../../material.module';
import {SynopsisObjectModifierService} from './synopsis-object-modifier.service';
import {SelectableDirective} from './selectable.directive';
import {SynopsisObjectSelectorService} from './synopsis-object-selector.service';
import {ModifiableDirective} from './modifiable.directive';
import {SynopsisObjectManagerComponent} from './synopsis-object-manager/synopsis-object-manager.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {SaveLightTableComponent} from './save-light-table/save-light-table.component';
import {LoadLightTableComponent} from './load-light-table/load-light-table.component';
import {SynopsisObjectSerializerService} from './synopsis-object-serializer.service';
import {LightTableMenuComponent} from './light-table-menu/light-table-menu.component';
import {TiledLightTableComponent} from './tiled-light-table/tiled-light-table.component';
import {LightTableLayoutService} from './light-table-layout.service';
import {FloatLightTableComponent} from './float-light-table/float-light-table.component';
import {LightTableStashService} from './light-table-stash.service';
import { TiledTextObjectComponent } from './tiled-text-object/tiled-text-object.component';
import { TiledImageObjectComponent } from './tiled-image-object/tiled-image-object.component';
import { TileDropTargetDirective } from './tile-drop-target.directive';
import { ShareLightTableComponent } from './share-light-table/share-light-table.component';
import { DraggableStubDirective, ModifiableStubDirective, SelectableStubDirective } from './stubs/directive-stubs';
import { RemoveObjectsByIdComponent } from './remove-objects-by-id/remove-objects-by-id.component';

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
    DraggableStubDirective,
    FloatDropTargetDirective,
    ThumbnailbarComponent,
    SynopsisObjectAnchorDirective,
    FloatingTextObjectComponent,
    FloatingImageObjectComponent,
    SynopsisObjectToolboxComponent,
    SelectableDirective,
    SelectableStubDirective,
    ModifiableDirective,
    ModifiableStubDirective,
    SynopsisObjectManagerComponent,
    SaveLightTableComponent,
    LoadLightTableComponent,
    LightTableMenuComponent,
    TiledLightTableComponent,
    FloatLightTableComponent,
    TiledTextObjectComponent,
    TiledImageObjectComponent,
    TileDropTargetDirective,
    ShareLightTableComponent,
    RemoveObjectsByIdComponent
  ],
  providers: [
    DragService,
    LightTableLayoutService,
    LightTableStashService,
    SynopsisObjectModifierService,
    SynopsisObjectSelectorService,
    SynopsisObjectSerializerService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [
    FloatingImageObjectComponent,
    FloatingTextObjectComponent,
    LoadLightTableComponent,
    RemoveObjectsByIdComponent,
    SaveLightTableComponent,
    ShareLightTableComponent,
    SynopsisObjectManagerComponent,
  ],
  exports: [
    SynopsisComponent,
    SynopsisObjectManagerComponent,
  ]
})
export class SynopsisModule {
}
