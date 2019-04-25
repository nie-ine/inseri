import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractJsonService} from './abstract-json.service';
import {GenerateArrayFromLeafsService} from './generate-array-from-leafs.service';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';
import { QueryService } from '../../../user-action-engine/mongodb/query/query.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateDataChoosersService {
  response: any;
  dataChooserEntries = [];
  y = -50;
  pathSet = new Set();
  depth = 0;
  data: any;
  path: Array<string>;
  query: any
  constructor(
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private generateArrayFromLeafs: GenerateArrayFromLeafsService,
    private requestService: GeneralRequestService,
    private queryService: QueryService
  ) { }

  generateDataChoosers( page: any, openAppsInThisPage: any, reset: boolean ) {
    this.pathSet = new Set();
    if ( reset ) {
      this.y = -50;
    }
    for ( const queryId of  page.queries ) {
      let queryTitle = '';
      let pathArray = [];
      this.depth = 0;
      this.queryService.getQuery(queryId)
        .subscribe((data) => {
          // console.log( data );
          queryTitle = data.query.title;
          pathArray = data.query.path;       // path array is the path chosen for the entries to be displayed in the data chooser dropdown
          this.query = data;
          this.requestService.request(queryId)
            .subscribe((data1) => {
              if (data1.status === 200) {
                // console.log(data.body, pathArray);
                this.response = data1.body;
                this.checkIfSubsetOfResultContainsArray(
                  data1.body,
                  pathArray,
                  openAppsInThisPage,
                  pathArray,
                  queryTitle,
                  data1,
                  queryId
                );
              }
            });
        });
    }
  }

  checkIfSubsetOfResultContainsArray(
    response: any,
    path: Array<string>,
    openAppsInThisPage: any,
    pathArray: Array<string>,
    queryTitle: string,
    data: any,
    queryId: string
  ) {
    if ( path ) {
      // console.log( response, path, path.length );
      for ( const segment of path ) {
        // console.log( segment );
        if ( response[ segment ] && response[ segment ].length && typeof response[ segment ] !== 'string') {
          // console.log( 'response contains array' );
          this.pathSet = new Set();
          this.depth = 0;
          openAppsInThisPage.dataChooser.model.push( {
            x: 150,
            y: this.y,
            dataChooserEntries: this.generateArrayFromLeafs.generateArrayFromLeafs(
              this.response,
              pathArray,
              0
            ),
            title: 'Query: ' + queryTitle,
            response: data.body,
            queryId: queryId,
            depth: 0
          } );
          // console.log( openAppsInThisPage.dataChooser.model );
          this.pathSet.add( path[ 0 ] );
          this.generateArrayKeyValueForEachArrayInResponse(
            data.body,
            openAppsInThisPage,
            queryTitle,
            queryId,
            this.depth
          );
          return openAppsInThisPage;
        } else if ( response[ segment ] && response[ segment ] !== 'string' ) {
          const clonedPath = Object.assign([], path);
          clonedPath.splice(0, 1);
          this.checkIfSubsetOfResultContainsArray(
            response[ segment ],
            clonedPath,
            openAppsInThisPage,
            pathArray,
            queryTitle,
            data,
            queryId
          );
        }
      }
      if ( path.length === 0 ) {
        // console.log( 'Dont generate data choosers ');
        openAppsInThisPage.dataChooser.model.push( {
          x: 150,
          y: this.y,
          dataChooserEntries: [ 'showData' ],
          title: 'Query: ' + queryTitle,
          response: data.body,
          queryId: queryId,
          depth: 0
        } );
        return openAppsInThisPage;
      }
    }
  }


  generateArrayKeyValueForEachArrayInResponse(
    response: any,
    openAppsInThisPage: any,
    queryTitle: string,
    queryId: string,
    depth: number
  ) {
    // console.log( response, pathArray );
    for ( const key in response ) {
      if (
        response[ key ].length &&
        typeof response[ key ] !== 'string' &&
        !this.pathSet.has( key )
      ) {
        this.pathSet.add( key );
        depth += 1;
        openAppsInThisPage.dataChooser.model.push( {
          x: 150,
          y: this.y,
          dataChooserEntries: this.generateArrayFromLeafs.generateArrayFromLeafs(
            response[ key ],
            undefined,
            0
          ),
          title: 'Query: ' + queryTitle + ' Depth: ' + String(depth),
          response: this.response,
          queryId: queryId,
          depth: depth
        } );
      }
      // console.log( typeof response[ key ] );
      if ( typeof response[ key ] !== 'string' ) {
        this.generateArrayKeyValueForEachArrayInResponse(
          response[ key ],
          openAppsInThisPage,
          queryTitle,
          queryId,
          depth
        );
      }
    }
  }
}
