import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NIEOSComponent} from './nie-OS/nie-OS.component';
import {RouterModule} from '@angular/router';
import {ImageFrameComponent} from 'nie-ine';
import {Popup} from './nie-OS/popup';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {ArithmeticModule} from 'nie-ine';
import {GrapesjsComponent} from './grapesjs/grapesjs.component';
import {TextViewModule} from '../text-view/text-view.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SynopsisModule} from '../synopsis/synopsis.module';
import {MyPageSetModule} from './page-set/page-set.module';
import {GenerateHashService} from '../shared/nieOS/other/generateHash.service';
import {CreateResourceModule} from '../nie-OS-apps/create-resource/create-resource.module';
import {DataManagementToolModule} from './apps/data-management-tool/data-management-tool.module';
import {SendGravSearchQueryService} from '../shared/knora/gravsearch/sendGravSearchQuery.service';
import {TextlistViewerComponent} from './apps/textlist-viewer/textlist-viewer.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {D3jsModule} from './apps/d3js/d3js.module';
import {OpenAppsModel} from '../shared/nieOS/mongodb/page/open-apps.model';
import {MatChipsModule} from '@angular/material/chips';
import { DataManagementComponent } from './data-management/data-management.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { QueryEntryComponent } from './query-entry/query-entry.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AceEditorModule } from 'ng2-ace-editor';
import {AbstractJsonService} from './data-management/abstract-json.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

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
    MyPageSetModule,
    CreateResourceModule,
    DataManagementToolModule,
    MatExpansionModule,
    MatDividerModule,
    D3jsModule,
    MatChipsModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatTabsModule,
    AceEditorModule,
    MatButtonToggleModule,
    RouterModule.forChild([
      { path: 'page', component: NIEOSComponent },
      { path: 'grapesjs', component: GrapesjsComponent },
      { path: 'textlist', component: TextlistViewerComponent }
    ])
  ],
  providers: [
    GenerateHashService,
    SendGravSearchQueryService,
    OpenAppsModel,
    AbstractJsonService
  ],
  declarations: [
    NIEOSComponent,
    Popup,
    GrapesjsComponent,
    TextlistViewerComponent,
    DataManagementComponent,
    QueryEntryComponent
  ],
  exports: [
    NIEOSComponent,
    MatSidenavModule
  ],
  entryComponents: [
    ImageFrameComponent,
    DataManagementComponent,
    QueryEntryComponent
  ]
})
export class NIEOSModule { }
