import {Component, NgModule, OnInit, VERSION} from '@angular/core';
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
export class NIEOSComponent implements OnInit {
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
  view: any = {};
  action: any;
  viewsInStorage: any;

  constructor(
    private route: ActivatedRoute,
    private actionService: ActionService,
    private viewService: ViewService
  ) {
    this.route.params.subscribe(params => console.log(params));
  }

  ngOnInit() {
    this.view = [];
    console.log('Start der Arbeitsflaeche');
    // Construct fake image Viewer:
    this.actionID = this.route.snapshot.queryParams.actionID;
    console.log(this.actionID);

    console.log('get all views');
    this.viewService.getAll()
      .subscribe(
        data => {
          this.viewsInStorage = data;
          console.log('Check if views exists for this action - Id');
          for ( const viewArray of this.viewsInStorage ) {
            for ( const view of viewArray ) {
              if ( view !== null ) {
                if ( view.belongsToAction === this.actionID ) {
                  this.view[this.view.length] = view;
                }
                console.log( view );
              }
            }
          }
        },
        error => {
          console.log(error);
        });
      if ( this.actionID.toString() === '1') {
        const imageViewer = {
          'id': 70,
          'x': 80,
          'y': 90,
          'z': 100,
          'type': 'imageViewers',
          'belongsToAction': this.actionID
        };
        this.view[this.view.length] = imageViewer;
        console.log(this.actionID);
        this.actionService.getById(this.actionID)
          .subscribe(
            data => {
              this.action = data;
              // Because of the fake image viewer above
              this.action.hasView = true;
              console.log(data);
              this.reconstructView();
            },
            error => {
              console.log(error);
            });
      }
  }

  deleteView() {
    console.log('Delete View');
  }

  updateAppCoordinates(app: any) {
    console.log('x: ' + app.x);
    console.log('y: ' + app.y);
    console.log('type: ' + app.type);
    console.log('id: ' + app.id);
    this.view[app.id] =  app;
  }

  updateAppsInView() {
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
        }
      }
    }
  }

  reconstructView() {
    if ( this.action.hasView ) {
      console.log('We found a view! - Update View Array and properties');
      this.updateAppsInView();
    } else {
      console.log('There is no view yet for this action');
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
    console.log('Save View');
    console.log('Action ID: ' + this.actionID);
    console.log('Current View in Fake Backend: ');
    this.viewService.create( this.view )
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  // Imageviewer
  addAnotherImageViewer() {
    this.length = this.imageViewerModel.length;
    this.imageViewerModel[this.length] = this.numberOfImageViewers + 1;
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
