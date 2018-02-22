import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrapesjsComponent } from './grapesjs/grapesjs.component';
import { RouterModule } from '@angular/router';
import { Service } from './createComponentInstances.service';
import {ArithmeticModule, ImageFrameComponent} from 'nie-ine';
import { BreakComponent } from './grapesjs/grapesjs.component';

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
    GrapesjsComponent,
    BreakComponent
  ],
  exports: [
    GrapesjsComponent
  ],
  entryComponents: [
    BreakComponent,
    ImageFrameComponent
  ]
})
export class GrapesjsModule { }
