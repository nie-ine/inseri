import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPageOfWordsComponent } from './text-page-of-words/text-page-of-words.component';
import { TextSvgViewComponent } from './text-svg-view/text-svg-view.component';
import { TextSvgViewWrapperComponent } from './text-svg-view-app-wrapper/text-svg-view-wrapper.component';
import { TextLineComponent } from './text-line/text-line.component';
import { TextLineMarginComponent } from './text-line-margin/text-line-margin.component';
import { TextRichInnerhtmlComponent } from './text-rich-innerhtml/text-rich-innerhtml.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TextPageOfWordsComponent, TextSvgViewComponent, TextSvgViewWrapperComponent, TextLineComponent, TextLineMarginComponent, TextRichInnerhtmlComponent],
  exports: [TextPageOfWordsComponent, TextSvgViewComponent, TextSvgViewWrapperComponent]
})
export class ComplexTextViewsModule { }
