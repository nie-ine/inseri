import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MongoPageService } from '../nieOS/mongodb/page/page.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralRequestService {

  constructor(private http: HttpClient, private pageService: MongoPageService) { }

  request(queryID) {
    return this.pageService.getQuery(queryID)
      .flatMap(data => {
          const query = data.query;
          switch (query.method) {
            case 'GET':
              return this.get(query.serverUrl, query.parameter, query.header);
            case 'POST':
              return this.post(query.serverUrl, query.parameter, query.header, query.body);
            case 'PUT':
              return this.put(query.serverUrl, query.parameter, query.header, query.body);
            case 'DELETE':
              return this.delete(query.serverUrl, query.parameter, query.header);
          }
      });
  }

  get(url: string, parameter?: any, header?: any): Observable<any> {
    console.log('GET Request', url, parameter, header);
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
