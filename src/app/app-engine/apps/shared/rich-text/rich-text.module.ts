import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextByIriComponent } from './rich-text-by-iri/rich-text-by-iri.component';
import { TextRichInnerhtmlComponent } from './text-rich-innerhtml/text-rich-innerhtml.component';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';

/**
 * This module connects the components for positional semantic annotation functionality.
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RichTextByIriComponent,
    TextRichInnerhtmlComponent
  ],
  exports: [
    RichTextByIriComponent,
    TextRichInnerhtmlComponent
  ],
  providers: [ KnoraV2RequestService ]
})
export class RichTextModule { }
