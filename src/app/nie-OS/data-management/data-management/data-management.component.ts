import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { MatTable } from '@angular/material';
import { QueryEntryComponent } from '../../query-entry/query-entry.component';
import { QueryAppInputMapComponent } from '../../query-app-input-map/query-app-input-map.component';
import {PageService} from '../../../shared/nieOS/mongodb/page/page.service';
import {ActivatedRoute} from '@angular/router';
import {ActionService} from '../../../shared/nieOS/mongodb/action/action.service';
import {OpenAppsModel} from '../../../shared/nieOS/mongodb/page/open-apps.model';
import {NgxSpinnerService} from 'ngx-spinner';
import { QueryListComponent } from '../../query-list/query-list.component';
import { QueryService } from '../../../shared/nieOS/mongodb/query/query.service';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss']
})
export class DataManagementComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  actionID: string;
  isLoading: boolean;
  displayedColumns = ['query'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  value: string;
  openApps: Array<any> = [];
  appInputQueryMapping = [];
  queries = [];
  openAppsInThisPage: any;
  page: any;
  action: any;
  reloadVariables = false;

  constructor(
    public dialogRef: MatDialogRef<DataManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private actionService: ActionService,
    private pageService: PageService,
    private queryService: QueryService,
    private route: ActivatedRoute,
    private appModel: OpenAppsModel,
    private spinner1: NgxSpinnerService
  ) {
  }

  resetTable() {
    this.columnsToDisplay = this.displayedColumns.slice();
    this.displayedColumns = ['query'];
    this.openApps = [];
    this.table.renderRows();
  }

  receivePage( pageFromLoadComponent: any ) {
    this.reloadVariables = false;
    this.page = pageFromLoadComponent;
    this.appInputQueryMapping = this.page.appInputQueryMapping;
    this.queryService.getAllQueriesOfPage(this.page._id)
      .subscribe((data) => {
        this.queries = data.queries;
        console.log( this.queries );
        console.log('assignPathsToQuery', this.appInputQueryMapping);
        for ( const app in this.appInputQueryMapping ) {
          console.log(this.appInputQueryMapping[app]);
          for ( const input in this.appInputQueryMapping[app] ) {
            for ( const query of this.queries ) {
              if (
                query._id === this.appInputQueryMapping[app][input][ 'query' ] &&
                this.appInputQueryMapping[app][input][ 'path' ] ) {
                console.log( query );
                if ( !query.paths ) {
                  query.paths = [];
                }
                query.paths.push( this.appInputQueryMapping[app][input][ 'path' ] );
              }
            }
            console.log(this.queries);
          }
        }
        this.spinner1.hide();
      });
  }

  receiveOpenAppsInThisPage( openAppsInThisPage: any ) {
    this.openAppsInThisPage = openAppsInThisPage;
    this.resetTable();
    this.reloadVariables = false;
    for (const appType in this.openAppsInThisPage) {
      if (this.openAppsInThisPage[appType].model.length !== 0) {
        for (const appOfSameType of this.openAppsInThisPage[appType].model) {
          if( this.appModel.openApps[ appOfSameType.type ] && this.appModel.openApps[ appOfSameType.type ].inputs ) {
            appOfSameType.inputs =  this.appModel.openApps[ appOfSameType.type ].inputs;
            this.openApps.push(appOfSameType);
            for (const query in this.queries) {
              this.queries[query][appOfSameType.hash] = appOfSameType.hash;
            }
            this.columnsToDisplay.push(appOfSameType.hash);
          }
        }
        if (this.table) {
          this.table.renderRows();
        }
      }
      if (this.table) {
        this.table.renderRows();
      }
    }
  }

  ngOnInit() {
    this.spinner1.show();
  }

  checkIfPathIsDefined( appHash: string ) {
      for ( const input in this.appInputQueryMapping[appHash] ) {
        if ( this.appInputQueryMapping[appHash][ input ][ 'path' ] ) {
          return true;
        }
      }
  }

  delete(row: any): void {
    const index = this.queries.indexOf(row, 0);
    if (index > -1) {
      this.queryService.deleteQueryOfPage(this.page._id, row._id)
          .subscribe((data) => {
              if (data.status === 200) {
                this.queries.splice(index, 1);
                this.table.renderRows();
              } else {
                // Fehlermeldung dass query nicht gelöscht werden konnte
              }
          });
    }
  }

  addQuery(name: string) {
    this.queryService.createQueryOfPage(this.page._id, {title: name})
        .subscribe(data => {
          if (data.status === 201) {
              this.queries.push(data.body.query);
              this.table.renderRows();
          }
        });
  }

  openExistingQueryDialog() {
    const dialogRef = this.dialog.open(QueryListComponent, {
      width: '100%',
      height: '100%',
      data: {
        enableAdd: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.queryService.createQueryOfPage(this.page._id, {
          title: `${result.title}_Copy`,
          description: result.description,
          serverUrl: result.serverUrl,
          method: result.method,
          params: result.params,
          header: result.header,
          body: result.body,
          path: result.path
        })
          .subscribe(data => {
            if (data.status === 201) {
              this.queries.push(data.body.query);
              this.table.renderRows();
            }
          });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  openQueryEntry(query: any) {
    const dialogRef = this.dialog.open(QueryEntryComponent, {
      width: '100%',
      height: '100%',
      data: {
        query: query,
        pageID: this.page._id
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Abstract tree from query entry');
      console.log(result);
      // this.updateQueryWithAbstractResponseStructure(result[1], result[0]);
    });
  }

  assignInputToQuery(input: string, app: string, queryId: string, query: any) {
    if (!this.appInputQueryMapping[app]) {
      this.appInputQueryMapping[app] = {};
    }
    if (!this.appInputQueryMapping[app][input]) {
      this.appInputQueryMapping[app][input] = {};
    }
    this.appInputQueryMapping[app][input][ 'query' ] = queryId;
    console.log(this.appInputQueryMapping);
    if( !query.paths ) {
      query.paths = [];
    }
    query.paths.push( this.appInputQueryMapping[app][input][ 'path' ] );
  }

  checkIfChosen(input: string, app: string, query: string) {
    if (
      this.appInputQueryMapping[app] &&
      this.appInputQueryMapping[app][input] &&
      this.appInputQueryMapping[app][input][ 'query' ] === query) {
      // console.log( 'true' );
      return true;
    } else {
      // console.log( 'false' );
      return false;
    }
  }

  checkIfRowIsChosen(app: string, query: string) {
    for (const input in this.appInputQueryMapping[app]) {
      if (this.appInputQueryMapping[app][input][ 'query' ] === query) {
        return true;
      }
    }
  }

  unSelectChip( input: string, app: string, query: string ) {
    this.appInputQueryMapping[app][input][ 'query' ] = undefined;
  }

  openQueryAppInputMapDialog( app: string, query: any ) {
    console.log( 'openQueryAppInputMapDialog' );
    const dialogRef = this.dialog.open(QueryAppInputMapComponent, {
      width: '100%',
      height: '100%',
      data: {
        mapping: this.appInputQueryMapping,
        app: app,
        query: query,
        openApps: this.openAppsInThisPage,
        abstractResponse: query.abstractResponse,
        page: this.page
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.reloadVariables = true;
      console.log( result );
    });
  }

  save() {
    this.page['appInputQueryMapping'] = this.appInputQueryMapping;
    console.log( this.page );
    this.pageService.updatePage(this.page)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
    for ( const query of this.queries ) {
      console.log( query );
      this.queryService.updateQueryOfPage(this.page._id, query._id, query)
        .subscribe((data) => {
          if (data.status === 200) {
            console.log( data );
          } else {
            console.log('Updating query failed');
            // this.close();
          }
        });
    }
    }

  assignQueryToPath( path: any, query: any ) {
    console.log( path );
    let increment = 0;
    for ( const segment of path ) {
      if ( segment === null ) {
        path.splice( increment, 1 );
      }
      increment += 1;
    }
    query.chosenPath = path;
  }

  generateCurrentPath( item ) {
    if( item.path ) {
      let concatenatedPath = '';
      for ( const segment of item.path ) {
        concatenatedPath += ' ' + segment;
      }
      return concatenatedPath;
    }
  }
}
