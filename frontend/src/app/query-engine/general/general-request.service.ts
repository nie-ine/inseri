/**
 * This service performs the RESTFul http requests
 * saved by the user in inseri
 * */

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueryService } from '../../user-action-engine/mongodb/query/query.service';
import 'rxjs/add/operator/mergeMap';
import { environment } from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralRequestService {
  params: any;
  private static API_BASE_URL_MY_OWN_JSON = environment.node + '/api/myOwnJson';
  constructor(
    private http: HttpClient,
    private queryService: QueryService,
    public route: ActivatedRoute
  ) { }

  request(queryID) {
    return this.queryService.getQuery(queryID)
      .mergeMap(data => {
          const query = data.query;
          // console.log( data );
          return this.goThroughParams( query, data );
      });
  }

  goThroughParams( query: any, data: any ) {
    // console.log( 'here', this.route.snapshot.queryParams  );
    for ( const param in this.route.snapshot.queryParams ) {
      query.serverUrl = this.replaceParam( query.serverUrl, param );
      if ( query.body ) {
        query.body = this.replaceParam( query.body, param );
      }
    }
    return this.performQueries( query, data );
  }

  replaceParam( toBeChecked: string, param: string ): string {
    if ( toBeChecked.search( 'inseriParam---' + param + '---' ) !== -1 ) {
      const replaced = toBeChecked.replace(
        'inseriParam---' + param + '---',
        this.route.snapshot.queryParams[ param ]
      );
      return replaced;
    } else {
      return toBeChecked;
    }
  }

  performQueries(query: any, data: any) {
    if ( query.serverUrl.search( 'inseriParam' ) !== -1 ||
      ( query.body && query.body.search( 'inseriParam' ) !== -1 ) ) {
      setTimeout(() => {
        return this.goThroughParams( query, data );
      }, 2000);
    }
    console.log( query.serverUrl );
    if ( query.serverUrl.search( 'test-node.nie-ine' ) !== -1 ) {
      console.log( 'replace query', environment.node );
      var oldUrl = query.serverUrl;
      var newUrl = oldUrl.replace( 'http://test-node.nie-ine.ch', environment.node );
      console.log( newUrl );
      query.serverUrl = newUrl;
      console.log( query.serverUrl );
    }
    switch (query.method) {
      case 'GET':
        return this.get(query.serverUrl, data.query.params, query.header);
      case 'POST':
        return this.post(query.serverUrl, data.query.params, query.header, query.body);
      case 'PUT':
        return this.put(query.serverUrl, data.query.params, query.header, query.body);
      case 'DELETE':
        return this.delete(query.serverUrl, data.query.params, query.header);
      case 'JSON':
        // console.log( environment.node +  '/api' + query.serverUrl.split( 'api' )[ 1 ] );
        return this.get(environment.node +  '/api' + query.serverUrl.split( 'api' )[ 1 ], data.query.params, query.header);
    }
  }

  transformParam(parameter: any[]) {
    let param = new HttpParams();
    if ( parameter !== undefined ) {
      for (const i of parameter) {
        param = param.append(i.key, i.value);
      }
    }
    return param;
  }

  transformHeader( header: any ) {
    // console.log( header );
    let headerTransformed = new HttpHeaders();
    if ( header && header.length ) {
      for (const i of header) {
        headerTransformed = headerTransformed.append(i.key, i.value);
        return headerTransformed;
      }
    } else {
      for (const i in header) {
        headerTransformed = headerTransformed.append(i, header[ i ]);
      }
      // console.log( headerTransformed );
      return headerTransformed;
    }
  }

  get(url: string, parameter?: any, header?: any): Observable<any> {
    console.log('GET Request', url, parameter, header);
    return this.http.get(url, {headers: this.transformHeader(header), params : this.transformParam(parameter), observe: 'response'});
  }

  post(url: string, parameter?: any, header?: any, body?: string): Observable<any> {
    // console.log('POST Request', body, header);
    let help = {};
    if ( header.length > 0 ) {
      for ( const entry of header ) {
        help[ entry.key ] = entry.value;
      }
      header = help;
    }
    // console.log( help, header );

    return this.http.post(
      url,
      body,
      {params: this.transformParam(parameter), headers: this.transformHeader(header),
        observe: 'response' } );
  }

  put(url: string, parameter?: any, header?: any, body?: string): Observable<any> {
    // console.log('PUT Request', url, parameter, header, body);
    return this.http.put(url, body, {params: this.transformParam(parameter), headers: this.transformHeader(header), observe: 'response'});
  }

  delete(url: string, parameter?: any, header?: any): Observable<any> {
    // console.log('DELETE Request', url, parameter, header);
    return this.http.delete(url, {params: this.transformParam(parameter), headers: this.transformHeader(header), observe: 'response'});
  }

  createJson() {
    return this.http.get( GeneralRequestService.API_BASE_URL_MY_OWN_JSON + '/newJson' );
  }

  updateJson(
    jsonId: string,
    body: any
  ) {
    return this.http.put( GeneralRequestService.API_BASE_URL_MY_OWN_JSON + '/updateJson/' + jsonId, body );
  }

  updateFile(
    jsonId: string,
    body: any
  ) {
    return this.http.put( GeneralRequestService.API_BASE_URL_MY_OWN_JSON + '/updateFile/' + jsonId, body );
  }

  publishJSON( jsonId: string, published: boolean ) {
    return this.http.put( GeneralRequestService.API_BASE_URL_MY_OWN_JSON + '/publishJSON/' + jsonId, {published: published} );
  }
}
