import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrapesjsComponent } from './grapesjs/grapesjs.component';
import { RouterModule } from '@angular/router';
import { Service } from './createComponentInstances.service';
import {ArithmeticModule, ImageFrameComponent} from 'nie-ine';
import { Popup } from './grapesjs/popup';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {TextViewModule} from '../text-view/text-view.module';

@NgModule({
  imports: [
    CommonModule,
    ArithmeticModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TextViewModule,
    RouterModule.forChild([
      { path: 'arbeitsflaeche', component: GrapesjsComponent }
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
    GrapesjsComponent,
    MatSidenavModule
  ],
  entryComponents: [
    ImageFrameComponent
  ]
})
export class GrapesjsModule { }
