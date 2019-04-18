import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaTextComponent } from './spa-text/spa-text.component';
import { TextRichInnerhtmlComponent } from './text-rich-innerhtml/text-rich-innerhtml.component';

/**
 * This module connects the components for positional semantic annotation functionality.
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpaTextComponent,
    TextRichInnerhtmlComponent
  ],
  exports: [
    SpaTextComponent,
    TextRichInnerhtmlComponent
  ]
})
export class SpaTextModule { }
