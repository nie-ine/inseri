/**
 * This is the page.component, the central component for opening and open apps.
 * Data for the apps are loaded with the help of the load-variables component.
 * */

import {AfterViewChecked, ChangeDetectorRef, Component, NgModule, OnInit, VERSION, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import {ActivatedRoute, Router} from '@angular/router';
import {GenerateHashService} from '../../../user-action-engine/other/generateHash.service';
import {OpenAppsModel} from '../../../user-action-engine/mongodb/page/open-apps.model';
import {PageService} from '../../../user-action-engine/mongodb/page/page.service';
import { DataManagementComponent } from '../../../query-app-interface/data-management/data-management/data-management.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';
import {QueryInformationDialogComponent} from '../query-information-dialog/query-information-dialog.component';
import {StyleMappingService} from '../../../query-app-interface/services/style-mapping-service';
import {PageMenuComponent} from '../page-menu/page-menu.component';
import {Subscription} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ActionService} from '../../../user-action-engine/mongodb/action/action.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AppMenuModel } from './appMenu.model';
import {ExtendSessionComponent, PizzaPartyComponent} from '../../../user-action-engine/header/header.component';
import {AuthService} from '../../../user-action-engine/mongodb/auth/auth.service';
import {QueryService} from '../../../user-action-engine/mongodb/query/query.service';


@Component({
  selector: 'nie-os',
  templateUrl: `page.component.html`,
  providers: [StyleMappingService]
})
export class PageComponent implements OnInit, AfterViewChecked {

  /**
   * Needed for the inseri page menu, this array indicates the columns of the mat-table
   * */
  displayedColumns: string[] = ['id', 'name', 'tags', 'status'];

  /**
   * this variable instantiates the MatTableDataSource used for the inseri app menu
   * */
  dataSource: MatTableDataSource<any>;

  /**
   * paginator for the inseri app menu
   * */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * needed for the sorting for the inseri app menu
   * */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * actionID - the actionID of the action that the page belongs to
   * */
  actionID: string;

  /**
   * page - information about the page, title, queryIDs, etc.
   * */
  page: any = {};

  /**
   * action - information about the action, title, etc
   * */
  action: any;

  /**
   * panelsOpen - indicates if all panels in the sideNav are open or closed
   * */
  panelsOpen = false;

  /**
   * pageIDFromURL - pageID, taken from the URL - param
   * */
  pageIDFromURL: string;

  /**
   * openAppsInThisPage - open apps formatted in a way that ng iterates through them in page.html
   * */
  openAppsInThisPage: any = (new OpenAppsModel).openApps;

  /**
   * pageAsDemo - if no pageID is given in the url, a demo page is opened
   * */
  pageAsDemo = false;

  /**
   * isLoading - indicates if spinner is displayed or not
   * */
  isLoading = true;

  /**
   * resetPage - gets rid of all open apps
   * */
  resetPage = false;

  /**
   * reloadVariables - initialises a reload of all open apps for the current page
   * */
  reloadVariables = false;

  /**
   * response - after choosing a data entry in the data chooser, the response of the respective query is send back as well
   * */
  response: any;

  /**
   * queryID - after choosing a data entry in the data chooser, the queryID of the respective query is send back as well
   * */
  queryId: string;

  /**
   * index - when a user klick on the array in the data chooser, the index that the user chose is send back to the page.component
   * */
  index: number;

  /**
   * depth - depth in json of the array that the user chose in the data - chooser
   * */
  depth: number;

  /**
   * cssUrl - variable needed for POC of page - specific css, contact domsteinbach on github for more information
   * */
  cssUrl: any;

  /**
   * appFramePosition - "static" if user chooses the option to sort apps by type, "absolute" otherwise
   * */
  appFramePosition = 'absolute';

  /**
   * currentRoute: is used to get url params, for example to determin if page is part of a pageSet
   * */
  currentRoute: string;

  /**
   * needed to generate the navigation in case that the page belongs to a pageSet
   * */
  pagesOfThisActtion: Array<any>;

  /**
   * same as pageID
   * */
  hashOfThisPage: string;

  /**
   *  - Needed to generate the navigation
   * */
  lastView: any;

  /**
   * Needed to generate the navigation
   * */
  nextView: any;
  /**
   * If an action is a pageSet, it contains an array with the pages, from this array the navigation is created,
   * the following value is needed to generate the navigation
   * */
  selectedPage = 0;

  /**
   * This variable makes sure that the load-variables.component is loaded only once
   * */
  alreadyLoaded = false;

  /**
   * this variable indicates if page is shown in the preview - mode which indicates how the page would look published.
   * */
  preview = false;

  userInfo: string;

  sub: any;
  snackBarOpen = false;
  lightHouse = true;
  showAppTitlesOnPublish = false;
  showInseriLogoOnPublish = false;
  showAppSettingsOnPublish = false;
  showDataBrowserOnPublish = true;
  publishedOptionsExpanded = false;
  pageIsPublished = false;

  appTypes: Array<string> = [];

  constructor(
    public route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private generateHashService: GenerateHashService,
    private openApps: OpenAppsModel,
    private resetOpenApps: OpenAppsModel,
    private pageService: PageService,
    public dialog: MatDialog,
    public queryInfoDialog: MatDialog,
    private spinner: NgxSpinnerService,
    private requestService: GeneralRequestService,
    public sanitizer: DomSanitizer,
    private stylemapping: StyleMappingService,
    private actionService: ActionService,
    private router: Router,
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private queryService: QueryService
  ) {
    this.route.queryParams.subscribe(params => {
      this.hashOfThisPage = params.page;
      this.actionID = params.actionID;
      this.generateNavigation(params.actionID);
    });
    this.dataSource = new MatTableDataSource(
      new AppMenuModel().appMenu
    );
  }

  openDataManagement() {
    this.spinner.show();
    this.pageService.updatePage(
      { ...this.page }
    )
      .subscribe(
        data => {
          this.updateOpenAppsInThisPage();
          const dialogRef = this.dialog.open(DataManagementComponent, {
            width: '100%',
            height: '100%',
            data: [ this.openAppsInThisPage, this.page ]
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.resetPage = true;
            this.reloadVariables = true;
            this.spinner.show();
            setTimeout(() => {
              this.spinner.hide();
            }, 5000); // TODO: bind end of spinner to event that all queries have been loaded instead of setTimeout!
          });
        },
        error => {
          console.log(error);
        });
  }

  updateOpenAppsInThisPage() {
    for ( const app in this.page.openApps ) {
      if ( app && this.openAppsInThisPage[ this.page.openApps[ app ].type ] ) {
        for ( const openApp of this.openAppsInThisPage[ this.page.openApps[ app ].type ].model ) {
          if ( openApp['hash'] === app ) {
            openApp.type = this.page.openApps[ app ].type;
          }
        }
      }
    }
  }

  /**
   * if the pageID changes in URL, the page is updated through setting reloadViariables to true,
   * this change is detected by the load - variables.component which loads all variables and
   * emits it back to the page.component
   * */
  ngAfterViewChecked() {
    this.cdr.detectChanges();
    if ( this.pageIDFromURL !==  this.route.snapshot.queryParams.page ) {
      this.pageIDFromURL = this.route.snapshot.queryParams.page;
      this.reloadVariables = true;
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 5000); // TODO: bind end of spinner to event that all queries have been loaded instead of setTimeout!
    }
    this.cdr.detectChanges();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    for ( const appType in this.openApps.openApps ) {
      this.appTypes.push( appType );
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log( this.route.snapshot );
    if (
      this.route.snapshot.url[0].path === 'home' &&
      this.route.snapshot.queryParams.actionID === undefined
    ) {
      this.addAnotherApp( 'login', true );
      console.log( this.openAppsInThisPage );
      this.openAppsInThisPage[ 'login' ].model[ 0 ].initialized = true;
      this.openAppsInThisPage[ 'login' ].model[ 0 ].x = 150;
      this.openAppsInThisPage[ 'login' ].model[ 0 ].y = 130;
    }
    // this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.stylemapping.getUserCss().toString());
    this.actionID = this.route.snapshot.queryParams.actionID;
    this.pageIDFromURL = this.route.snapshot.queryParams.page;
    if ( !this.actionID ) {
      this.pageAsDemo = true;
      this.isLoading = false;
      this.lightHouse = false;
    }
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000); // TODO: bind end of spinner to event that all queries have been loaded instead of setTimeout!
    localStorage.removeItem('curZIndex');
    if ( this.pageAsDemo ) {
      this.startLightHouse();
    }
  }

  startLightHouse() {
    setTimeout(() => {
      this.lightHouse = !this.lightHouse;
      this.startLightHouse();
    }, 7000);
  }

  addVideoApp( url: string ) {
    this.addAnotherApp( 'youtubeVideo', true );
    const length = this.openAppsInThisPage[ 'youtubeVideo' ].model.length - 1;
    console.log( length );
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ].initialized = true;
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ].x = 100;
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ].y = 100;
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ]['videoURL'] = url;
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ].width = 600;
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ].height = 400;
  }

  checkIfSelected( index: number ) {
    return (index === this.selectedPage);
  }

  selectPage(i: number, page: any) {
    this.selectedPage = i;
    this.navigateToOtherView(page);
  }

  navigateToOtherView(page: any) {
    console.log('Navigate to last View');
    this.router.navigate( [ 'page' ], {
      queryParams: {
        'actionID': this.actionID,
        'page': page._id
      }
    } );
  }

  generateNavigation(actionID: string) {
    if (!this.alreadyLoaded && actionID) {
      this.actionService.getAction(actionID)
        .subscribe(data => {
            if (data.body.action.type === 'page-set') {
              this.pagesOfThisActtion = [];
              for (const page of ( data.body as any ).action.hasPageSet.hasPages as any ) {
                console.log( page._id, this.hashOfThisPage );
                if ( page._id === this.hashOfThisPage ) {
                  this.selectedPage = this.pagesOfThisActtion.length;
                  console.log( this.selectedPage );
                }
                this.pagesOfThisActtion[this.pagesOfThisActtion.length] = page;
                this.alreadyLoaded = true;
              }
            }
          },
          error => {
            // console.log(error);
          });
    }
  }

  /**
   * This routine updates the coordinates and all other metadata of a moved app in the variable
   * page.openApps[ app.hash ]. This is necessary for the updatePage() routine which saves the page
   * including all open apps.
   * */
  updateAppCoordinates(app: any) {
    if (this.page.openApps[ app.hash ] === null) {
      this.page.openApps[ app.hash ] = [];
    }
    this.page.openApps[ app.hash ] = app;
  }

  createTooltip() {
    if ( this.action ) {
      return 'Page: ' + this.action.title + ', Description: ' + this.action.description;
    } else {
      return null;
    }
  }

  updatePage() {
    this.page.openApps[ 'appsTiledOrFloating' ] = {};
    this.page.openApps[ 'appsTiledOrFloating' ].hash = 'appsTiledOrFloating';
    this.page.openApps[ 'appsTiledOrFloating' ].layout = this.appFramePosition;
    /**
     *  - it is important to give a COPY of this.page as an input, thus { ...this.page },
     * otherwise this.page will be rewritten by the routine pageService.updatePage
     * during its execution!
     * */
    this.pageService.updatePage(
      { ...this.page }
      )
      .subscribe(
        data => {
          console.log(data);
          this.snackBar.open( 'Page successfully saved', 'ok',
            {
              duration: 1500
            });
        },
        error => {
          console.log(error);
          this.snackBar.open( 'Sth went wrong, page has not been saved' );
        });
  }

  /**
   * Todo: continue here with documentation!
   * */
  addAnotherApp (
    appType: string,
    generateHash: boolean
  ): Array<any> {
    const appModel = this.openAppsInThisPage[ appType ].model;
    const length = appModel.length;
    appModel[ length ] = {};
    if ( generateHash ) {
      appModel[ length ].hash = this.generateHashService.generateHash();
      appModel[ length ].type = appType;
      appModel[ length ].title = appType + ' ' + length;
      appModel[ length ].fullWidth = false;
      appModel[ length ].fullHeight = false;
      appModel[ length ].initialized = true;
      appModel[ length ].x = 100;
      appModel[ length ].y = 100;
      if (
        this.page.openApps &&
        this.page.openApps[ appModel[ length ].hash ] === null
      ) {
        this.page.openApps[ appModel[ length ].hash ] = [];
      }
      if ( this.page.openApps ) {
        this.page.openApps[ appModel[ length ].hash ] = appModel[ length ];
      }
    }
    return appModel;
  }

  closeApp(
    appModel: Array<any>,
    i: number
  ) {
    delete this.page.openApps[appModel[ i ].hash];
    appModel.splice(
      i,
      1);
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
        app.fullWidth = settings.fullWidth;
        app.fullHeight = settings.fullHeight;
      }
    }
    this.page.openApps[ settings.hash ].title = settings.title;
    this.page.openApps[ settings.hash ].width = settings.width;
    this.page.openApps[ settings.hash ].height = settings.height;
    this.page.openApps[ settings.hash ].fullWidth = settings.fullWidth;
    this.page.openApps[ settings.hash ].fullHeight = settings.fullHeight;
  }

  produceHeightAndWidth( appValue: string, defaultHeight: string ) {
    if ( appValue ) {
      return appValue ;
    } else {
      return defaultHeight;
    }
  }

  receivePage( pageAndAction: any ) {
    console.log( pageAndAction );
    if (
      pageAndAction[ 0 ].openApps[ 'appsTiledOrFloating' ] ) {
      this.appFramePosition = pageAndAction[ 0 ].openApps[ 'appsTiledOrFloating' ].layout;
    }
    this.page = pageAndAction[ 0 ];
    // console.log( this.page );
    this.action = pageAndAction[ 1 ];
    this.reloadVariables = false;
    this.pageIsPublished = this.page.published;
  }

  receiveOpenAppsInThisPage( openAppsInThisPage: any ) {
    // console.log( openAppsInThisPage );
    this.openAppsInThisPage = openAppsInThisPage;
    this.reloadVariables = false;
  }

  updateMainResourceIndex( input: any ) {
    this.index = input.index;
    this.response = input.response;
    this.queryId = input.queryId;
    this.depth = input.depth;
  }

  generateQueryAppPathInformation( queryId: string ): any {
      let queryAppPathInformation = undefined;
      for ( const appHash in this.page.appInputQueryMapping ) {
        for ( const appType in this.openAppsInThisPage ) {
          if (
            this.openAppsInThisPage[ appType ].model.length > 0 &&
            appType !== 'dataChooser'
          ) {
            for ( const appEntry of this.openAppsInThisPage[ appType ].model ) {
              if ( appEntry.hash === appHash ) {
                for ( const input in this.page.appInputQueryMapping[ appHash ] ) {
                  if ( this.page.appInputQueryMapping[ appHash ][ input ].query === queryId ) {
                    if ( queryAppPathInformation === undefined ) {
                      queryAppPathInformation = [];
                    }
                    queryAppPathInformation.push(
                      {
                        appHash: appHash,
                        appTitle: appEntry.title,
                        path: this.page.appInputQueryMapping[ appHash ][ input ].path,
                        input: input,
                        type: appType
                      }
                    );
                  }
                }
              }
            }
          }
        }
      }
      if ( queryAppPathInformation === undefined ) {
        return undefined;
      } else {
        return queryAppPathInformation;
      }
  }

  openQueryInformationDialog( queryId: string ) {
    const dialogRef = this.queryInfoDialog.open(QueryInformationDialogComponent, {
      width: '800px',
      height: '400px',
      data: this.generateQueryAppPathInformation( queryId )
    });
  }

  updateTiledPosition( moveAndHash: any ) {
    console.log( moveAndHash );
  }

  openPageMenu() {
    this.openAppsInThisPage[ 'pageMenu' ].model = [];
    this.addAnotherApp( 'pageMenu', true );
    this.openAppsInThisPage[ 'pageMenu' ].model[ 0 ].initialized = true;
    this.openAppsInThisPage[ 'pageMenu' ].model[ 0 ].x = 600;
    this.openAppsInThisPage[ 'pageMenu' ].model[ 0 ].y = 100;
  }

  checkTimeUntilLogout() {
    const now = new Date();
    const expirationDate = localStorage.getItem('expiration');
    const secondsTotal = ( new Date(expirationDate).getTime() - now.getTime() ) / 1000;
    const minutes = Math.floor(secondsTotal / 60);
    const seconds = Math.floor(secondsTotal - minutes * 60);
    this.userInfo = 'Session expires in ' + minutes + ' min and ' + seconds + ' sec';
    if ( expirationDate && new Date(expirationDate).getTime() - now.getTime() > 0) {
      if ( minutes < 5 && !this.snackBarOpen) {
        this.snackBarOpen = true;
        this.openExtendSessionBar();
      } else if ( minutes > 5 ) {
        this.snackBar.dismiss();
      }
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 3000,
    });
  }

  openExtendSessionBar() {
    this.snackBar.openFromComponent(ExtendSessionComponent, {
      duration: 100000,
    });
  }

  publishPageOrMakePagePrivate( published: boolean ) {
    console.log( this.page );
    for ( const queryId of this.page.queries ) {
      console.log( queryId );
      this.queryService.publishQuery(queryId, published)
        .subscribe(
          (response) => {
            console.log( response );
          }, error => {
            console.log( error );
          });
    }
    this.pageIsPublished = published;
    this.page.published = published;
    this.action.published = published;
    this.updatePage();
    this.action.id = this.action._id;
    this.actionService.updateAction(this.action)
      .subscribe((action) => {
        console.log(action);
      });
  }

  logout() {
    console.log('Log out');
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
