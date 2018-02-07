import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ExampleComponent } from 'nie-ine';
import { ArithmeticModule } from 'nie-ine';
import { SimpleSearchKnoraV1Component } from 'nie-ine';

@NgModule({
  imports: [
    CommonModule,
    ArithmeticModule,
    RouterModule.forChild([
      { path: 'about', component: AboutComponent },
      { path: 'home', component: HomeComponent },
      { path: 'example', component: ExampleComponent },
      { path: 'simpleSearch', component: SimpleSearchKnoraV1Component },
      { path: '', redirectTo: '/home', pathMatch: 'full'}
      ])
  ],
  declarations: [
    AboutComponent,
    HomeComponent],
  exports: [
    AboutComponent,
    HomeComponent]
})
export class StaticPagesModule { }
