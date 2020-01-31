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
import {type} from 'os';

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
  firstTimeQueryIsPushed = new Set();
  constructor(
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private generateArrayFromLeafs: GenerateArrayFromLeafsService,
    private requestService: GeneralRequestService,
    private queryService: QueryService
  ) { }

  generateDataChoosers( page: any, openAppsInThisPage: any, reset: boolean ) {
    this.pathSet = new Set();
    this.firstTimeQueryIsPushed = new Set();
    for ( const queryId of  page.queries ) {
      let queryTitle = '';
      let pathArray = [];
      this.queryService.getQuery(queryId)
        .subscribe((data) => {
          queryTitle = data.query.title;
          if ( data.query.method === 'JSON' ) {
            queryTitle = queryTitle + ' (file / own query)';
          }
          pathArray = data.query.path;       // path array is the path chosen for the entries to be displayed in the data chooser dropdown
          // console.log( data.query );
          this.query = data;
          this.requestService.request(queryId)
            .subscribe((data1) => {
              if (data1.status === 200) {
                // console.log(data.body, pathArray);
                this.response = data1.body;
                for ( const appHash in page.appInputQueryMapping ) {
                  for ( const input in page.appInputQueryMapping[ appHash ] ) {
                    const path = page.appInputQueryMapping[ appHash ][ input ].path;
                    if ( path ) {
                      for ( let i = 0; i < path.length; i++ ) {
                        if ( typeof path[ i ] === 'number' ) {
                          path.splice( i, 1 );
                        }
                      }
                    }
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
    // console.log( path );
    if ( path ) {
      const segment = path[ 0 ];
      // console.log( segment, response );
      if ( response[ segment ] && response[ segment ].length > 1 && typeof response[ segment ] !== 'string') {
        // console.log( openAppsInThisPage.dataChooser.model );
        this.generateArrayKeyValueForEachArrayInResponse(
          data.body,
          openAppsInThisPage,
          queryTitle,
          queryId,
          []
        );
        return openAppsInThisPage;
      } else if ( response[ segment ] && response[ segment ] !== 'string' ) {
        const clonedPath = Object.assign([], path);
        clonedPath.splice(0, 1);
        // console.log( 'case 1', clonedPath, response[ segment ] );
        if ( response[ segment ].length === 1 ) {
          this.checkIfSubsetOfResultContainsArray(
            response[ segment ] [ 0 ],
            clonedPath,
            openAppsInThisPage,
            pathArray,
            queryTitle,
            data,
            queryId
          );
        } else {
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
        this.generateQueryButtonInDataChooser( queryId, openAppsInThisPage, queryTitle );
        // console.log( 'Push 2', path );
        openAppsInThisPage.dataChooser.model.push( {
          dataChooserEntries: [ 'showData' ],
          title: undefined,
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
    pathWithArray: Array<string>
  ) {
    if ( response && response !== null ) {
      // console.log(pathWithArray, response);
      if (!response.length) {
        for (const key in response) {
          if (
            response[ key ] && response[ key ].length === 1 &&
            typeof response[ key ] !== 'string'
          ) {
            pathWithArray = [];
          }
          if (typeof response[key] !== 'string' && typeof response[key] !== 'number') {
            const clonedPath = Object.assign([], pathWithArray);
            clonedPath.push(key);
            // console.log(clonedPath);
            this.generateArrayKeyValueForEachArrayInResponse(
              response[key],
              openAppsInThisPage,
              queryTitle,
              queryId,
              clonedPath
            );
          }
        }
      } else {
        if ( typeof response !== 'string' ) {
          this.generateArrayKeyValueForEachArrayInResponse(
            response[0],
            openAppsInThisPage,
            queryTitle,
            queryId,
            pathWithArray
          );
        } else {
          // console.log( response );
        }
        if (
          response.length > 1 &&
          typeof response !== 'string' &&
          !this.pathSet.has(pathWithArray.toString() + queryId)
        ) {
          this.generateQueryButtonInDataChooser( queryId, openAppsInThisPage, queryTitle );
          this.pathSet.add(pathWithArray.toString() + queryId);
          const clonedPath = Object.assign([], pathWithArray);
          // console.log('push 4', clonedPath);
          openAppsInThisPage.dataChooser.model.push({
            dataChooserEntries: this.generateArrayFromLeafs.generateArrayFromLeafs(
              response
            ),
            title: undefined,
            response: this.response,
            queryId: queryId,
            pathWithArray: clonedPath
          });
        }
      }
    }

  }

  generateQueryButtonInDataChooser ( queryId: string, openAppsInThisPage: any, queryTitle: string ) {
    if ( !this.firstTimeQueryIsPushed.has( queryId ) ) {
      this.firstTimeQueryIsPushed.add( queryId );
      openAppsInThisPage.dataChooser.model.push({
        dataChooserEntries: undefined,
        title: 'Query: ' + queryTitle,
        response: undefined,
        queryId: queryId,
        pathWithArray: undefined
      });
    }
  }
}
