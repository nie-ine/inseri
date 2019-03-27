import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComponent} from './page/page/page.component';
import {RouterModule} from '@angular/router';
import {Frame} from './page/frame/frame';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {TextViewModule} from './apps/text-view/text-view.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SynopsisModule} from './apps/synopsis/synopsis.module';
import {MyPageSetModule} from '../user-action-engine/page-set/page-set.module';
import {GenerateHashService} from '../user-action-engine/other/generateHash.service';
import {CreateResourceModule} from './apps/create-resource/create-resource.module';
import {DataManagementToolModule} from '../query-app-interface/data-management-tool/data-management-tool.module';
import {SendGravSearchQueryService} from '../query-engine/knora/gravsearch/sendGravSearchQuery.service';
import {TextlistViewerComponent} from './apps/textlist-viewer/textlist-viewer.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {D3jsModule} from './apps/d3js/d3js.module';
import {OpenAppsModel} from '../user-action-engine/mongodb/page/open-apps.model';
import {MatChipsModule} from '@angular/material/chips';
import { DataManagementComponent } from '../query-app-interface/data-management/data-management/data-management.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { QueryEntryComponent } from '../query-engine/query-entry/query-entry.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AceEditorModule } from 'ng2-ace-editor';
import {AbstractJsonService} from '../query-app-interface/data-management/services/abstract-json.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { KeyValueFormComponent } from '../query-engine/query-entry/key-value-form/key-value-form.component';
import { QueryAppInputMapComponent } from '../query-app-interface/query-app-input-map/query-app-input-map.component';
import {MatProgressSpinnerModule, MatTreeModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { FrameSettingsComponent } from './page/frame-settings/frame-settings.component';
import {MatSliderModule} from '@angular/material/slider';
import { NgxSpinnerModule } from 'ngx-spinner';
import {LoadVariablesComponent} from './load-variables/load-variables.component';
import { QueryListComponent } from '../query-engine/query-list/query-list.component';
import { DataAssignmentComponent } from '../query-app-interface/data-management/data-assignment/data-assignment.component';
import { UpdateLinkedAppsComponent } from '../query-app-interface/data-management/update-linked-apps/update-linked-apps.component';
import { NewGjsBoxDialogComponent } from './apps/grapesjs/new-gjs-box-dialog/new-gjs-box-dialog.component';
import { MatDialogModule } from '@angular/material';
import { SimpleImageAppComponent } from './apps/simple-image-app/simple-image-app.component';
import { FileDatabase, ResponseTreeComponent } from './apps/response-tree/response-tree.component';
import { DataListView } from './apps/data-list-view/data-list-view.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { QueryInformationDialogComponent } from './page/query-information-dialog/query-information-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { DataListViewSettings} from './apps/data-list-view/data-list-view-settings/data-list-view-settings';
import {GrapesjsComponent} from './apps/grapesjs/grapesjs.component';
import { ImageFrameModule } from './apps/image-frame/image-frame.module';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TextViewModule,
    MatTooltipModule,
    SynopsisModule,
    MyPageSetModule,
    CreateResourceModule,
    DataManagementToolModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDividerModule,
    D3jsModule,
    MatChipsModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTabsModule,
    AceEditorModule,
    MatButtonToggleModule,
    MatListModule,
    MatSliderModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatTreeModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatCardModule,
    ImageFrameModule,
    RouterModule.forChild([
      { path: 'page', component: PageComponent },
      { path: 'response-tree', component: ResponseTreeComponent }
    ])
  ],
  providers: [
    GenerateHashService,
    SendGravSearchQueryService,
    OpenAppsModel,
    AbstractJsonService,
    FileDatabase
  ],
  declarations: [
    PageComponent,
    Frame,
    TextlistViewerComponent,
    DataManagementComponent,
    QueryEntryComponent,
    KeyValueFormComponent,
    QueryAppInputMapComponent,
    FrameSettingsComponent,
    LoadVariablesComponent,
    QueryListComponent,
    DataAssignmentComponent,
    UpdateLinkedAppsComponent,
    NewGjsBoxDialogComponent,
    SimpleImageAppComponent,
    ResponseTreeComponent,
    DataListView,
    DataListViewSettings,
    QueryInformationDialogComponent,
    GrapesjsComponent
  ],
  exports: [
    PageComponent,
    MatSidenavModule,
    GrapesjsComponent
  ],
  entryComponents: [
    DataManagementComponent,
    QueryEntryComponent,
    QueryAppInputMapComponent,
    FrameSettingsComponent,
    QueryListComponent,
    NewGjsBoxDialogComponent,
    QueryInformationDialogComponent
  ]
})
export class NIEOSModule { }
