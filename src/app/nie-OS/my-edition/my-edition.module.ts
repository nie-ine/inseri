import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionLandingPageComponent } from './edition-landing-page/edition-landing-page.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: 'my-edition', component: EditionLandingPageComponent}
    ])
  ],
  declarations: [
    EditionLandingPageComponent
  ]
})
export class MyEditionModule { }
