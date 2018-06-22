import {AfterViewChecked, ChangeDetectorRef, Component, NgModule, OnInit, VERSION} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Popup} from './popup';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from '../../shared/action.service';
import { ViewService } from '../apps/view/view.service';

declare var grapesjs: any; // Important!


@Component({
  selector: 'nie-os',
  templateUrl: `nie-OS.component.html`,
})
export class NIEOSComponent implements OnInit, AfterViewChecked {
  showFiller = false;
  image = {
    '@id' : 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/gJVf-AQjSbSTAo8EsU8ErQ',
    '@type' : 'knora-api:StillImageFileValue',
    'knora-api:fileValueAsUrl' :
      'https://tools.wmflabs.org/' +
      'zoomviewer/proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg/pct:65,81,35,15/full/0/default.jpg',
    'knora-api:fileValueHasFilename' : 'proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg',
    'knora-api:fileValueIsPreview' : false,
    'knora-api:stillImageFileValueHasDimX' : 5184,
    'knora-api:stillImageFileValueHasDimY' : 3456,
    'knora-api:stillImageFileValueHasIIIFBaseUrl' : 'https://tools.wmflabs.org/zoomviewer'
  };
  imageViewerModel = [];
  numberOfImageViewers = 0;
  searchModel = [];
  numberOfSearches = 0;
  grapesJSModel = [];
  numberOfgrapesJS = 0;
  textViewerModel = [];
  numberOfTextViewers = 0;
  actionID: number;
  length: number;
  view: any;
  action: any;
  viewsInStorage: any;
  hashOfView: string;

  constructor(
    private route: ActivatedRoute,
    private actionService: ActionService,
    private viewService: ViewService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.params.subscribe(params => console.log(params));
  }


  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.view = {};
    // console.log('Start der Arbeitsflaeche');
    // Construct fake image Viewer:
    this.actionID = this.route.snapshot.queryParams.actionID;
    this.checkIfViewExistsForThisAction( this.actionID );
  }
  checkIfViewExistsForThisAction( actionID: number ) {
    this.actionService.getById( actionID )
      .subscribe(
        data => {
          this.action = data;
          console.log('This action: ');
          console.log(this.action);
          if ( this.action && this.action.hasViews[ 0 ] ) {
            this.updateAppsInView( this.action.hasViews );
          } else {
            console.log('No views for this action yet');
            this.view.hash = this.generateHash();
            console.log(this.view);
            return undefined;
          }
        },
        error => {
          console.log(error);
          return undefined;
        });
  }
  generateHash(): string {
    console.log('generate Hash');
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(
        Math.floor(Math.random() * possible.length )
      );
    }
    return text;
  }

  deleteView() {
    console.log('Delete View');
  }

  updateAppCoordinates(app: any) {
    console.log('x: ' + app.x);
    console.log('y: ' + app.y);
    console.log('type: ' + app.type);
    console.log('hash: ' + app.hash );
    this.view[ app.hash ] = app;
    console.log( this.view );
  }

  // Next: go through code and generalise app saving mechanism
  updateAppsInView( viewHashes: Array<any> ) {
    console.log('updateAppsInView');
    console.log(viewHashes);
    // console.log('get views from Backend');
    this.viewService.getById( viewHashes[ 0 ] )
      .subscribe(
        data => {
          this.view = data;
          console.log( data );
          for ( const app in this.view ) {
              if ( data[ app ].type === 'imageViewers' ) {
                this.updateApp(
                  'imageViewers',
                  this.imageViewerModel,
                  data[ app ]
                );
              }
          }
        },
        error => {
          console.log(error);
        });
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
    console.log( this.imageViewerModel );
  }
  createTooltip() {
    if( this.action ) {
      return 'Aktion: ' + this.action.title + ', Beschreibung: ' + this.action.description;
    } else {
      return null;
    }
  }

  saveView() {
    console.log('Save View');
    console.log('Action ID: ' + this.actionID);
    if ( this.action.hasViews[0] ) {
      console.log('update view for this action');
      console.log(this.action);
      console.log(this.view);
      this.viewService.update( this.view )
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          });
    } else {
      console.log('Save new View');
      console.log('1. Attach hash of this view to action model ' + this.view.hash);
      this.action.hasViews[ 0 ] = this.view.hash;
      console.log(this.view);
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
      this.viewService.create( this.view )
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
    console.log(appModel[ length ]);
    if( generateHash ) {
      appModel[ length ].hash = this.generateHash();
    }
    return appModel;
  }
  closeApp(
    appModel: Array<any>,
    i: number
  ) {
    appModel.splice(
      i,
      1);
  }
}
