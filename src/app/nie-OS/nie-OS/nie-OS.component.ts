

/**
 * Manual: How to add an app:
 * 1. Import the Component or Module in nie-OS.module.ts
 * 2. Add the app to the Model "appTypes" in this file
 * 3. Add this app to the "Menu to open Apps" - div in nie-OS.component.html
 * 4. Add an app div by copying and pasting one of the existing divs and adjusting the input variables and the selector
 * */

import {AfterViewChecked, ChangeDetectorRef, Component, NgModule, OnInit, VERSION} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Popup} from './popup';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from '../../shared/nieOS/fake-backend/action/action.service';
import { PageService } from '../apps/page/page.service';
import {GenerateHashService} from "../../shared/nieOS/other/generateHash.service";

declare var grapesjs: any; // Important!


@Component({
  selector: 'nie-os',
  templateUrl: `nie-OS.component.html`,
})
export class NIEOSComponent implements OnInit, AfterViewChecked {
  showFiller = false;
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
  actionID: number;
  length: number;
  page: any;
  action: any;
  panelsOpen = false;
  viewHashFromURL: string;
  appTypes = {
    imageViewer: {
      type: 'imageViewers',
      model: []
    },
    textViewer: {
      type: 'textViewers',
      model: []
    },
    searchViewer: {
      type: 'searchViewers',
      model: []
    },
    grapesJSViewer: {
      type: 'grapesJSViewers',
      model: []
    },
    synopsisViewer: {
      type: 'synopsisViewers',
      model: []
    },
    createResourceForm: {
      type: 'createResourceForm',
      model: []
    },
    dataChooser: {
      type: 'dataChooser',
      model: []
    },
    textlistViewers: {
      type: 'textlistViewers',
      model: [],
      inputs: [
        {
          'inputName': 'textlist'
        }
      ]
    },
    barCharts: {
      type: 'barCharts',
      model: []
    },
    lineCharts: {
      type: 'lineCharts',
      model: []
    },
    brushZoomCharts: {
      type: 'brushZoomCharts',
      model: []
    },
    leafletMaps: {
      type: 'leafletMaps',
      model: []
    },
    pieCharts: {
      type: 'pieCharts',
      model: []
    },
    radialBarCharts: {
      type: 'radialBarCharts',
      model: []
    },
    sankeyCharts: {
      type: 'sankeyCharts',
      model: []
    },
    stackedBarCharts: {
      type: 'stackedBarCharts',
      model: []
    }
  };

  constructor(
    private route: ActivatedRoute,
    private actionService: ActionService,
    private pageService: PageService,
    private cdr: ChangeDetectorRef,
    private generateHashService: GenerateHashService
  ) {
    this.route.params.subscribe(params => console.log(params));
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    if ( this.viewHashFromURL !==  this.route.snapshot.queryParams.view ) {
      this.appTypes = {
        imageViewer: {
          type: 'imageViewers',
          model: []
        },
        textViewer: {
          type: 'textViewers',
          model: []
        },
        searchViewer: {
          type: 'searchViewers',
          model: []
        },
        grapesJSViewer: {
          type: 'grapesJSViewers',
          model: []
        },
        synopsisViewer: {
          type: 'synopsisViewers',
          model: []
        },
        createResourceForm: {
          type: 'createResourceForm',
          model: []
        },
        dataChooser: {
          type: 'dataChooser',
          model: []
        },
        textlistViewers: {
          type: 'textlistViewers',
          model: [],
          inputs: [
            {
              'inputName': 'textarray'
            }
          ]
        },
        barCharts: {
        type: 'barCharts',
          model: []
        },
        lineCharts: {
          type: 'lineCharts',
          model: []
        },
        brushZoomCharts: {
          type: 'brushZoomCharts',
          model: []
        },
        leafletMaps: {
          type: 'leafletMaps',
          model: []
        },
        pieCharts: {
          type: 'pieCharts',
          model: []
        },
        radialBarCharts: {
          type: 'radialBarCharts',
          model: []
        },
        sankeyCharts: {
          type: 'sankeyCharts',
          model: []
        },
        stackedBarCharts: {
          type: 'stackedBarCharts',
          model: []
        }
      };
      this.page = {};
      // console.log('Start der Arbeitsflaeche');
      // Construct fake image Viewer:
      this.actionID = this.route.snapshot.queryParams.actionID;
      this.viewHashFromURL = this.route.snapshot.queryParams.view;
      if ( this.viewHashFromURL ) {
        this.instantiateView( this.viewHashFromURL );
      } else {
        this.checkIfPageExistsForThisAction( this.actionID );
      }
    }
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.page = {};
    // console.log('Start der Arbeitsflaeche');
    // Construct fake image Viewer:
    this.actionID = this.route.snapshot.queryParams.actionID;
    this.viewHashFromURL = this.route.snapshot.queryParams.view;
    if ( this.viewHashFromURL ) {
      this.instantiateView( this.viewHashFromURL );
    } else {
      this.checkIfPageExistsForThisAction( this.actionID );
    }
  }
  openDataChooser() {
    console.log('Open Data Chooser');
  }
  instantiateView( viewHash: string ) {
    console.log( 'ViewHash: ' + viewHash );
    this.updateAppsInView( viewHash );
    this.actionService.getById( this.actionID )
      .subscribe(
        data => {
          this.action = data;
        },
        error => {
          console.log(error);
          return undefined;
        });
  }
  checkIfPageExistsForThisAction(actionID: number ) {
    this.actionService.getById( actionID )
      .subscribe(
        data => {
          this.action = data;
          console.log('This action: ');
          console.log(this.action);
          if ( this.action && this.action.hasViews[ 0 ] ) {
            this.updateAppsInView( this.action.hasViews[ 0 ] );
          } else {
            console.log('No pages for this action yet');
            this.page.hash = this.generateHashService.generateHash();
            console.log(this.page);
            return undefined;
          }
        },
        error => {
          console.log(error);
          return undefined;
        });
  }

  deletePage() {
    console.log('Delete page');
  }

  updateAppCoordinates(app: any) {
    console.log('x: ' + app.x);
    console.log('y: ' + app.y);
    console.log('type: ' + app.type);
    console.log('hash: ' + app.hash );
    if ( this.page[ app.hash ] === null ) {
      this.page[ app.hash ] = [];
    }
    this.page[ app.hash ] = app;
    console.log( this.page );
  }

  // Next: go through code and generalise app saving mechanism
  updateAppsInView( viewHash: string ) {
    // console.log('updateAppsInView');
    // console.log('get views from Backend');
    this.pageService.getById( viewHash )
      .subscribe(
        data => {
          this.page = data;
          console.log(this.page);
          for ( const app in this.page ) {
            for ( const appType in this.appTypes ) {
              this.initiateUpdateApp(
                data[ app ],
                this.appTypes[ appType ].type,
                this.appTypes[ appType ].model
              );
            }
          }
        },
        error => {
          console.log(error);
        });
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
    console.log(appModel);
  }

  createTooltip() {
    if ( this.action ) {
      return 'Aktion: ' + this.action.title + ', Beschreibung: ' + this.action.description;
    } else {
      return null;
    }
  }

  savePage() {
    console.log('Save Page');
    console.log('Action ID: ' + this.actionID);
    if ( this.action.hasViews[0] ) {
      console.log('update page for this action');
      console.log(this.action);
      console.log(this.page);
      this.pageService.update( this.page )
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          });
    } else {
      console.log('Save new Page');
      console.log('1. Attach hash of this view to action model ' + this.page.hash);
      this.action.hasViews[ 0 ] = this.page.hash;
      console.log(this.page);
      console.log(this.action);
      // Update ActionService so that it contains hash of new view
      this.actionService.update(this.action)
        .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
      // Save new view
      this.pageService.create( this.page )
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
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
    return appModel;
  }

  closeApp(
    appModel: Array<any>,
    i: number
  ) {
    console.log(appModel);
    console.log(this.page);
    console.log(this.page[appModel[ i ].hash]);
    delete this.page[appModel[ i ].hash];
    appModel.splice(
      i,
      1);
    console.log(this.page);
    console.log(this.appTypes);
  }

  updateAppTypesFromDataChooser( appTypesFromDataChooser: any ) {
    console.log( this.appTypes );
    console.log( appTypesFromDataChooser );
    this.appTypes = appTypesFromDataChooser;
    console.log('updateAppTypesFromDataChooser');
  }

  returnTextListArray( appInput: any ) {
    if ( appInput.inputs ) {
      return appInput.inputs[0].array;
    }
  }

  expandPanels() {
    this.panelsOpen = !this.panelsOpen;
  }

  initialiseBarchart(initialised: boolean) {
    console.log(initialised);
    initialised = true;
  }
}
