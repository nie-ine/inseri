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

@NgModule({
  imports: [
    CommonModule,
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
    SynopsisImageObjectComponent
  ],
  providers: [DragService],
  entryComponents: [
    SynopsisImageObjectComponent,
    SynopsisTextObjectComponent
  ]
})
export class SynopsisModule {
}
