import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P0041EditionComponent } from './p0041-edition/p0041-edition.component';
import { P0041StropheComponent } from './p0041-strophe/p0041-strophe.component';
import { ComplexTextViewsModule } from '../../complex-text-views/complex-text-views.module';
import { TextStructureModule } from '../../text-structure/text-structure.module';
import { RichTextModule } from '../../shared/rich-text/rich-text.module';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { P0041KandaComponent } from './p0041-kanda/p0041-kanda.component';
import { P0041SuktaComponent } from './p0041-sukta/p0041-sukta.component';

@NgModule({
  declarations: [P0041EditionComponent, P0041StropheComponent, P0041KandaComponent, P0041SuktaComponent],
  imports: [
    CommonModule,
    ComplexTextViewsModule,
    TextStructureModule,
    RichTextModule
  ],
  exports: [ P0041EditionComponent ],
  providers: [ KnoraV2RequestService ]
})
export class Project0041Module { }
