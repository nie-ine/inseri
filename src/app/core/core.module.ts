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
import { ArithmeticModule } from 'nie-ine';
import { MetadataViewModule } from '../metadata-view/metadata-view.module';


@NgModule({
  imports: [
    CommonModule,
    StaticPagesModule,
    MaterialModule,
    MetadataViewModule,
    ArithmeticModule,
    GrapesjsModule,
    RouterModule.forRoot([
      {path: '**', component: PageNotFoundComponent}
      ])
  ],
  declarations: [HeaderComponent, FooterComponent, MainComponent, PageNotFoundComponent, NavigationComponent],
  exports: [HeaderComponent, FooterComponent, MainComponent, RouterModule]
})
export class CoreModule {
}
