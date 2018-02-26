import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SynopsisComponent} from './synopsis.component';
import {LightTableComponent} from './light-table/light-table.component';
import {DraggableDirective} from './draggable.directive';
import {DropTargetDirective} from './drop-target.directive';
import {RouterModule} from '@angular/router';
import {DragService} from './drag.service';
import {SynopsisThumbnailbarComponent} from './synopsis-thumbnailbar/synopsis-thumbnailbar.component';
import {SynopsisAnchorDirective} from './synopsis-anchor.directive';
import {SynopsisTextObjectComponent} from './synopsis-text-object/synopsis-text-object.component';
import {SynopsisImageObjectComponent} from './synopsis-image-object/synopsis-image-object.component';
import {SynopsisObjectToolboxComponent} from './synopsis-object-toolbox/synopsis-object-toolbox.component';
import {MaterialModule} from '../material.module';
import {SynopsisObjectModifierService} from './synopsis-object-modifier.service';
import { SelectableDirective } from './selectable.directive';
import {SynopsisObjectSelectorService} from './synopsis-object-selector.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
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
    SelectableDirective
  ],
  providers: [
    DragService,
    SynopsisObjectModifierService,
    SynopsisObjectSelectorService
  ],
  entryComponents: [
    SynopsisImageObjectComponent,
    SynopsisTextObjectComponent
  ]
})
export class SynopsisModule {
}
