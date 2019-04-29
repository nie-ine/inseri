import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextLineComponent } from './text-line/text-line.component';
import { TextLineMarginComponent } from './text-line-margin/text-line-margin.component';
import { TextLineGroupComponent } from './text-line-group/text-line-group.component';
import { RichTextModule } from '../shared/rich-text/rich-text.module';
import { TextLineNumberComponent } from './text-line-number/text-line-number.component';

@NgModule({
  imports: [
    CommonModule,
    RichTextModule
  ],
  declarations: [TextLineComponent, TextLineMarginComponent, TextLineGroupComponent, TextLineNumberComponent],
  exports: [TextLineComponent, TextLineMarginComponent, TextLineGroupComponent, TextLineNumberComponent]
})
export class TextStructureModule { }
