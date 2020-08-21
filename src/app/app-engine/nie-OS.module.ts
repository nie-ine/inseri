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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxSpinnerModule } from 'ngx-spinner';
import {LoadVariablesComponent} from './load-variables/load-variables.component';
import { QueryListComponent } from '../query-engine/query-list/query-list.component';
import { DataAssignmentComponent } from '../query-app-interface/data-management/data-assignment/data-assignment.component';
import { NewGjsBoxDialogComponent } from './apps/grapesjs/new-gjs-box-dialog/new-gjs-box-dialog.component';
import { MatDialogModule } from '@angular/material';
import { SimpleImageAppComponent } from './apps/simple-image-app/simple-image-app.component';
import { FileDatabaseForApp, ResponseTreeAppComponent } from './apps/response-tree/response-tree.component';
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
import { DataListViewComponent} from './apps/data-list-view/data-list-view.component';
import { DataListViewSettingsComponent} from './apps/data-list-view/data-list-view-settings/data-list-view-settings';
import { DataListViewTableComponent, HighlightPipe } from './apps/data-list-view/data-list-view-table/data-list-view-table.component';
import { DataListViewInAppQueryService } from './apps/data-list-view/services/query.service';
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
import { HierarchicalNavigationModule } from './apps/navigation/hierarchical-navigation/hierarchical-navigation.module';
import { IframeComponent } from './apps/iframe/iframe.component';
import { PrimeEditorComponent } from './apps/prime-editor/prime-editor.component';
import {EditorModule} from 'primeng/editor';
import { AngularHandsometableComponent } from './apps/angular-handsometable/angular-handsometable.component';
import { AgGridModule } from 'ag-grid-angular';
import { RaeberNavigationComponent } from './apps/raeber-navigation/raeber-navigation.component';
import { PdfViewerComponent } from './apps/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppInputComponentComponent } from './page/app-input-component/app-input-component.component';
import { FileListDialogComponent } from './page/file-list-dialog/file-list-dialog.component';
import { AddAppGroupDialogComponent } from './page/add-app-group-dialog/add-app-group-dialog.component';
import { AllAppSelectorsComponent } from './page/all-app-selectors/all-app-selectors.component';
import { BrowserlingComponent } from './apps/browserling/browserling.component';
import { KeyValueComponent } from './apps/key-value/key-value.component';
import { CanvasWhiteboardComponent } from './apps/canvas-whiteboard/canvas-whiteboard.component';
import { OurNewComponentComponent } from './apps/our-new-component/our-new-component.component';
import {FileDatabaseForAppGND, FileFlatNodeGnd, GndLobidComponent} from './apps/gnd-lobid/gnd-lobid.component';
import { PageListDialogComponent } from './page/page-list-dialog/page-list-dialog.component';
import { UrlParamUpdaterComponent } from './apps/url-param-updater/url-param-updater.component';
import { MyFilesComponent } from './apps/my-files/my-files.component';
import { AudioPlayerComponent } from './apps/audio-player/audio-player.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { JsonEnvironmentComponent } from './apps/json-environment/json-environment.component';
import { PieChartV2Component } from './apps/pie-chart-v2/pie-chart-v2.component';
import { GroupedBarChartV2Component } from './apps/grouped-bar-chart-v2/grouped-bar-chart-v2.component';
import { CommentOnIndicesComponent } from './apps/comment-on-indices/comment-on-indices.component';
//import {DataListViewDetailsDialogComponent} from './apps/data-list-view/data-list-view-details-dialog/data-list-view-details-dialog.component';
import { CalendarComponent } from './apps/calendar/calendar.component';


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
    MatSlideToggleModule,
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
    HierarchicalNavigationModule,
    EditorModule,
    PdfViewerModule,
    // KnoraJsonldSimplify,
    AgGridModule.withComponents([]),
    NgxAudioPlayerModule,
    RouterModule.forChild([
      { path: 'page', component: PageComponent },
      { path: 'browserling', component: BrowserlingComponent },
      { path: 'canvas', component: CanvasWhiteboardComponent },
      { path: 'app-our-new-component', component: OurNewComponentComponent },
      { path: 'gnd', component: GndLobidComponent },
      { path: 'audio', component: AudioPlayerComponent },
      { path: 'calendar', component: CalendarComponent }
    ])
  ],
  providers: [
    GenerateHashService,
    OpenAppsModel,
    AbstractJsonService,
    FileDatabase,
    FileDatabaseForApp,
    CanvasWhiteboardComponent,
    FileDatabaseForAppGND,
    DataListViewInAppQueryService
  ],
  declarations: [
    PageComponent,
    Frame,
    TextlistViewerComponent,
    DataManagementComponent,
    DataListViewComponent,
    DataListViewSettingsComponent,
    DataListViewTableComponent,
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
    QueryInformationDialogComponent,
    GrapesjsComponent,
    ParzivalFassungComponent,
    HighlightPipe,
    OpenbisLoginComponent,
    YoutubeVideoComponent,
    DataChooserComponent,
    ResponseTreeComponent,
    IframeComponent,
    PrimeEditorComponent,
    AngularHandsometableComponent,
    RaeberNavigationComponent,
    PdfViewerComponent,
    AppInputComponentComponent,
    FileListDialogComponent,
    AddAppGroupDialogComponent,
    AllAppSelectorsComponent,
    BrowserlingComponent,
    KeyValueComponent,
    CanvasWhiteboardComponent,
    OurNewComponentComponent,
    GndLobidComponent,
    PageListDialogComponent,
    UrlParamUpdaterComponent,
    MyFilesComponent,
    AudioPlayerComponent,
    JsonEnvironmentComponent,
    PieChartV2Component,
    GroupedBarChartV2Component,
    CommentOnIndicesComponent,
    //DataListViewDetailsDialogComponent,
    CalendarComponent
  ],
  exports: [
    PageComponent,
    MatSidenavModule,
    GrapesjsComponent,
    AllAppSelectorsComponent,
    CommentOnIndicesComponent
  ],
  entryComponents: [
    DataManagementComponent,
    QueryEntryComponent,
    QueryAppInputMapComponent,
    FrameSettingsComponent,
    QueryListComponent,
    NewGjsBoxDialogComponent,
    QueryInformationDialogComponent,
    DataChooserComponent,
    AppInputComponentComponent,
    FileListDialogComponent,
    AddAppGroupDialogComponent,
    PageListDialogComponent
  ]
})
export class NIEOSModule { }
