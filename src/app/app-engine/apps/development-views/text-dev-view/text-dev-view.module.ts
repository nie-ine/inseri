import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextDevViewComponent } from './text-dev-view/text-dev-view.component';
import { TextStructureModule } from '../../text-structure/text-structure.module';
import { RichTextModule } from '../../shared/rich-text/rich-text.module';
import { ComplexTextViewsModule } from '../../complex-text-views/complex-text-views.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextStructureModule,
    ComplexTextViewsModule,
    RichTextModule,
    RouterModule.forChild([
      { path: 'dev/text', component: TextDevViewComponent}
    ])
  ],
  declarations: [TextDevViewComponent]
})
export class TextDevViewModule { }
