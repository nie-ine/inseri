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
  containsArray: boolean;
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
          pathArray = data.query.path;
        });
      this.requestService.request(queryId)
        .subscribe((data) => {
          if (data.status === 200) {
            // console.log(data.body, pathArray);
            this.response = data.body;
            this.checkIfSubsetOfResultContainsArray(
              data.body,
              pathArray
            );
            if ( this.containsArray ) {
              this.pathSet = new Set();
              this.depth = 0;
              openAppsInThisPage.dataChooser.model.push( {
                x: 150,
                y: this.y,
                dataChooserEntries: this.generateArrayFromLeafs.generateArrayFromLeafs(
                  this.response,
                  pathArray
                ),
                title: 'Query: ' + queryTitle,
                response: data.body,
                queryId: queryId,
                depth: 0
              } );
              console.log( openAppsInThisPage.dataChooser.model );
              this.pathSet.add( pathArray[ 0 ] );
              this.generateArrayKeyValueForEachArrayInResponse(
                data.body,
                openAppsInThisPage,
                queryTitle,
                queryId,
                this.depth
              );
              return openAppsInThisPage;
            } else {
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
        });
    }
  }

  checkIfSubsetOfResultContainsArray(
    response: any,
    path: Array<string>
  ) {
    if ( path ) {
      console.log( response, path, path.length );
      for ( const segment of path ) {
        // console.log( segment );
        if ( response[ segment ] && response[ segment ].length && typeof response[ segment ] !== 'string') {
          // console.log( 'response contains array' );
          this.containsArray = true;
        } else if ( response[ segment ] && response[ segment ] !== 'string' ) {
          path.splice(0, 1);
          this.checkIfSubsetOfResultContainsArray(
            response[ segment ],
            path
          );
        }
      }
      if ( path.length === 0 ) {
        // console.log( 'Dont generate data choosers ');
        this.containsArray = false;
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
            undefined
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
