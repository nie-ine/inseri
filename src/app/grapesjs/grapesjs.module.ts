import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrapesjsComponent } from './grapesjs/grapesjs.component';
import { RouterModule } from '@angular/router';
import { Service } from './createComponentInstances.service';
import {ArithmeticModule, ImageFrameComponent} from 'nie-ine';
import { Popup } from './grapesjs/popup';

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
    Popup
  ],
  exports: [
    GrapesjsComponent
  ],
  entryComponents: [
    ImageFrameComponent
  ]
})
export class GrapesjsModule { }
