import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StaticPagesModule } from '../static-pages/static-pages.module';
import { MaterialModule } from '../material.module';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ImageViewModule} from '../image-view/image-view.module';
import { ArithmeticModule } from 'nie-ine';

@NgModule({
  imports: [
    CommonModule,
    StaticPagesModule,
    ImageViewModule,
    MaterialModule,
    ArithmeticModule,
    RouterModule.forRoot([
      {path: '**', component: PageNotFoundComponent}
      ])
  ],
  declarations: [HeaderComponent, FooterComponent, MainComponent, PageNotFoundComponent, NavigationComponent],
  exports: [HeaderComponent, FooterComponent, MainComponent, RouterModule]
})
export class CoreModule {
}
