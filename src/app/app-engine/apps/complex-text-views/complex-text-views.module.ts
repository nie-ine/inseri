import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPageOfWordsComponent } from './text-page-of-words/text-page-of-words.component';
import { TextStructureModule } from '../text-structure/text-structure.module';
import { RichTextModule } from '../shared/rich-text/rich-text.module';
import { TextSvgViewComponent } from './text-svg-view/text-svg-view.component';
import { InterlinearGlossingComponent } from './interlinear-glossing/interlinear-glossing.component';
import { TextSvgViewWrapperComponent } from './text-svg-view-app-wrapper/text-svg-view-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    RichTextModule,
    TextStructureModule
  ],
  declarations: [InterlinearGlossingComponent, TextPageOfWordsComponent, TextSvgViewComponent, TextSvgViewWrapperComponent],
  exports: [InterlinearGlossingComponent, TextPageOfWordsComponent, TextSvgViewComponent, TextSvgViewWrapperComponent]
})
export class ComplexTextViewsModule { }
