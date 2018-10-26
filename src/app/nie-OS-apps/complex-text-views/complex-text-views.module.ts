import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPageOfWordsComponent } from './text-page-of-words/text-page-of-words.component';
import { TextStructureModule } from '../text-structure/text-structure.module';
import { SpaTextModule } from '../shared/spa-text/spa-text.module';

@NgModule({
  imports: [
    CommonModule,
    SpaTextModule,
    TextStructureModule
  ],
  declarations: [TextPageOfWordsComponent],
  exports: [TextPageOfWordsComponent]
})
export class ComplexTextViewsModule { }
