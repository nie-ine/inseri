import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPageOfWordsComponent } from './text-page-of-words/text-page-of-words.component';
import { TextStructureModule } from '../text-structure/text-structure.module';
import { SpaTextModule } from '../shared/spa-text/spa-text.module';
import { TextSvgViewComponent } from './text-svg-view/text-svg-view.component';

@NgModule({
  imports: [
    CommonModule,
    SpaTextModule,
    TextStructureModule
  ],
  declarations: [TextPageOfWordsComponent, TextSvgViewComponent],
  exports: [TextPageOfWordsComponent, TextSvgViewComponent]
})
export class ComplexTextViewsModule { }
