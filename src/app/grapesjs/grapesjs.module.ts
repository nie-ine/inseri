import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrapesjsComponent } from './grapesjs/grapesjs.component';
import { RouterModule } from '@angular/router';
import { Service } from './createComponentInstances.service';
import { ArithmeticModule } from 'nie-ine';

@NgModule({
  imports: [
    CommonModule,
    ArithmeticModule,
    RouterModule.forChild([
      { path: 'grapesjs', component: GrapesjsComponent }
    ])
  ],
  providers: [
    Service
  ],
  declarations: [
    GrapesjsComponent
  ],
  exports: [
    GrapesjsComponent
  ]
})
export class GrapesjsModule { }
