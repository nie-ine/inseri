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
import { ArithmeticModule } from 'nie-ine';
import { GrapesjsComponent } from './grapesjs/grapesjs.component';
import { TextViewModule } from '../text-view/text-view.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SynopsisModule } from '../synopsis/synopsis.module';
import {MyEditionModule} from './my-edition/my-edition.module';
import {GenerateHashService} from "../shared/generateHash.service";
import { CreateResourceModule } from '../create-resource/create-resource.module';
import {DataManagementToolModule} from "./apps/data-management-tool/data-management-tool.module";


@NgModule({
  imports: [
    CommonModule,
    ArithmeticModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ArithmeticModule,
    TextViewModule,
    MatTooltipModule,
    SynopsisModule,
    MyEditionModule,
    CreateResourceModule,
    DataManagementToolModule,
    RouterModule.forChild([
      { path: 'arbeitsflaeche', component: NIEOSComponent },
      { path: 'grapesjs', component: GrapesjsComponent }
    ])
  ],
  providers: [
    GenerateHashService
  ],
  declarations: [
    NIEOSComponent,
    Popup,
    GrapesjsComponent
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
