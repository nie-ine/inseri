import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextLineComponent } from './text-line/text-line.component';
import { TextLineMarginComponent } from './text-line-margin/text-line-margin.component';
import { TextLineGroupComponent } from './text-line-group/text-line-group.component';
import { SpaTextModule } from '../shared/spa-text/spa-text.module';

@NgModule({
  imports: [
    CommonModule,
    SpaTextModule
  ],
  declarations: [TextLineComponent, TextLineMarginComponent, TextLineGroupComponent],
  exports: [TextLineComponent, TextLineMarginComponent, TextLineGroupComponent]
})
export class TextStructureModule { }
