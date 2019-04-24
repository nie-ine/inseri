import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P0041EditionComponent } from './p0041-edition/p0041-edition.component';
import { P0041StropheComponent } from './p0041-strophe/p0041-strophe.component';
import { ComplexTextViewsModule } from '../../complex-text-views/complex-text-views.module';
import { TextStructureModule } from '../../text-structure/text-structure.module';
import { SpaTextModule } from '../../shared/spa-text/spa-text.module';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';

@NgModule({
  declarations: [P0041EditionComponent, P0041StropheComponent],
  imports: [
    CommonModule,
    ComplexTextViewsModule,
    TextStructureModule,
    SpaTextModule
  ],
  exports: [ P0041EditionComponent ],
  providers: [ KnoraV2RequestService ]
})
export class Project0041Module { }
