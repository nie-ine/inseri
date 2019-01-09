import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueryService } from '../nieOS/mongodb/query/query.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralRequestService {
  params: any;
  constructor(private http: HttpClient, private queryService: QueryService) { }

  request(queryID) {
    return this.queryService.getQuery(queryID)
      .flatMap(data => {
          const query = data.query;
          // console.log( data );
          this.params = {};
          for ( const param of data.query.params ) {
            this.params[ param[ 'key' ] ] = param[ 'value' ];
          }
          // console.log( this.params );
          switch (query.method) {
            case 'GET':
              return this.get(query.serverUrl, this.params, query.header);
            case 'POST':
              return this.post(query.serverUrl, this.params, query.header, query.body);
            case 'PUT':
              return this.put(query.serverUrl, this.params, query.header, query.body);
            case 'DELETE':
              return this.delete(query.serverUrl, this.params, query.header);
          }
      });
  }

  get(url: string, parameter?: any, header?: any): Observable<any> {
    // console.log('GET Request', url, parameter, header);
    return this.http.get(url, {params : parameter, headers: header, observe: 'response'});
  }

  post(url: string, parameter?: any, header?: any, body?: string): Observable<any> {
    console.log('POST Request', url, parameter, header, body);
    return this.http.post(url, body, {params: parameter, headers: header, observe: 'response'});
  }

  put(url: string, parameter?: any, header?: any, body?: string): Observable<any> {
    console.log('PUT Request', url, parameter, header, body);
    return this.http.put(url, body, {params: parameter, headers: header, observe: 'response'});
  }

  delete(url: string, parameter?: any, header?: any): Observable<any> {
    console.log('DELETE Request', url, parameter, header);
    return this.http.delete(url, {params: parameter, headers: header, observe: 'response'});
  }
}
