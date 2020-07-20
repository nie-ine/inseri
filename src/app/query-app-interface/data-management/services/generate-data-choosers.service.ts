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
import {DataAssignmentComponent} from '../data-assignment/data-assignment.component';

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
    const mappedQueries = new Set();
    const queriesToPerform = [];
    // console.log( openAppsInThisPage );
    for ( const appType in openAppsInThisPage ) {
      if ( openAppsInThisPage[ appType ].model.length > 0 ) {
        for ( const app of openAppsInThisPage[ appType ].model ) {
          for ( const appInput in page.appInputQueryMapping[ app.hash ] ) {
            // console.log( page.appInputQueryMapping[ appHash ][ appInput ].query );
            if ( !mappedQueries.has( page.appInputQueryMapping[ app.hash ][ appInput ].query ) ) {
              mappedQueries.add( page.appInputQueryMapping[ app.hash ][ appInput ].query );
              queriesToPerform.push( page.appInputQueryMapping[ app.hash ][ appInput ].query );
            }
          }
        }
      }
    }
    // console.log( queriesToPerform );
    for ( const queryId of queriesToPerform ) {
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
                // console.log( data1 );
                this.response = data1.body;
                for ( const appHash in page.appInputQueryMapping ) {
                  for ( const input in page.appInputQueryMapping[ appHash ] ) {
                    const path = page.appInputQueryMapping[ appHash ][ input ].path;
                    this.checkIfSubsetOfResultContainsArray(
                      data1.body,
                      path,
                      openAppsInThisPage,
                      path,
                      queryTitle,
                      data1,
                      queryId,
                      page
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
    queryId: string,
    page?: any
  ) {
    // console.log( path, response );
    if ( response.length > 0 && typeof response !== 'string' ) {
      response = { array: response };
      path = ['array'].concat( path );
    }
    // issue assign data already here: https://github.com/nie-ine/inseri/issues/477
    const dataAssignmentComponent = new DataAssignmentComponent();
    if ( path[0] === 'wholeJsonResponseAssignedToThisAppInput' ) {
      // console.log( path, response );
      dataAssignmentComponent.startPathUpdateProcess(
        queryId,
        [],
        0,
        response,
        0,
        page.appInputQueryMapping,
        openAppsInThisPage
      );
    }
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
