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

@Injectable({
  providedIn: 'root'
})
export class GeneralRequestService {
  params: any;
  private static API_BASE_URL_MY_OWN_JSON = environment.node + '/api/myOwnJson';
  constructor(private http: HttpClient, private queryService: QueryService) { }

  request(queryID) {
    return this.queryService.getQuery(queryID)
      .mergeMap(data => {
          const query = data.query;

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
              return this.get(query.serverUrl, data.query.params, query.header);
          }
      });
  }

  transformParam(parameter: any[]) {
    let param = new HttpParams();
    for (const i of parameter) {
      param = param.append(i.key, i.value);
    }
    return param;
  }

  transformHeader( header: any ) {
    let headerTransformed = new HttpHeaders();
    for (const i in header) {
      headerTransformed = headerTransformed.append(i, header[ i ]);
    }
    // console.log( headerTransformed );
    return headerTransformed;
  }

  get(url: string, parameter?: any, header?: any): Observable<any> {
    // console.log('GET Request', url, parameter, header);
    return this.http.get(url, {headers: this.transformHeader(header), params : this.transformParam(parameter), observe: 'response'});
  }

  post(url: string, parameter?: any, header?: any, body?: string): Observable<any> {
    // console.log('POST Request', url, parameter, header, body);
    return this.http.post(url, body, {params: this.transformParam(parameter), headers: header, observe: 'response'});
  }

  put(url: string, parameter?: any, header?: any, body?: string): Observable<any> {
    // console.log('PUT Request', url, parameter, header, body);
    return this.http.put(url, body, {params: this.transformParam(parameter), headers: header, observe: 'response'});
  }

  delete(url: string, parameter?: any, header?: any): Observable<any> {
    // console.log('DELETE Request', url, parameter, header);
    return this.http.delete(url, {params: this.transformParam(parameter), headers: header, observe: 'response'});
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
