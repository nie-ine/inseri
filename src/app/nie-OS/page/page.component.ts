

/**
 * Manual: How to add an app:
 * 1. Import the Component or Module in nie-OS.module.ts
 * 2. Add the app to the Model "openAppsInThisPage" in this file
 * 3. Add this app to the "Menu to open Apps" - div in nie-OS.component.html
 * 4. Add an app div by copying and pasting one of the existing divs and adjusting the input variables and the selector
 * */

import {AfterViewChecked, ChangeDetectorRef, Component, NgModule, OnInit, VERSION} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Frame} from './frame';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from '../../shared/nieOS/fake-backend/action/action.service';
import { PageService } from '../apps/page/page.service';
import {GenerateHashService} from "../../shared/nieOS/other/generateHash.service";
import {OpenAppsModel} from '../../shared/nieOS/mongodb/page/open-apps.model';
import {MongoPageService} from '../../shared/nieOS/mongodb/page/page.service';
import {MongoActionService} from '../../shared/nieOS/mongodb/action/action.service';
import { DataManagementComponent } from '../data-management/data-management.component';
import {MatDialog} from '@angular/material';
import {GenerateDataChoosersService} from '../data-management/generate-data-choosers.service';

declare var grapesjs: any; // Important!


@Component({
  selector: 'nie-os',
  templateUrl: `page.component.html`,
})
export class PageComponent implements OnInit, AfterViewChecked {
  image = {
    '@id' : 'https://www.e-manuscripta.ch/zuz/i3f/v20/1510612/canvas/1510618',
    '@type' : 'knora-api:StillImageFileValue',
    'knora-api:fileValueAsUrl' :
      'https://www.e-manuscripta.ch/zuz/i3f/v21/1510618/full/1304/0/default.jpg',
    'knora-api:fileValueHasFilename' : '1510618',
    'knora-api:fileValueIsPreview' : false,
    'knora-api:stillImageFileValueHasDimX' : 3062,
    'knora-api:stillImageFileValueHasDimY' : 4034,
    'knora-api:stillImageFileValueHasIIIFBaseUrl' : 'https://www.e-manuscripta.ch/zuz/i3f/v20'
  };
  projectIRI: string = 'http://rdfh.ch/projects/0001';
  actionID: string;
  length: number;
  page: any;
  action: any;
  panelsOpen = false;
  pageIDFromURL: string;
  openAppsInThisPage: any;
  pageAsDemo = false;
  pageUpdated = false;

  constructor(
    private route: ActivatedRoute,
    private actionService: ActionService,
    private pageService: PageService,
    private cdr: ChangeDetectorRef,
    private generateHashService: GenerateHashService,
    private openApps: OpenAppsModel,
    private resetOpenApps: OpenAppsModel,
    private mongoPageService: MongoPageService,
    private mongoActionService: MongoActionService,
    private generateDataChoosers: GenerateDataChoosersService,
    public dialog: MatDialog
  ) {
    // this.route.params.subscribe(params => console.log(params));
  }

  openDataManagement() {
    const dialogRef = this.dialog.open(DataManagementComponent, {
      width: '100%',
      height: '100%',
      data: this.openAppsInThisPage
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    if ( this.pageIDFromURL !==  this.route.snapshot.queryParams.page ) {
      this.clearAppsInThisPage();
      this.updatePageFromUrl();
    }
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.updatePageFromUrl();
    if ( !this.actionID ) {
      this.pageAsDemo = true;
    }
  }

  updatePageFromUrl() {
    this.openAppsInThisPage = {};
    this.page = {};
    this.openAppsInThisPage = this.openApps.openApps;
    this.actionID = this.route.snapshot.queryParams.actionID;
    this.pageIDFromURL = this.route.snapshot.queryParams.page;
    if ( this.pageIDFromURL ) {
      this.updateAppsInView( this.pageIDFromURL );
    } else {
      this.checkIfPageExistsForThisAction( this.actionID );
    }
  }

  checkIfPageExistsForThisAction(actionID: string) {
    this.mongoActionService.getAction(actionID)
      .subscribe(
        data => {
          this.action = ( data as any ).body.action;
          // console.log('This action: ', this.action);
          if (this.action.type === 'page') {
              this.updateAppsInView(this.action.hasPage._id);
          }
        },
        error => {
          console.log(error);
        });
  }

  updateAppCoordinates(app: any) {
    console.log('x: ' + app.x);
    console.log('y: ' + app.y);
    console.log('type: ' + app.type);
    console.log('hash: ' + app.hash );
    console.log( this.page );
    if (this.page.openApps[ app.hash ] === null) {
      this.page.openApps[ app.hash ] = [];
    }
    this.page.openApps[ app.hash ] = app;
    console.log(this.page);
  }

  updateAppsInView(viewHash: string ) {
    this.mongoPageService.getPage(viewHash)
      .subscribe(
        data => {
          this.page = ( data as any).page;
          const appHelperArray = [];
          for ( const app of this.page.openApps ) {
            // console.log(JSON.parse(app));
            appHelperArray[JSON.parse(app).hash] = JSON.parse(app);
          }
          this.page.openApps = appHelperArray;
          // console.log(this.page.openApps);
          for ( const app in this.page.openApps ) {
            for ( const appType in this.openAppsInThisPage ) {
              this.initiateUpdateApp(
                this.page.openApps[ app ],
                this.openAppsInThisPage[ appType ].type,
                this.openAppsInThisPage[ appType ].model
              );
            }
          }
          this.generateDataChoosers.generateDataChoosers(
            this.page,
            this.openAppsInThisPage
          );
        },
        error => {
          console.log(error);
        });
  }

  clearAppsInThisPage() {
    console.log('Clear apps in this page');
    console.log(this.openApps.openApps);
    for ( const app in this.openApps.openApps ) {
      this.openApps.openApps[ app ].model = [];
      // console.log( this.openApps.openApps[ app ].model );
    }
    console.log(this.openApps.openApps);
  }

  initiateUpdateApp(
    appFromViewModel: any,
    appType: string,
    appModel: any
  ) {
    if ( appFromViewModel.type === appType ) {
      this.updateApp(
        appType,
        appModel,
        appFromViewModel
      );
    }
  }

  updateApp(
    appType: string,
    appModel: any,
    appFromViewModel: any
  ) {
    const length = appModel.length;
    appModel[ length ] = {};
    appModel[ length ].x = appFromViewModel.x;
    appModel[ length ].y = appFromViewModel.y;
    appModel[ length ].hash = appFromViewModel.hash;
    appModel[ length ].type = appType;
    appModel[ length ].initialized = true;
  }

  createTooltip() {
    if ( this.action ) {
      return 'Aktion: ' + this.action.title + ', Beschreibung: ' + this.action.description;
    } else {
      return null;
    }
  }

  updatePage() {
    console.log('update page for this action');
    this.mongoPageService.updatePage(this.page)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  addAnotherApp (
    appModel: any,
    generateHash: boolean
  ): Array<any> {
    console.log('add another app');
    const length = appModel.length;
    appModel[ length ] = {};
    console.log('Add type and Id here');
    if ( generateHash ) {
      appModel[ length ].hash = this.generateHashService.generateHash();
    }
    console.log( appModel, this.openAppsInThisPage );
    return appModel;
  }

  closeApp(
    appModel: Array<any>,
    i: number
  ) {
    console.log(appModel);
    console.log(this.page);
    console.log(this.page.openApps[appModel[ i ].hash]);
    delete this.page.openApps[appModel[ i ].hash];
    appModel.splice(
      i,
      1);
    console.log(this.page);
    console.log(this.openAppsInThisPage);
  }

  updateAppTypesFromDataChooser( openAppsInThisPageFromDataChooser: any ) {
    console.log( this.openAppsInThisPage );
    console.log( openAppsInThisPageFromDataChooser );
    this.openAppsInThisPage = openAppsInThisPageFromDataChooser;
    console.log('updateAppTypesFromDataChooser');
  }

  expandPanels() {
    this.panelsOpen = !this.panelsOpen;
  }
}
