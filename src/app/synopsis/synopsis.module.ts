import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SynopsisComponent} from './synopsis.component';
import {LightTableComponent} from './light-table/light-table.component';
import {SynopsisObjectComponent} from './synopsis-object/synopsis-object.component';
import {DraggableDirective} from './draggable.directive';
import {DropTargetDirective} from './drop-target.directive';
import {RouterModule} from '@angular/router';
import {DragService} from './drag.service';
import { SynopsisThumbnailbarComponent } from './synopsis-thumbnailbar/synopsis-thumbnailbar.component';

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
    SynopsisObjectComponent,
    DraggableDirective,
    DropTargetDirective,
    SynopsisThumbnailbarComponent
  ],
  providers: [DragService]
})
export class SynopsisModule {
}
