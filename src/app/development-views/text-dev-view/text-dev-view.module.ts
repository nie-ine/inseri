import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextDevViewComponent } from './text-dev-view/text-dev-view.component';
import { TextStructureModule } from '../../nie-OS-apps/text-structure/text-structure.module';
import { SpaTextModule } from '../../nie-OS-apps/shared/spa-text/spa-text.module';

@NgModule({
  imports: [
    CommonModule,
    TextStructureModule,
    SpaTextModule,
    RouterModule.forChild([
      { path: 'dev/text', component: TextDevViewComponent}
    ])
  ],
  declarations: [TextDevViewComponent]
})
export class TextDevViewModule { }
