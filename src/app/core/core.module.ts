import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StaticPagesModule } from '../static-pages/static-pages.module';
import { MaterialModule } from '../material.module';
import { GrapesjsModule } from '../grapesjs/grapesjs.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MetadataViewModule } from '../metadata-view/metadata-view.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { TextViewModule } from '../text-view/text-view.module';
import { KnoraRequestService } from '../shared/knora-request.service';
import { SparqlRequestService } from '../shared/sparql-request.service';
import { ResultToTextMapperService } from '../text-view/result-to-text-mapper.service';
import { KnoraAuthService } from '../shared/knora-auth.service';
import { ArithmeticModule } from 'nie-ine';
import { ExampleComponent } from 'nie-ine';

@NgModule({
  imports: [
    CommonModule,
    StaticPagesModule,
    TextViewModule,
    MaterialModule,
    MetadataViewModule,
    ArithmeticModule,
    MetadataViewModule,
    GrapesjsModule,
    DashboardModule,
    ArithmeticModule,
    RouterModule.forRoot([
      { path: 'example2', component: ExampleComponent },
      { path: '**', component: PageNotFoundComponent }
      ])
  ],
  declarations: [HeaderComponent, FooterComponent, MainComponent, PageNotFoundComponent, NavigationComponent],
  providers: [KnoraRequestService, SparqlRequestService, ResultToTextMapperService, KnoraAuthService],
  exports: [HeaderComponent, FooterComponent, MainComponent, RouterModule]
})
export class CoreModule {
}
