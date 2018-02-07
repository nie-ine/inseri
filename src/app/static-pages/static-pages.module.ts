import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {MaterialModule} from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'about', component: AboutComponent},
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo: '/home', pathMatch: 'full'}
    ]),
    MaterialModule,
  ],
  declarations: [AboutComponent, HomeComponent],
  exports: [AboutComponent, HomeComponent]
})
export class StaticPagesModule {
}
