/**
 * This is the page.component, the central component for opening and open apps.
 * Data for the apps are loaded with the help of the load-variables component.
 * */

import {AfterViewChecked, ChangeDetectorRef, Component, HostListener, NgModule, OnInit, VERSION, ViewChild} from '@angular/core';
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
import {Observable, Subscription} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ActionService} from '../../../user-action-engine/mongodb/action/action.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AppMenuModel } from './appMenu.model';
import {ExtendSessionComponent, PizzaPartyComponent} from '../../../user-action-engine/header/header.component';
import {AuthService} from '../../../user-action-engine/mongodb/auth/auth.service';
import {QueryService} from '../../../user-action-engine/mongodb/query/query.service';
import { environment } from '../../../../environments/environment';
import {DialogCreateNewPageComponent} from '../../../user-action-engine/page-set/page-set-landing-page/page-set-landing-page.component';
import {AppInputComponentComponent} from '../app-input-component/app-input-component.component';
import {AddAppGroupDialogComponent} from '../add-app-group-dialog/add-app-group-dialog.component';
import {DataAssignmentComponent} from '../../../query-app-interface/data-management/data-assignment/data-assignment.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageListDialogComponent} from '../page-list-dialog/page-list-dialog.component';
import {OverlayContainer} from '@angular/cdk/overlay';

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

  responsiveColumns: string[] = ['id'];

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
   * Identifier of a resource on which the mouse pointer is on. This variable enables sharing the information between apps.
   */
  hoveredElement: string;

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

  /**
   * Used to display how much longer the user will be logged in
   * */
  userInfo: string;

  /**
   * used to reqest the expiration time of the currently logged in user
   * */
  sub: any;

  /**
   * Used to display notifications
   * */
  snackBarOpen = false;

  /**
   * Indicates if the lighthouse button is highlighted or not
   * */
  lightHouse = true;

  /**
   * Describes which elements should be shown on published page
   * */
  showAppTitlesOnPublish = false;
  showInseriLogoOnPublish = false;
  showAppSettingsOnPublish = false;
  showDataBrowserOnPublish = true;
  theme = 'none';

  openAppArray = [];

  /**
   * Described if publish option expansion panel is open
   * */
  publishedOptionsExpanded = false;

  /**
   * indicates if page is published
   * */
  pageIsPublished = false;

  /**
   * Describes if user is logged in
   * */
  loggedIn = true;

  /**
   * Array of appType names
   * */
  appTypes: Array<string> = [];

  environment = environment;

  selectedPageToShow: number;

  pathWithArray: Array<string>;

  querySet = new Set();

  innerWidth: number;

  alreadyGenerated = false;

  showResponsiveWidthMenu = false;

  nothAlreadyQueryAppPathGenerated = new Set();


  appMenuModel= new AppMenuModel().appMenu;

  params: any;

  slogans = [
    'Where you can gather information',
    'It\'s pretty cloudy in the cloud',
    'If you like it less cloudy in the cloud',
    'Your web application environment',
    'Save RESTFul-Queries and visualise responses',
    'Your appshore in the cloud'
  ];

  slogan: string;

  queryParams: any;

  constructor(
    public route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private generateHashService: GenerateHashService,
    private openApps: OpenAppsModel,
    private resetOpenApps: OpenAppsModel,
    private pageService: PageService,
    public dialog: MatDialog,
    public queryInfoDialog: MatDialog,
    private requestService: GeneralRequestService,
    public sanitizer: DomSanitizer,
    private stylemapping: StyleMappingService,
    private actionService: ActionService,
    private router: Router,
    public snackBar: MatSnackBar,
    public snackBar2: MatSnackBar,
    private authService: AuthService,
    private queryService: QueryService,
    private overlayContainer: OverlayContainer
  ) {
    this.route.queryParams.subscribe(params => {
      this.hashOfThisPage = params.page;
      this.actionID = params.actionID;
      this.generateNavigation(params.actionID);
    });
    // route
    if ( this.route.snapshot.queryParams.page ) {
      this.dataSource = new MatTableDataSource(
        new AppMenuModel().appMenu
      );
    } else {
      const menuForHome = [];
      for ( const app of new AppMenuModel().appMenu ) {
        if ( app.showOnHome ) {
          menuForHome.push(app);
        }
      }
      this.dataSource = new MatTableDataSource(
        menuForHome
      );
    }

  }

  /**
   * Opens the data managment dialog where users can add queries to the page
   * */
  openDataManagement() {
    // console.log( this.quer )
    const dialogRef = this.dialog.open(DataManagementComponent, {
      width: '80%',
      height: '80%',
      data: [ this.openAppsInThisPage, this.page, this.openAppArray, this.querySet ]
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.resetPage = true;
      this.reloadVariables = true;
    });
  }

  /**
   * if the pageID changes in URL, the page is updated through setting reloadViariables to true,
   * this change is detected by the load - variables.component which loads all variables and
   * emits it back to the page.component
   * */
  ngAfterViewChecked() {
    this.cdr.detectChanges();
    if ( this.pageIDFromURL !==  this.route.snapshot.queryParams.page ) {
      setTimeout(() => {
        this.reloadVariables = true;
        this.openAppArray = [];
        this.page = {};
        this.pageIDFromURL = this.route.snapshot.queryParams.page;
      }, 500);
      this.cdr.detectChanges();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log( this.dataSource.filter );

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {

    this.slogan = this.slogans[Math.floor(Math.random() * this.slogans.length)];

    this.innerWidth = window.innerWidth;

    /**
     * Checks how much longer user is logged on
     * */
    this.sub = Observable.interval(1000)
      .subscribe((val) => {
        this.checkTimeUntilLogout();
      });

    /**
     * If not logged in, preview instatiates the published page options.
     * */
    if ( !this.authService.getIsAuth() ) {
      this.preview = true;
      this.loggedIn = false;
      this.page.tiles = true;
    }

    /**
     * Necesary for appshore menu
     * */
    for ( const appType in this.openApps.openApps ) {
      this.appTypes.push( appType );
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.overlayContainer.getContainerElement().classList.add(this.theme); // overlay so dropdown of themes is not affected by styles


    /**
     * Creates home page
     * */
    if (
      this.route.snapshot.url[0].path === 'home' &&
      this.route.snapshot.queryParams.actionID === undefined
    ) {
      this.page.tiles = true;
      this.preview = false;
    }

    this.actionID = this.route.snapshot.queryParams.actionID;
    this.pageIDFromURL = this.route.snapshot.queryParams.page;

    /**
     * If there is no action Id in the url, variables are set to instantiate the landing page
     * */
    if ( !this.actionID ) {
      this.pageAsDemo = true;
      this.lightHouse = false;
    }

    /**
     * The key value pair curZindex is reset, it is incremented by one every time the user clicks on the app frame title bar
     * so that the clicked app comes to the front
     * */
    localStorage.removeItem('curZIndex');

    /**
     * If the page is a demo, the lighthouse changes the colour every 7 secdons
     * */
    if ( this.pageAsDemo ) {
      this.startLightHouse();
    }

  }

  /**
   * If the page is a demo, the lighthouse changes the colour every 7 secdons
   * */
  startLightHouse() {
    setTimeout(() => {
      this.lightHouse = !this.lightHouse;
      this.startLightHouse();
    }, 7000);
  }

  /**
   * Youtube utorial videos are added with this function
   * */
  addVideoApp( url: string ) {
    this.addAnotherApp( 'youtubeVideo', true, 'Youtube Video' );
    const length = this.openAppsInThisPage[ 'youtubeVideo' ].model.length - 1;
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ].initialized = true;
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ].x = 100;
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ].y = 100;
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ]['videoURL'] = url;
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ].width = 600;
    this.openAppsInThisPage[ 'youtubeVideo' ].model[ length ].height = 400;
  }

  goToPageSet() {
    this.router.navigate(['/page-set'],
      { queryParams:
          {
            actionID: this.actionID
          }
      });
  }

  goToDashBoard() {
    this.router.navigate(['/dashboard']);
  }

  addNewPage() {
    const dialogRef = this.dialog.open(DialogCreateNewPageComponent, {
      width: '700px',
      data: { pageset: this.action.hasPageSet }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.alreadyLoaded = false;
      this.generateNavigation(
        this.actionID
      );
    });
  }

  /**
   * This function is used to navigate to another page belonging to the current pageSet
   * */
  selectPage(i: number, page: any) {
    this.selectedPage = i;
    this.selectedPageToShow = i + 1;
    this.navigateToOtherView(page);
  }

  /**
   * This function is used to navigate to another page belonging to the current pageSet
   * */
  navigateToOtherView(page: any) {
    this.router.navigate( [ 'page' ], {
      queryParams: {
        'actionID': this.actionID,
        'page': page._id
      }
    } );
  }

  /**
   * This function generates the pagesOfThisActtion Array
   * */
  generateNavigation(actionID: string, goToPage?: boolean) {
    if (!this.alreadyLoaded && actionID) {
      this.actionService.getAction(actionID)
        .subscribe(data => {
            if (data.body.action.type === 'page-set') {
              this.pagesOfThisActtion = [];
              for (const page of ( data.body as any ).action.hasPageSet.hasPages as any ) {
                if ( page._id === this.hashOfThisPage ) {
                  this.selectedPage = this.pagesOfThisActtion.length;
                }
                this.pagesOfThisActtion[this.pagesOfThisActtion.length] = page;
                this.alreadyLoaded = true;
              }
              if ( goToPage ) {
                this.selectedPage = this.pagesOfThisActtion.length - 1;
                this.router.navigate( [ 'page' ], {
                  queryParams: {
                    'actionID': this.actionID,
                    'page': this.pagesOfThisActtion[ this.pagesOfThisActtion.length - 1 ]._id
                  }
                } );
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

  /**
   * This function updates the page in MongoDB
   * */
  updatePage( reload?: boolean ) {
    /**
     *  - it is important to give a COPY of this.page as an input, thus { ...this.page },
     * otherwise this.page will be rewritten by the routine pageService.updatePage
     * during its execution!
     * */
    let openAppArrayIndex = 0;
    for ( let i = 0; i < this.openAppArray.length; i++ ) {
      if (
        this.page.openApps[ this.openAppArray[ i ].hash ].type !== 'pageMenu' &&
        this.page.openApps[ this.openAppArray[ i ].hash ].type !== 'dataChooser'
      ) {
        this.page.openApps[ this.openAppArray[ i ].hash ].openAppArrayIndex = openAppArrayIndex;
        openAppArrayIndex += 1;
      }
    }
    for ( const mapping in this.page.appInputQueryMapping ) {
      if ( !this.page.openApps[ mapping ] ) {
        delete this.page.appInputQueryMapping[ mapping ];
      }
    }
    console.log( this.page );
    this.pageService.updatePage(
      { ...this.page }
      )
      .subscribe(
        data => {
          this.snackBarOpen = true;
          setTimeout(() => {
            this.snackBarOpen = false;
          }, 2000);
          this.snackBar2.open( 'Page successfully saved', 'ok',
            {
              duration: 2000
            });
          if ( reload ) {
            this.reloadVariables = true;
          }
        },
        error => {
          console.log(error);
          this.snackBar2.open( 'Sth went wrong, page has not been saved' );
        });
  }

  /**
   * This function adds another app to the page. It is invocated through the
   * inseri appshore menu
   * */
  addAnotherApp (
    appType: string,
    generateHash: boolean,
    title: string,
    fileUrlPath?: string,
    chosenInput?: string
  ): Array<any> {
    for ( let i = 0; i < this.openAppArray.length; i++ ) {
      if ( this.openAppArray[ i ].type === 'pageMenu' ) {
        this.openAppArray.splice( i, 1 );
      }
    }
    this.dataSource.filter = undefined;
    const appModel = this.openAppsInThisPage[ appType ].model;
    const length = appModel.length;
    appModel[ length ] = {};
    if ( generateHash ) {
      appModel[ length ].hash = this.generateHashService.generateHash();
      appModel[ length ].type = appType;
      appModel[ length ].title = appType;
      appModel[ length ].fullWidth = false;
      appModel[ length ].fullHeight = false;
      appModel[ length ].initialized = true;
      appModel[ length ].x = 100;
      appModel[ length ].y = 100;
      appModel[ length ].initialHeight = this.openAppsInThisPage[ appType ].initialHeight;
      appModel[ length ].initialWidth = this.openAppsInThisPage[ appType ].initialWidth;
      appModel[ length ].width = this.openAppsInThisPage[ appType ].initialWidth;
      appModel[ length ].height = this.openAppsInThisPage[ appType ].initialHeight;
      appModel[ length ].openAppArrayIndex = length;
      appModel[ length ].showContent = true;
      if ( !this.page.openApps ) {
        this.page.openApps = {};
      }
      if (
        this.page.openApps &&
        this.page.openApps[ appModel[ length ].hash ] === null
      ) {
        this.page.openApps[ appModel[ length ].hash ] = [];
      }
      if ( this.page.openApps ) {
        this.page.openApps[ appModel[ length ].hash ] = appModel[ length ];
      }
      if ( this.openAppArray.length === 0 ) {
        this.openAppArray.push( appModel[ length ] );
      } else {
        this.openAppArray = [ appModel[ length ] ].concat( this.openAppArray );
      }
      if ( appType !== 'pageMenu' &&  this.openAppsInThisPage[ appModel[ length ].type ].inputs ) {
        for ( const input of this.openAppsInThisPage[ appModel[ length ].type ].inputs ) {
          this.createDefaultInputAndMappToAppInput(
            appType,
            appModel[ length ],
            input,
            chosenInput === input.inputName ? fileUrlPath : input.default
          );
        }
      } else if ( this.loggedIn ) {
        this.updatePage();
      }
    }
    return appModel;
  }

  createDefaultInputAndMappToAppInput(
    appType: string,
    app: any,
    input: any,
    valueToAssign: string
  ) {
      if ( this.loggedIn ) {
        app.spinnerIsShowing = true;
      }
      // for ( const input of this.openAppsInThisPage[ app.type ].inputs ) {
        const now = new Date();
        // console.log(!this.page.serverUrl);
        if ( !this.page.jsonId ) {
          this.queryService.createQueryOfPage(this.page._id,
            {title: 'page:' + this.page.title + ' | data stored in inseri'})
            .subscribe(data => {
              if (data.status === 201) {
                const query = data.body.query;
                this.page.queries.push( query._id );
                this.requestService.createJson()
                  .subscribe(myOwnJson => {
                      const jsonId = (myOwnJson as any).result._id;
                      const serverURL = environment.node + '/api/myOwnJson/getJson/' + String((myOwnJson as any).result._id);
                      this.page.jsonId = jsonId;
                      this.page.ownQuery = query._id;
                      query.serverUrl = serverURL;
                      query.method = 'JSON';
                      query.description = now.getFullYear() +
                        ':' + now.getDate() +
                        ':' + now.getHours() +
                        ':' + now.getMinutes() +
                        ':' + now.getSeconds();
                      this.queryService.updateQueryOfPage(this.page._id, query._id, query)
                        .subscribe((data3) => {
                          if (data3.status === 200) {
                          } else {
                            // console.log('Updating query failed');
                          }
                        }, error1 => console.log(error1));
                      if ( this.page.appInputQueryMapping[ app.hash ] === undefined ) {
                        this.page.appInputQueryMapping[ app.hash ] = {};
                      }
                      this.page.appInputQueryMapping[ app.hash ][ input.inputName ] = {};
                      this.page.appInputQueryMapping[ app.hash ][ input.inputName ][ 'path' ] =
                        [ 'result', 'content', 'info', app.hash, input.inputName ];
                      this.page.appInputQueryMapping[ app.hash ][ input.inputName ].query = this.page.ownQuery;
                      this.page.appInputQueryMapping[ app.hash ][ input.inputName ][ 'serverUrl' ] =
                        environment.node + '/api/myOwnJson/getJson/' + this.page.jsonId;
                      this.page.appInputQueryMapping[ app.hash ].app = app.hash;
                    this.requestService.updateJson(
                      this.page.jsonId,
                      {
                        _id: this.page.jsonId,
                        creator: this.page.creator,
                        content: {
                          info: {
                            [app.hash]: {
                              [input.inputName]: valueToAssign
                            }
                          }
                        },
                        __v: 0
                      }
                    )
                      .subscribe(updatedJson => {
                        this.updatePage();
                        setTimeout(() => {
                          console.log( 'reload 702' );
                          this.reloadVariables = true;
                        }, 200);
                        }, error => console.log(error)
                      );
                    }, error => {
                      console.log(error);
                    }
                  );
              }
            }, error1 => {
              app.spinnerIsShowing = false;
              console.log( error1 );
            });
        } else {
          // console.log( 'update existing query', input );
          let existingInputs: any;
          this.requestService.get(  environment.node + '/api/myOwnJson/getJson/' + this.page.jsonId, undefined, undefined )
            .subscribe(
              myOwnJsonResponse => {
                console.log( myOwnJsonResponse );
                if ( myOwnJsonResponse.body.result.content ) {
                  existingInputs = myOwnJsonResponse.body.result.content.info;
                } else {
                  existingInputs = {};
                }
                // console.log( existingInputs );
                if ( existingInputs[app.hash] === undefined ) {
                  existingInputs[app.hash] = {};
                }
                existingInputs[app.hash][input.inputName] = valueToAssign;
                this.requestService.updateJson(
                  this.page.jsonId,
                  {
                    _id: this.page.jsonId,
                    creator: this.page.creator,
                    content: {
                      info: existingInputs
                    },
                    __v: 0
                  }
                )
                  .subscribe(updatedJson => {
                      // console.log(updatedJson);
                    if ( this.page.appInputQueryMapping[ app.hash ] === undefined ) {
                      this.page.appInputQueryMapping[ app.hash ] = {};
                    }
                    this.page.appInputQueryMapping[ app.hash ][ input.inputName ] = {};
                    this.page.appInputQueryMapping[ app.hash ][ input.inputName ][ 'path' ] =
                      [ 'result', 'content', 'info', app.hash, input.inputName ];
                    this.page.appInputQueryMapping[ app.hash ][ input.inputName ].query = this.page.ownQuery;
                    this.page.appInputQueryMapping[ app.hash ][ input.inputName ][ 'serverUrl' ] =
                      environment.node + '/api/myOwnJson/getJson/' + this.page.jsonId;
                    this.page.appInputQueryMapping[ app.hash ].app = app.hash;
                    this.updatePage();
                    setTimeout(() => {
                      console.log( 'reload 753' );
                      this.reloadVariables = true;
                    }, 200);
                    }, error => console.log(error)
                  );
              }, error => console.log( error )
            );
        }
      // }
  }

  /**
   * This function is used to remove an app from the page
   * */
  closeApp(
    appHash: string,
    i: number
  ) {
    console.log( this.page );
    this.openAppArray.splice(
      i,
      1);
    if ( this.page.openApps ) {
      delete this.page.openApps[ appHash ];
    }
  }

  /**
   * When a user updates settings in the app setting dialog instantiated in
   * frame.component.ts, this component emits the settings back so that
   * it can be stored as part of the page that contains the app
   * */
  updateAppSettings( settings: any ) {
    for ( const app of this.openAppsInThisPage[ settings.type ].model ) {
      if ( settings.hash === app.hash ) {
        app.title = settings.title;
        app.width = settings.width;
        app.height = settings.height;
        app.fullWidth = settings.fullWidth;
        app.fullHeight = settings.fullHeight;
        app.description = settings.description;
      }
    }
    for ( const app of this.openAppArray ) {
      if ( settings.hash === app.hash ) {
        app.title = settings.title;
        app.width = settings.width;
        app.height = settings.height;
        app.fullWidth = settings.fullWidth;
        app.fullHeight = settings.fullHeight;
        app.description = settings.description;
      }
    }
    this.page.openApps[ settings.hash ].title = settings.title;
    this.page.openApps[ settings.hash ].width = settings.width;
    this.page.openApps[ settings.hash ].height = settings.height;
    this.page.openApps[ settings.hash ].fullWidth = settings.fullWidth;
    this.page.openApps[ settings.hash ].fullHeight = settings.fullHeight;
    this.page.openApps[ settings.hash ].description = settings.description;
    this.updatePage();
  }

  /**
   * The load-variables.component emits the page and the action loaded from mongodb to this
   * function where the relevant variables are updated
   * */
  receivePage( pageAndAction: any ) {
    this.page = pageAndAction[0];
    this.page.tiles = true;
    // console.log( this.page );
    this.action = pageAndAction[1];
    this.reloadVariables = false;
    this.pageIsPublished = this.page.published;
    this.showAppTitlesOnPublish = this.page.showAppTitlesOnPublish;
    this.showAppSettingsOnPublish = this.page.showAppSettingsOnPublish;
    this.showInseriLogoOnPublish = this.page.showInseriLogoOnPublish;
    this.showDataBrowserOnPublish = this.page.showDataBrowserOnPublish;
  }

  generateOpenApps( openApps: any ) {
    // console.log( openApps );
    this.openAppArray = [];
    for ( const appType in openApps ) {
      for ( const app of openApps[ appType ].model ) {
        // console.log( app );
        if ( app.x ) {
          this.openAppArray.push( app );
        }
      }
    }
    // console.log( this.openAppArray );
    let j = 0;
    for ( const app of this.openAppArray ) {
      // console.log( app );
      if ( this.page.openApps[ app.hash ].openAppArrayIndex ) {
        const switchHelp = this.openAppArray[this.page.openApps[app.hash].openAppArrayIndex];
        this.openAppArray[this.page.openApps[app.hash].openAppArrayIndex] = app;
        this.openAppArray[ j ] = switchHelp;
      }
      j++;
      app.spinnerIsShowing = false;
    }
  }

  /**
   * The load-variables.component emits the openApps - information loaded from mongodb to this
   * function where the relevant variables are updated
   * */
  receiveOpenAppsInThisPage( openAppsInThisPage: any ) {
    this.openAppsInThisPage = openAppsInThisPage;
    this.reloadVariables = false;
    this.generateOpenApps( openAppsInThisPage );
  }

  /**
   * This fuction is invoked by an emit of the data-chooser component,
   * after the user chooses a data entry and triggers the data assignment component
   * */
  updateMainResourceIndex( input: any ) {
    console.log( input );
    this.index = input.index;
    this.response = input.response;
    this.queryId = input.queryId;
    this.depth = input.depth;
    this.pathWithArray = input.pathWithArray;
    const dataAssignmentComponent = new DataAssignmentComponent();
    // console.log( this.index, input );
    if ( ( this.index as any ) === 'NaN' || this.index === NaN ) {
      console.log( 'index is NaN' )
      this.index = 0;
    }
    if ( this.page && this.openAppsInThisPage && this.index === 0 ) {
      // console.log( input );
      dataAssignmentComponent.startPathUpdateProcess(
        input.queryId,
        input.pathWithArray,
        input.index,
        input.response,
        input.depth,
        this.page.appInputQueryMapping,
        this.openAppsInThisPage
      );
    } else {
      setTimeout(() => {
        console.log( this.page, this.openAppsInThisPage, this.index, 'page was loaded to late' );
        dataAssignmentComponent.startPathUpdateProcess(
          input.queryId,
          input.pathWithArray,
          input.index,
          input.response,
          input.depth,
          this.page.appInputQueryMapping,
          this.openAppsInThisPage
        );
      }, 1000);
    }
    if (  this.pathWithArray ) {
      for ( const app of this.openAppArray ) {
        for ( const appInput in this.page.appInputQueryMapping[ app.hash ] ) {
          if ( this.page.appInputQueryMapping[ app.hash ][ appInput ].query === this.queryId ) {
            let allSegmentsTheSame = true;
            for ( let i = 0; i <= this.pathWithArray.length; i++ ) {
              if ( this.pathWithArray[ i ] !== this.page.appInputQueryMapping[ app.hash ][ appInput ].path[ i ] ) {
                allSegmentsTheSame = false;
              }
              if (
                ( i === this.pathWithArray.length - 1 && allSegmentsTheSame ) ||
                ( this.pathWithArray.length === 0 && this.response.length > 0 )
              ) {
                if ( !app[ 'pathsWithArrays' ] ) {
                  app[ 'pathsWithArrays' ] = {};
                }
                if ( !app[ 'pathsWithArrays' ][ this.queryId ] ) {
                  app[ 'pathsWithArrays' ][ this.queryId ] = {};
                }
                if ( !app[ 'pathsWithArrays' ][ this.queryId ][ this.pathWithArray.toString() ] ) {
                  app[ 'pathsWithArrays' ][ this.queryId ][ this.pathWithArray.toString() ] = {};
                }
                // console.log( input );
                dataAssignmentComponent.startPathUpdateProcess(
                  this.queryId,
                  this.pathWithArray,
                  this.index
                );
                app[ 'pathsWithArrays' ][ this.queryId ][ this.pathWithArray.toString() ] = {
                  index: input.index,
                  dataChooserEntries: input.dataChooserEntries,
                  response: this.response,
                  pathToValueInJson: this.page.appInputQueryMapping[ app.hash ][ appInput ].path
                };
              }
            }
          }
        }
      }
    }
  }

  /**
   * In the data chooser, a user can click on the name of the query.
   * This function generates the Query information needed to
   * generate the information in the the generated dialog.
   * */
  generateQueryAppPathInformation( queryId: string ): any {
      // console.log( this.openAppArray );
      let queryAppPathInformation;
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

  /**
   * This function opens the QueryInformationDialog
   * */
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
    this.addAnotherApp( 'pageMenu', true, 'inseri Appshore' );
  }

  checkTimeUntilLogout() {
    const now = new Date();
    const expirationDate = localStorage.getItem('expiration');
    const secondsTotal = ( new Date(expirationDate).getTime() - now.getTime() ) / 1000;
    const minutes = Math.floor(secondsTotal / 60);
    const seconds = Math.floor(secondsTotal - minutes * 60);
    this.userInfo = 'Session expires in ' + minutes + ' min and ' + seconds + ' sec';
    if ( expirationDate && new Date(expirationDate).getTime() - now.getTime() > 0) {

      if ( minutes === 59 && seconds === 59 ) {
        this.snackBarOpen = true;
        setTimeout(() => {
          this.snackBarOpen = false;
        }, 2000);
        this.snackBar2.open( 'Session extended successfully', 'ok',
          {
            duration: 2000
          });
      }

      if ( minutes < 5 && !this.snackBarOpen) {
        this.snackBarOpen = true;
        this.openExtendSessionBar();
      } else if ( minutes > 5 && !this.snackBarOpen ) {
        this.snackBar.dismiss();
      }

    }
  }

  /**
   * This material snackbar is opened to display if a paage has been saved or not
   * */
  openSnackBar() {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 3000,
    });
  }

  /**
   * This material snackbar is opened when the session of a user is close to
   * expiring
   * */
  openExtendSessionBar() {
    this.snackBar.openFromComponent(ExtendSessionComponent, {
      duration: 100000,
    });
  }

  publishPageOrMakePagePrivate( published: boolean ) {

    /**
     * This part of the function publishes all queries
     * */
    for ( const queryId of this.page.queries ) {
      this.queryService.getQuery(queryId)
        .subscribe(
          (query) => {
            if ( query.query.method === 'JSON' ) {
              /**
               * The query that is from type 'JSON', which means that this
               * query requests data from mongodb, contains the mongodb id
               * of the bson entry at the end of the query.serverUrl part.
               * This part is queried in the following 2 lines.
               * */
              let splittedString = query.query.serverUrl.split('/');
              splittedString = splittedString[ splittedString.length - 1 ];
              this.requestService.publishJSON( splittedString, published )
                .subscribe(
                  (json) => {
                    console.log( json );
                  }, error1 => {
                    console.log( error1 );
                  }
                );
            }
          }, error1 => {
            console.log( error1 );
          }
        );
      this.queryService.publishQuery(queryId, published)
        .subscribe(
          (response) => {
            console.log( response );
          }, error => {
            console.log( error );
          });
    }

    /**
     * The following part publishes / makes private the page and the action
     * */
    this.pageIsPublished = published;
    this.page.published = published;
    console.log( this.action );
    this.action.published = published;
    this.page.showAppTitlesOnPublish = this.showAppTitlesOnPublish;
    this.page.showAppSettingsOnPublish = this.showAppSettingsOnPublish;
    this.page.showInseriLogoOnPublish = this.showInseriLogoOnPublish;
    this.page.showDataBrowserOnPublish = this.showDataBrowserOnPublish;
    this.updatePage();
    this.action.id = this.action._id;
    this.actionService.updateAction(this.action)
      .subscribe((action) => {
        console.log(action);
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  /**
   * When clicking on a publish option on the publish expansion panel,
   * this function automatically updates this information in mongodb
   * */
  updatePagePublishSettings() {
    setTimeout(() => {
      this.page.showAppTitlesOnPublish = this.showAppTitlesOnPublish;
      this.page.showAppSettingsOnPublish = this.showAppSettingsOnPublish;
      this.page.showInseriLogoOnPublish = this.showInseriLogoOnPublish;
      this.page.showDataBrowserOnPublish = this.showDataBrowserOnPublish;
      this.updatePage();
    }, 2000);
  }

  openAssignInputDialog( input: any ) {
    console.log( input, this.openAppsInThisPage );
    this.pageService.updatePage(
      { ...this.page }
    )
      .subscribe(
        data => {
          // this.updateOpenAppsInThisPage();
          const dialogRef = this.dialog.open(AppInputComponentComponent, {
            width: '50%',
            height: '50%',
            data: {
              appHash: input.hash,
              page: this.page,
              inputs: this.openAppsInThisPage[ input.type ].inputs
            }
          });
          dialogRef.afterClosed().subscribe((result) => {
            console.log( result );
            if ( result === 'openDataMGMT' ) {
              this.openDataManagement();
            } else if ( result === 'reload' ) {
              window.location.reload();
            }
          });
        }, error1 => console.log(error1)
      );

  }

  reloadVariablesFunction() {
    console.log('test');
    this.updatePage( true );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    // console.log( this.innerWidth );
  }

  switchAppTilePosition( currentPosition: number, nextPosition: number ) {
    const helpVariable = this.openAppArray[currentPosition];
    this.openAppArray[ currentPosition ] = this.openAppArray[ nextPosition ];
    this.openAppArray[ nextPosition ] = helpVariable;
    this.updatePage();
  }

  updateTilePage() {
    this.page.tiles = !this.page.tiles;
  }

  minimizeApp( openAppArrayIndex: number ) {
    this.openAppArray[ openAppArrayIndex ].minimized = true;
  }

  addDuplicatedPage() {
    const dialogRef = this.dialog.open(PageListDialogComponent, {
      width: '90%',
      height: '40%',
      data: {
        showDuplicateButton: true
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.pageService.duplicatePage( result, this.action.hasPageSet._id )
        .subscribe(
          data => {
            this.alreadyLoaded = false;
            this.generateNavigation(
              this.actionID,
              true
            );
            console.log( this.pagesOfThisActtion );
          }, error => console.log( error )
        );
    });
  }

  linkExistingPage() {
    const dialogRef = this.dialog.open(PageListDialogComponent, {
      width: '90%',
      height: '40%',
      data: {
        showDuplicateButton: true
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log( 'Link existing ' + result );
      this.pageService.linkExistingPage( result, this.action.hasPageSet._id )
        .subscribe(
          data => {
            this.alreadyLoaded = false;
            this.generateNavigation(
              this.actionID
            );
          }, error => console.log( error )
        );
    });
  }

  onThemeChange() {
    const chosenTheme = this.theme === 'none' ? 'dark-theme' : 'none';
    this.theme = chosenTheme;
    localStorage.setItem( 'theme', chosenTheme );
  }

  appMenu(app: any, key: string) {
    app[ key ] = true;
    setTimeout(() => {
      app[ key ] = false;
    }, 100);
  }

  publishAsTemplate() {
    this.pageService.publishAsTemplate( this.page._id )
      .subscribe(
        response => {
          console.log( response );
        }, error => console.log( error )
      );
    console.log( 'publish as template' );
  }

  undoPublishTemplate() {
    this.pageService.undoPublishTemplate( this.page._id )
      .subscribe(
        response => {
          console.log( response );
        }, error => console.log( error )
      );
  }

}
