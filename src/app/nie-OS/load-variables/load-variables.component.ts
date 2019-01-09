import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OpenAppsModel} from '../../shared/nieOS/mongodb/page/open-apps.model';
import {PageService} from '../../shared/nieOS/mongodb/page/page.service';
import {GenerateDataChoosersService} from '../data-management/generate-data-choosers.service';
import {ActionService} from '../../shared/nieOS/mongodb/action/action.service';

@Component({
  selector: 'app-load-variables',
  templateUrl: './load-variables.component.html'
})
export class LoadVariablesComponent implements OnInit, OnChanges {
  @Input() reload = false;
  @Output() sendPageBack = new EventEmitter();
  @Output() sendOpenAppsInThisPageBack = new EventEmitter();
  pageId: string;
  actionId: string;
  page: any;
  openAppsInThisPage: any;
  resetPage = false;
  action: any;
  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private generateDataChoosers: GenerateDataChoosersService,
    private actionService: ActionService
  ) { }

  ngOnChanges() {
    console.log('on changes', this.reload);
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
    console.log( 'Load Variables', this.pageId, this.actionId );
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
          this.generateDataChoosers.generateDataChoosers(
            this.page,
            this.openAppsInThisPage,
            this.reload
          );
          console.log(
            this.page,
            this.openAppsInThisPage
          );
          this.sendPageBack.emit( this.page );
          this.sendOpenAppsInThisPageBack.emit( this.openAppsInThisPage );
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

  checkIfPageExistsForThisAction(actionID: string) {
    this.actionService.getAction(actionID)
      .subscribe(
        data => {
          if (data.status === 200) {
            this.action = ( data as any ).body.action;
            if (this.action.type === 'page') {
              this.updateAppsInView(this.action.hasPage._id);
            }
          } else {
            console.log('none');
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
    appModel[ length ].type = appType;
    appModel[ length ].initialized = true;
  }

}
