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
import { NewGjsBoxDialogComponent } from './apps/grapesjs/new-gjs-box-dialog/new-gjs-box-dialog.component';
import { MatDialogModule } from '@angular/material';
import { SimpleImageAppComponent } from './apps/simple-image-app/simple-image-app.component';
import { FileDatabaseForApp, ResponseTreeAppComponent } from './apps/response-tree/response-tree.component';
import { DataListView } from './apps/data-list-view/data-list-view.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { QueryInformationDialogComponent } from './page/query-information-dialog/query-information-dialog.component';
import { MatCardModule } from '@angular/material/card';
import {GrapesjsComponent} from './apps/grapesjs/grapesjs.component';
import { ImageFrameModule } from './apps/image-frame/image-frame.module';
import { ParzivalFassungComponent } from './apps/parzival-fassung/parzival-fassung.component';
import { Project0041Module } from './apps/project-specific/project-0041/project-0041.module';
import { ComplexTextViewsModule } from './apps/complex-text-views/complex-text-views.module';
import { ResourceFormModule } from './apps/resource-form/resource-form.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { DataListViewDetailsDialogComponent } from './apps/data-list-view/data-list-view-details-dialog/data-list-view-details-dialog.component';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { DataListViewSettings } from './apps/data-list-view/data-list-view-settings/data-list-view-settings';
import { DataListViewTableComponent, HighlightPipe } from './apps/data-list-view/data-list-view-table/data-list-view-table.component';
import { NavigationModule } from './apps/navigation/navigation.module';
import { HtmlViewerModule } from './apps/html-viewer/html-viewer.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { OpenbisLoginComponent } from './apps/openbis-login/openbis-login.component';
// import { KnoraJsonldSimplify } from 'knora-jsonld-simplify/dist';
import { DataChooserComponent } from '../query-app-interface/data-management/data-chooser/data-chooser.component';
import { StaticPagesModule } from  '../user-action-engine/static-pages.module';
import { YoutubeVideoComponent } from './apps/youtube-video/youtube-video.component';
import {MatRadioModule} from '@angular/material/radio';
import { JoinedTextViewModule } from './apps/joined-text-view/joined-text-view.module';
import { ResponseTreeComponent, FileDatabase } from '../query-app-interface/data-management/response-tree/response-tree.component';
import { IframeComponent } from './apps/iframe/iframe.component';
import { NgMagicIframeModule } from '@sebgroup/ng-magic-iframe';
import { PrimeEditorComponent } from './apps/prime-editor/prime-editor.component';
import {EditorModule} from 'primeng/editor';
import { AngularHandsometableComponent } from './apps/angular-handsometable/angular-handsometable.component';

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
    ResourceFormModule,
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
    ComplexTextViewsModule,
    Project0041Module,
    HtmlViewerModule,
    NavigationModule,
    OverlayModule,
    MatCheckboxModule,
    StaticPagesModule,
    MatRadioModule,
    JoinedTextViewModule,
    NgMagicIframeModule,
    EditorModule,
    // KnoraJsonldSimplify,
    RouterModule.forChild([
      { path: 'page', component: PageComponent },
      { path: 'table', component: AngularHandsometableComponent }
    ])
  ],
  providers: [
    GenerateHashService,
    SendGravSearchQueryService,
    OpenAppsModel,
    AbstractJsonService,
    FileDatabase,
    FileDatabaseForApp
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
    NewGjsBoxDialogComponent,
    SimpleImageAppComponent,
    ResponseTreeAppComponent,
    DataListView,
    QueryInformationDialogComponent,
    GrapesjsComponent,
    ParzivalFassungComponent,
    DataListViewDetailsDialogComponent,
    HighlightPipe,
    DataListViewSettings,
    DataListViewTableComponent,
    OpenbisLoginComponent,
    YoutubeVideoComponent,
    DataChooserComponent,
    ResponseTreeComponent,
    IframeComponent,
    PrimeEditorComponent,
    AngularHandsometableComponent
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
    QueryInformationDialogComponent,
    DataListViewDetailsDialogComponent,
    DataChooserComponent
  ]
})
export class NIEOSModule { }
