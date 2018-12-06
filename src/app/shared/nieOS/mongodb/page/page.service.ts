import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MongoPageService {
  private static API_BASE_URL = 'http://localhost:3000/api/pages';
  actions: any;

  constructor(
    private http: HttpClient
  ) {}

  getPage(pageId: string): Observable<any> {
    return this.http.get(`${MongoPageService.API_BASE_URL}/${pageId}`);
  }

  updatePage(page: any): Observable<any> {
    console.log(page);
    const openAppAsStringArray = [];
    for (const openApp in page.openApps) {
      console.log( JSON.stringify(page.openApps[openApp]) );
      openAppAsStringArray[ openAppAsStringArray.length ] = JSON.stringify(page.openApps[openApp]);
    }
    console.log( openAppAsStringArray );
    page.openApps = openAppAsStringArray;
    return this.http.put(`${MongoPageService.API_BASE_URL}/${page._id}`, page);
  }

  createQuery(pageId: string, query: any): Observable<any> {
    console.log(`${MongoPageService.API_BASE_URL}/${pageId}/queries`);
    return this.http.post(`${MongoPageService.API_BASE_URL}/${pageId}/queries`, query, {observe: 'response'});
  }

  getAllQueries(pageId: string): Observable<any> {
    return this.http.get(`${MongoPageService.API_BASE_URL}/${pageId}/queries`);
  }

  updateQuery(pageId: string, queryId: string, query: any): Observable<any> {
    return this.http.put(`${MongoPageService.API_BASE_URL}/${pageId}/queries/${queryId}`, query, {observe: 'response'});
  }

  deleteQuery(pageId: string, queryId: string): Observable<any> {
    return this.http.delete(`${MongoPageService.API_BASE_URL}/${pageId}/queries/${queryId}`, {observe: 'response'});
  }
}
