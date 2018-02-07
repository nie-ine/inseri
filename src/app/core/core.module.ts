import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {StaticPagesModule} from '../static-pages/static-pages.module';
import {MaterialModule} from '../material.module';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NavigationComponent} from './navigation/navigation.component';
import {EditionViewModule} from '../edition-view/edition-view.module';
import {KnoraRequestService} from '../shared/knora-request.service';
import {SparqlRequestService} from '../shared/sparql-request.service';
import {ResultToEditionMapperService} from '../edition-view/result-to-edition-mapper.service';
import {KnoraAuthService} from '../shared/knora-auth.service';

@NgModule({
  imports: [
    CommonModule,
    StaticPagesModule,
    EditionViewModule,
    MaterialModule,
    RouterModule.forRoot([
      {path: '**', component: PageNotFoundComponent}
    ])
  ],
  declarations: [HeaderComponent, FooterComponent, MainComponent, PageNotFoundComponent, NavigationComponent],
  providers: [KnoraRequestService, SparqlRequestService, ResultToEditionMapperService, KnoraAuthService],
  exports: [HeaderComponent, FooterComponent, MainComponent, RouterModule]
})
export class CoreModule {
}
