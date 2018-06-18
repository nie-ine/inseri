import {AfterViewChecked, ChangeDetectorRef, Component, NgModule, OnInit, VERSION} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Popup} from './popup';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from '../../shared/action.service';
import {ViewService} from '../../shared/view.service';

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
    console.log('Start der Arbeitsflaeche');
    // Construct fake image Viewer:
    this.actionID = this.route.snapshot.queryParams.actionID;
    this.checkIfViewExistsForThisAction( this.actionID );
  }
  checkIfViewExistsForThisAction( actionID: number) {
    this.actionService.getById(actionID)
      .subscribe(
        data => {
          this.action = data;
          console.log(this.action);
          if ( this.action && this.action.hasViews[ 0 ] ) {
            console.log(this.action.hasViews);
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
    console.log('generate Hash for this app');
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
    console.log('id: ' + app.hash );
    this.view[ app.hash ] = app;
    console.log( this.view );
  }

  updateAppsInView( views: Array<any>) {
    console.log('updateAppsInView');
    console.log(views);
    console.log('get views from Backend');
    this.viewService.getById( views[ 0 ] )
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
    for ( const app of this.view ) {
      if ( app ) {
        console.log( app );
        if ( app.type === 'imageViewers' ) {
          this.addAnotherImageViewer();
          console.log('Number of ImageViewers in View: ' + this.numberOfImageViewers);
          this.imageViewerModel[ this.numberOfImageViewers - 1 ] = {};
          this.imageViewerModel[ this.numberOfImageViewers - 1 ].x = app.x;
          this.imageViewerModel[ this.numberOfImageViewers - 1 ].y = app.y;
          this.imageViewerModel[ this.numberOfImageViewers - 1 ].id = app.id;
          this.imageViewerModel[ this.numberOfImageViewers - 1 ].id = app.hash;
        }
      }
    }
  }

  createTooltip() {
    if( this.action ) {
      return 'Aktion: ' + this.action.title + ', Beschreibung: ' + this.action.description;
    } else {
      return null;
    }
  }

  saveView() {
    // console.log('Save View');
    // console.log('Action ID: ' + this.actionID);
    // if ( this.action.hasViews[0] ) {
    //   console.log('update view for this action');
    //   console.log(this.action);
    //   this.view.hash = this.action.hasViews[0];
    //   console.log(this.view);
    //   this.viewService.update( this.view )
    //     .subscribe(
    //       data => {
    //         console.log(data);
    //       },
    //       error => {
    //         console.log(error);
    //       });
    // } else {
      console.log('Save new View');
      console.log('1. Attach hash of this view to action model ' + this.view.hash);
      this.action.hasViews[ 0 ] = this.view.hash;
      console.log(JSON.stringify(this.view));
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
    //}
  }

  // Imageviewer
  addAnotherImageViewer() {
    const length = this.imageViewerModel.length;
    this.imageViewerModel[ length ] = {};
    this.imageViewerModel[ length ].numberOfImageViewers = this.numberOfImageViewers + 1;
    this.imageViewerModel[ length ].hash = this.generateHash();
    this.numberOfImageViewers += 1;
  }
  closeImageViewer(i: number) {
    this.imageViewerModel.splice( i,1 );
  }

  // Search
  addAnotherSearch() {
    this.length = this.searchModel.length;
    this.searchModel[this.length] = this.numberOfSearches + 1;
    this.numberOfSearches += 1;
  }
  closeSearch(i: number) {
    this.searchModel.splice( i, 1 );
  }

  //GrapesJS
  addAnotherGrapesJS() {
    this.length = this.grapesJSModel.length;
    this.grapesJSModel[this.length] = this.numberOfgrapesJS + 1;
    this.numberOfgrapesJS += 1;
  }
  closeGrapesJS(i: number) {
    this.grapesJSModel.splice( i, 1 );
  }
  addAnotherTextViewer() {
    this.length = this.textViewerModel.length;
    this.textViewerModel[this.length] = this.numberOfTextViewers + 1;
    this.numberOfTextViewers += 1;
  }

  closeTextViewer(i: number) {
    this.textViewerModel.splice(i, 1);
  }

}
