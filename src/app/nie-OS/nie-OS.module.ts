import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NIEOSComponent } from './nie-OS/nie-OS.component';
import { RouterModule } from '@angular/router';
import { ImageFrameComponent } from 'nie-ine';
import { Popup } from './nie-OS/popup';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ArithmeticModule } from '../npm-package/src/modules/arithmetic.module';

@NgModule({
  imports: [
    CommonModule,
    ArithmeticModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ArithmeticModule,
    RouterModule.forChild([
      { path: 'arbeitsflaeche', component: NIEOSComponent }
    ])
  ],
  providers: [
  ],
  declarations: [
    NIEOSComponent,
    Popup
  ],
  exports: [
    NIEOSComponent,
    MatSidenavModule
  ],
  entryComponents: [
    ImageFrameComponent
  ]
})
export class NIEOSModule { }
