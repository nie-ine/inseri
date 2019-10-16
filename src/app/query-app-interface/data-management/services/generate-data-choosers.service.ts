/**
 * This service generates all data choosers for all queries defined
 * */

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractJsonService} from './abstract-json.service';
import {GenerateArrayFromLeafsService} from './generate-array-from-leafs.service';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';
import { QueryService } from '../../../user-action-engine/mongodb/query/query.service';
import {cloneDate} from 'ngx-bootstrap/chronos/create/clone';

@Injectable({
  providedIn: 'root'
})
export class GenerateDataChoosersService {
  response: any;
  dataChooserEntries = [];
  pathSet = new Set();
  depth = 0;
  data: any;
  path: Array<string>;
  query: any;
  constructor(
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private generateArrayFromLeafs: GenerateArrayFromLeafsService,
    private requestService: GeneralRequestService,
    private queryService: QueryService
  ) { }

  generateDataChoosers( page: any, openAppsInThisPage: any, reset: boolean ) {
    this.pathSet = new Set();
    for ( const queryId of  page.queries ) {
      let queryTitle = '';
      let pathArray = [];
      this.depth = 0;
      this.queryService.getQuery(queryId)
        .subscribe((data) => {
          queryTitle = data.query.title;
          pathArray = data.query.path;       // path array is the path chosen for the entries to be displayed in the data chooser dropdown
          this.query = data;
          this.requestService.request(queryId)
            .subscribe((data1) => {
              if (data1.status === 200) {
                // console.log(data.body, pathArray);
                this.response = data1.body;
                for ( const appHash in page.appInputQueryMapping ) {
                  for ( const input in page.appInputQueryMapping[ appHash ] ) {
                    const path = page.appInputQueryMapping[ appHash ][ input ].path;
                    for ( let i = 0; i < path.length; i++ ) {
                      if ( typeof path[ i ] === 'number' ) {
                        path.splice( i, 1 );
                      }
                    }
                    console.log( path );
                    this.checkIfSubsetOfResultContainsArray(
                      data1.body,
                      path,
                      openAppsInThisPage,
                      path,
                      queryTitle,
                      data1,
                      queryId
                    );
                  }
                }
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
    console.log( path );
    if ( path ) {
      // console.log( response, path, path.length );
      for ( const segment of path ) {
        console.log( segment );
        if ( response[ segment ] && response[ segment ].length > 1 && typeof response[ segment ] !== 'string') {
          console.log( 'response contains array' );
          this.pathSet = new Set();
          this.depth = 0;
          // console.log(path);
          const newPath = Object.assign( [], pathArray );
          newPath.pop();
          console.log( 'push 1', this.response);
          openAppsInThisPage.dataChooser.model.push( {
            dataChooserEntries: this.generateArrayFromLeafs.generateArrayFromLeafs(
              this.response[ segment ]
            ),
            title: 'Query: ' + queryTitle,
            response: data.body,
            queryId: queryId,
            depth: 0,
            pathWithArray: newPath
          } );
          // console.log( openAppsInThisPage.dataChooser.model );
          this.pathSet.add( path[ 0 ] );
          this.generateArrayKeyValueForEachArrayInResponse(
            data.body,
            openAppsInThisPage,
            queryTitle,
            queryId,
            this.depth,
            []
          );
          return openAppsInThisPage;
        } else if ( response[ segment ] && response[ segment ] !== 'string' ) {
          const clonedPath = Object.assign([], path);
          clonedPath.splice(0, 1);
          console.log( 'case 1', clonedPath );
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
        console.log( 'Push 2', data.body );
        openAppsInThisPage.dataChooser.model.push( {
          dataChooserEntries: [ 'showData' ],
          title: 'Query: ' + queryTitle,
          response: data.body,
          queryId: queryId,
          depth: 0,
          pathWithArray: path
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
    depth: number,
    pathWithArray: Array<string>
  ) {
    for ( const key in response ) {
      if (
        response[ key ].length === 1 &&
        typeof response[ key ] !== 'string' &&
        !this.pathSet.has( key )
      ) {
        pathWithArray = [];
      }
      if (
        response[ key ].length > 1 &&
        typeof response[ key ] !== 'string' &&
        !this.pathSet.has( key )
      ) {
        this.pathSet.add( key );
        depth += 1;
        pathWithArray.push( key );
        const clonedPath = Object.assign([], pathWithArray);
        // console.log( 'push 3', clonedPath );
        openAppsInThisPage.dataChooser.model.push( {
          dataChooserEntries: this.generateArrayFromLeafs.generateArrayFromLeafs(
            response[ key ]
          ),
          title: 'Query: ' + queryTitle + ' Depth: ' + String(depth),
          response: this.response,
          queryId: queryId,
          pathWithArray: clonedPath
        } );
        // console.log( pathWithArray );
        pathWithArray.splice( pathWithArray.length - 1, 1 );
      } else {
        // console.log( typeof response[ key ] );
        if ( typeof response[ key ] !== 'string' && typeof response[ key ] !== 'number' ) {
          if ( depth = 0 ) {
            pathWithArray = [];
          }
          if ( isNaN( +key ) ) {
            pathWithArray.push( key );

          }
          this.generateArrayKeyValueForEachArrayInResponse(
            response[ key ],
            openAppsInThisPage,
            queryTitle,
            queryId,
            depth + 1,
            pathWithArray
          );
        }
      }
    }
  }
}
