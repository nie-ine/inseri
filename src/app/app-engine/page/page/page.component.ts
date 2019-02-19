

/**
 * Deprecated!
 * Manual: How to add an app:
 * 1. Import the Component or Module in nie-OS.module.ts
 * 2. Add the app to the Model 'openAppsInThisPage' in this file
 * 3. Add this app to the 'Menu to open Apps' - div in nie-OS.component.html
 * 4. Add an app div by copying and pasting one of the existing divs and adjusting the input variables and the selector
 * */

import {AfterViewChecked, ChangeDetectorRef, Component, NgModule, OnInit, VERSION} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Frame} from '../frame/frame';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import {GenerateHashService} from '../../../user-action-engine/other/generateHash.service';
import {OpenAppsModel} from '../../../user-action-engine/mongodb/page/open-apps.model';
import {PageService} from '../../../user-action-engine/mongodb/page/page.service';
import { DataManagementComponent } from '../../../query-app-interface/data-management/data-management/data-management.component';
import {MatDialog} from '@angular/material';
import {GenerateDataChoosersService} from '../../../query-app-interface/data-management/services/generate-data-choosers.service';
import {HttpClient} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';

declare var grapesjs: any; // Important!

@Component({
  selector: 'nie-os',
  templateUrl: `page.component.html`,
})
export class PageComponent implements OnInit, AfterViewChecked {
  projectIRI: string = 'http://rdfh.ch/projects/0001';
  actionID: string;
  length: number;
  page: any;
  action: any;
  panelsOpen = false;
  pageIDFromURL: string;
  openAppsInThisPage: any = {};
  pageAsDemo = false;
  pageUpdated = false;
  isLoading = true;
  resetPage = false;
  reloadVariables = false;
  response: any;
  queryId: string;
  index: number;
  updateLinkedApps = false;
  indexAppMapping: any = {};
  grapesJSActivated = false;
  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private generateHashService: GenerateHashService,
    private openApps: OpenAppsModel,
    private resetOpenApps: OpenAppsModel,
    private pageService: PageService,
    private generateDataChoosers: GenerateDataChoosersService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private requestService: GeneralRequestService
  ) {
    // this.route.params.subscribe(params => console.log(params));
  }

  activateGrapesJS() {
    this.grapesJSActivated = true;
    console.log( 'Activate GrapesJS' );
    const editor = grapesjs.init({
      container: '#grapesJSViewer',
      height: '100%'
    });

    const bm = editor.BlockManager;

    bm.add('block', {
      label: 'Text Block',
      content:  '<div>Your changeable text</div>',
    });

    bm.add('image', {
      label: 'Image',
      content: {
        type: 'image',
      }
    });

    bm.add('my-map-block', {
      label: 'Simple map block',
      attributes: { class:'fa fa-map-o' },
      content: {
        type: 'map',
        style: {
          height: '350px',
          width: '350px'
        }
      }
    });

    bm.add('table', {
      category: 'Basic',
      label: 'Link Block',
      attributes: { class: 'fa fa-link' },
      content: {
        type: 'link',
        droppable: true,
        style: {
          display: 'inline-block',
          padding: '5px',
          'min-height': '50px',
          'min-width': '50px'
        }
      },
    });

    bm.add('mj-1-column', {
      label: '1 Column',
      content: `<mj-section>
        <mj-column><mj-text>Content 1</mj-text></mj-column>
      </mj-section>`,
      attributes: { class: 'gjs-fonts gjs-f-b1' }
    });

    bm.add('mj-2-columns', {
      label: '2 Columns',
      content: `<mj-section>
        <mj-column><mj-text>Content 1</mj-text></mj-column>
        <mj-column><mj-text>Content 2</mj-text></mj-column>
      </mj-section>`,
      attributes: { class: 'gjs-fonts gjs-f-b2' }
    });

    bm.add('mj-3-columns', {
      label: '3 Columns',
      content: `<mj-section>
        <mj-column><mj-text>Content 1</mj-text></mj-column>
        <mj-column><mj-text>Content 2</mj-text></mj-column>
        <mj-column><mj-text>Content 3</mj-text></mj-column>
      </mj-section>`,
      attributes: { class: 'gjs-fonts gjs-f-b3' }
    });

    bm.add('mj-text', {
      label: 'Text',
      content: '<mj-text>Insert text here</mj-text>',
      attributes: { class: 'gjs-fonts gjs-f-text' }
    });

    bm.add('mj-button', {
      label: 'Button',
      content: '<mj-button>Button</mj-button>',
      attributes: { class: 'gjs-fonts gjs-f-button' }
    });

    bm.add('mj-image', {
      label: 'Image',
      content: '<mj-image src="http://placehold.it/350x250/78c5d6/fff">',
      attributes: { class: 'fa fa-image' }
    });

    bm.add('mj-divider', {
      label: 'Divider',
      content: '<mj-divider/>',
      attributes: { class: 'gjs-fonts gjs-f-divider'}
    });

    bm.add('mj-social', {
      label: 'Social',
      content: '<mj-social/>',
      attributes: { class: 'fa fa-share-alt' }
    });

    bm.add('mj-spacer', {
      label: 'Spacer',
      content: '<mj-spacer/>',
      attributes: { class: 'fa fa-arrows-v' }
    });

  }

  deactivateGrapesJS() {
    this.grapesJSActivated = false;
  }

  openDataManagement() {
    this.spinner.show();
    this.pageService.updatePage(this.page)
      .subscribe(
        data => {
          // console.log(data);
          // console.log( this.openAppsInThisPage );
          this.updateOpenAppsInThisPage();
          const dialogRef = this.dialog.open(DataManagementComponent, {
            width: '100%',
            height: '100%',
            data: [ this.openAppsInThisPage, this.page ]
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.resetPage = true;
            console.log(result);
            this.reloadVariables = true;
            this.spinner.show();
            setTimeout(() => {
              this.spinner.hide();
            }, 5000);
          });
        },
        error => {
          console.log(error);
        });
  }

  updateOpenAppsInThisPage() {
    for( const app in this.page.openApps ) {
      if( app && this.openAppsInThisPage[ this.page.openApps[ app ].type ] ) {
        console.log( this.openAppsInThisPage[ this.page.openApps[ app ].type ] );
        for( let openApp of this.openAppsInThisPage[ this.page.openApps[ app ].type ].model ) {
          if ( openApp['hash'] === app ) {
            openApp.type = this.page.openApps[ app ].type;
            console.log( openApp );
            console.log( this.page.openApps[ app ] );
          }
        }
      }
    }
    console.log( this.openAppsInThisPage );
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    if ( this.pageIDFromURL !==  this.route.snapshot.queryParams.page ) {
      console.log( 'Update Page' );
      this.pageIDFromURL = this.route.snapshot.queryParams.page;
      console.log( this.pageIDFromURL, this.route.snapshot.queryParams.page );
      this.reloadVariables = true;
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
    }
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.openAppsInThisPage = {};
    this.page = {};
    const reset = new OpenAppsModel;
    this.openAppsInThisPage = reset.openApps;
    this.actionID = this.route.snapshot.queryParams.actionID;
    this.pageIDFromURL = this.route.snapshot.queryParams.page;
    if ( !this.actionID ) {
      this.pageAsDemo = true;
      this.isLoading = false;
    }
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  updateAppCoordinates(app: any) {
    console.log('x: ' + app.x);
    console.log('y: ' + app.y);
    console.log('type: ' + app.type);
    console.log('hash: ' + app.hash );
    if (this.page.openApps[ app.hash ] === null) {
      this.page.openApps[ app.hash ] = [];
    }
    this.page.openApps[ app.hash ] = app;
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

  createTooltip() {
    if ( this.action ) {
      return 'Aktion: ' + this.action.title + ', Beschreibung: ' + this.action.description;
    } else {
      return null;
    }
  }

  updatePage() {
    console.log( this.page );
    this.page.openApps[ 'grapesJS' ] = {};
    this.page.openApps[ 'grapesJS' ].gjsAssets = localStorage.getItem('gjs-assets');
    this.page.openApps[ 'grapesJS' ].gjsComponents = localStorage.getItem('gjs-components');
    this.page.openApps[ 'grapesJS' ].gjsCss = localStorage.getItem('gjs-css');
    this.page.openApps[ 'grapesJS' ].gjsHtml = localStorage.getItem('gjs-html');
    this.page.openApps[ 'grapesJS' ].gjsStyles = localStorage.getItem('gjs-styles');
    this.page.openApps[ 'grapesJS' ].hash = 'grapesJS';
    // console.log( this.page );
    this.pageService.updatePage(this.page)
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

  expandPanels() {
    this.panelsOpen = !this.panelsOpen;
  }

  updateAppSettings( settings: any ) {
    console.log( settings );
    console.log( this.openAppsInThisPage );
    console.log( this.page );
    for ( const app of this.openAppsInThisPage[ settings.type ].model ) {
      if ( settings.hash === app.hash ) {
        app.title = settings.title;
        app.width = settings.width;
        app.height = settings.height;
      }
    }
    this.page.openApps[ settings.hash ].title = settings.title;
    this.page.openApps[ settings.hash ].width = settings.width;
    this.page.openApps[ settings.hash ].height = settings.height;
  }

  produceHeightAndWidth( appValue: string, defaultHeight: string ) {
    if ( appValue ) {
      return appValue ;
    } else {
      return defaultHeight;
    }
  }

  setGrapesJSLocalStorage( key: string, value: string ) {
    if ( value ) {
      localStorage.setItem( key, value );
    } else {
      localStorage.removeItem(key);
    }
  }

  deleteGrapesJSData() {
    this.grapesJSActivated = false;
    this.setGrapesJSLocalStorage( 'gjs-assets', undefined );
    this.setGrapesJSLocalStorage( 'gjs-components', undefined );
    this.setGrapesJSLocalStorage( 'gjs-css', undefined );
    this.setGrapesJSLocalStorage( 'gjs-html', undefined );
    this.setGrapesJSLocalStorage( 'gjs-styles', undefined );
  }

  receivePage( pageFromLoadComponent: any ) {
    console.log( pageFromLoadComponent );
    if ( pageFromLoadComponent.openApps[ 'grapesJS' ]  ) {
      console.log( 'activate GrapesJS' );
      this.activateGrapesJS();
      setTimeout(() => {
        this.activateGrapesJS();
      }, 3000);
    }
    this.page = pageFromLoadComponent;
    this.reloadVariables = false;
  }

  receiveOpenAppsInThisPage( openAppsInThisPage: any ) {
    // console.log( openAppsInThisPage );
    this.openAppsInThisPage = openAppsInThisPage;
    this.reloadVariables = false;
    this.updateLinkedApps = false;
  }

  updateMainResourceIndex( input: any ) {
    this.index = input.index;
    this.response = input.response;
    this.queryId = input.queryId;
  }

  updateIndices( indexAppMapping: any ) {
    this.indexAppMapping[ indexAppMapping.hash ] = indexAppMapping;
    console.log( this.indexAppMapping );
    this.updateLinkedApps = true;
  }
}
