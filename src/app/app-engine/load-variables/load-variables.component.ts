/**
 * This component loads the apps and additional
 * information from MongoDB and emits the information
 * to the page through an Eventemitter.
 * */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OpenAppsModel} from '../../user-action-engine/mongodb/page/open-apps.model';
import {PageService} from '../../user-action-engine/mongodb/page/page.service';
import {GenerateDataChoosersService} from '../../query-app-interface/data-management/services/generate-data-choosers.service';
import {ActionService} from '../../user-action-engine/mongodb/action/action.service';

@Component({
  selector: 'app-load-variables',
  templateUrl: './load-variables.component.html'
})
export class LoadVariablesComponent implements OnInit, OnChanges {
  /**
   * @remarks reload - input given by the page.component.ts, if
   * this input is true, apps etc. are reloaded so that the whole
   * page is reloaded from MongoDB
   * */
  @Input() reload = false;
  /**
   * @remarks sendPageBack - output emits the variables page and actions
   * */
  @Output() sendPageBack = new EventEmitter();
  /**
   * @remarks sendOpenAppsInThisPageBack emits openAppsInThisPage
   * */
  @Output() sendOpenAppsInThisPageBack = new EventEmitter();
  pageId: string;
  actionId: string;
  page: any;
  openAppsInThisPage: any;
  action: any;
  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private generateDataChoosers: GenerateDataChoosersService,
    private actionService: ActionService
  ) { }

  ngOnChanges() {
    if( this.reload ) {
      this.reloadVariables();
    }
  }

  reloadVariables() {
    this.pageId = this.route.snapshot.queryParams.page;
    this.actionId = this.route.snapshot.queryParams.actionID;
    this.page = {};
    const reset = new OpenAppsModel;
    this.openAppsInThisPage = reset.openApps;
    /**
     * @remarks - pageId exists if the page is part of a pageSet
     * */
    if ( this.pageId ) {
      this.updateAppsInView( this.pageId );
    } else {
      this.checkIfPageExistsForThisAction( this.actionId );
    }
  }

  ngOnInit() {
    this.reloadVariables();
  }

  updateAppsInView(viewHash: string ) {
    this.pageService.getPage(viewHash)
      .subscribe(
        data => {
          this.page = ( data as any).page;
          this.convertMappingsBackFromJson( this.page );
          const appHelperArray = [];
          /**
           * @remarks - the data for each app is stored as a string in
           * ( data as any).page and can be parsed to an object with JSON.parse.
           * A string has been chosen for the individual app - data because
           * the data for each app - type is heterogeneous and can't be defined by
           * a consistent model
           * */
          for ( const app of this.page.openApps ) {
            appHelperArray[JSON.parse(app).hash] = JSON.parse(app);
          }
          this.page.openApps = appHelperArray;
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
            this.openAppsInThisPage,
            this.reload
          );
          this.sendPageBack.emit(
            [
              this.page,
              this.action
            ] );
          this.sendOpenAppsInThisPageBack.emit( this.openAppsInThisPage );
        },
        error => {
          console.log(error);
        });
  }

  /**
   * This method parses the appInputQueryMapping stored in MongoDB
   * back to an object as part of the respective page
   * */
  convertMappingsBackFromJson( page: any ) {
    for ( const mappingInstance of page.appInputQueryMapping ) {
      const appHash = JSON.parse(mappingInstance)['app'];
      const appMapping = JSON.parse(mappingInstance);
      for ( const key in appMapping ) {
        if ( key !== 'app' ) {
          if ( !this.page[ 'appInputQueryMapping' ][ appHash ] ) {
            this.page[ 'appInputQueryMapping' ][ appHash ] = {};
          }
          this.page[ 'appInputQueryMapping' ][ appHash ][ key ] = appMapping[ key ];
        }
      }
    }
    /**
     * This method is due to a bug that caused an empty appInputQueryMapping
     * It has not been tested yet if this bug can still occur
     * */
    let index = 0;
    for ( const mapping of this.page.appInputQueryMapping ) {
      this.page.appInputQueryMapping.splice( index );
      index += 1;
    }
  }

  /**
   * This routine updates the apps in a Page if an action exists
   * */
  checkIfPageExistsForThisAction(actionID: string) {
    this.actionService.getAction(actionID)
      .subscribe(
        data => {
          if (data.status === 200) {
            this.action = ( data as any ).body.action;
            if (this.action.type === 'page') {
              this.updateAppsInView(this.action.hasPage._id);
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
    appModel[ length ].title = appFromViewModel.title;
    appModel[ length ].width = appFromViewModel.width;
    appModel[ length ].height = appFromViewModel.height;
    appModel[ length ].fullWidth = appFromViewModel.fullWidth;
    appModel[ length ].fullHeight = appFromViewModel.fullHeight;
    appModel[ length ].type = appType;
    appModel[ length ].initialized = true;
  }
}
