import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPageOfWordsComponent } from './text-page-of-words/text-page-of-words.component';
import { RichTextModule } from '../shared/rich-text/rich-text.module';
import { TextSvgViewComponent } from './text-svg-view/text-svg-view.component';
import { TextSvgViewWrapperComponent } from './text-svg-view-app-wrapper/text-svg-view-wrapper.component';
import { TextLineComponent } from './text-line/text-line.component';
import { TextLineMarginComponent } from './text-line-margin/text-line-margin.component';

@NgModule({
  imports: [
    CommonModule,
    RichTextModule
  ],
  declarations: [TextPageOfWordsComponent, TextSvgViewComponent, TextSvgViewWrapperComponent, TextLineComponent, TextLineMarginComponent],
  exports: [TextPageOfWordsComponent, TextSvgViewComponent, TextSvgViewWrapperComponent]
})
export class ComplexTextViewsModule { }
