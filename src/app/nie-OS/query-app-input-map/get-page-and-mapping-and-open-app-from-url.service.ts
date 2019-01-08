import { Injectable } from '@angular/core';
import {MongoPageService} from '../../shared/nieOS/mongodb/page/page.service';
import {MongoActionService} from '../../shared/nieOS/mongodb/action/action.service';
import {OpenAppsModel} from '../../shared/nieOS/mongodb/page/open-apps.model';

@Injectable({
  providedIn: 'root'
})
export class GetPageAndMappingAndOpenAppFromUrlService {
  action: any;
  page: any;
  openAppsInThisPage: any;
  appInputQueryMapping: any;

  constructor(
    private mongoPageService: MongoPageService,
    private mongoActionService: MongoActionService,
    private appModel: OpenAppsModel
  ) { }
  getVariablesFromUrl( actionID: string ) {
    console.log( actionID );
    this.mongoActionService.getAction(actionID)
      .subscribe(
        data => {
          if (data.status === 200) {
            this.action = ( data as any ).body.action;
            if (this.action.type === 'page') {
              if( this.updateAppsInView(this.action.hasPage._id) ) {
                console.log( this.updateAppsInView(this.action.hasPage._id) );
              }
            }
          } else {
            console.log('none');
          }
        },
        error => {
          console.log(error);
        });
  }
  updateAppsInView(viewHash: string ) {
    const reset = new OpenAppsModel;
    this.openAppsInThisPage = reset.openApps;
    this.mongoPageService.getPage(viewHash)
      .subscribe(
        data => {
          this.page = ( data as any).page;
          // console.log( this.page );
          this.convertMappingsBackFromJson( this.page );
          const appHelperArray = [];
          for ( const app of this.page.openApps ) {
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
          this.appInputQueryMapping = this.page.appInputQueryMapping;
          for (const appType in this.openAppsInThisPage) {
            if (this.openAppsInThisPage[appType].model.length !== 0) {
              for (const appOfSameType of this.openAppsInThisPage[appType].model) {
                if( this.appModel.openApps[ appOfSameType.type ] && this.appModel.openApps[ appOfSameType.type ].inputs ) {
                  appOfSameType.inputs =  this.appModel.openApps[ appOfSameType.type ].inputs;
                }
              }
            }
          }
          return {
            page: this.page,
            openApp: this.openAppsInThisPage,
            mapping: this.appInputQueryMapping
          };
        },
        error => {
          console.log(error);
        });
  }

  convertMappingsBackFromJson( page: any ) {
    // console.log( 'convertMappingsBackFromJson', page.appInputQueryMapping );
    for ( const mappingInstance of page.appInputQueryMapping ) {
      const appHash = JSON.parse(mappingInstance)['app'];
      // console.log( appHash );
      // console.log( JSON.parse(mappingInstance) );
      const appMapping = JSON.parse(mappingInstance);
      for ( const key in appMapping ) {
        if ( key !== 'app' ) {
          // console.log( key, appHash, appMapping[ key ] );
          if ( !this.page[ 'appInputQueryMapping' ][ appHash ] ) {
            this.page[ 'appInputQueryMapping' ][ appHash ] = {};
          }
          this.page[ 'appInputQueryMapping' ][ appHash ][ key ] = appMapping[ key ];
        }
      }
    }
    let index = 0;
    for ( const mapping of this.page.appInputQueryMapping ) {
      this.page.appInputQueryMapping.splice( index );
      index += 1;
    }
    // console.log( this.page.appInputQueryMapping );
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
    appModel[ length ].type = appType;
    appModel[ length ].initialized = true;
  }
}
