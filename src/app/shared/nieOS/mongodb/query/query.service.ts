import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private static API_BASE_URL_QUERY = 'http://localhost:3000/api/queries';
  private static API_BASE_URL_USER = 'http://localhost:3000/api/users';
  private static API_BASE_URL_PAGE = 'http://localhost:3000/api/pages';

  constructor(private http: HttpClient) { }

  createQuery(query: any): Observable<any> {
    return this.http.post(`${QueryService.API_BASE_URL_QUERY}`, query, {observe: 'response'});
  }

  createQueryOfPage(pageId: string, query: any): Observable<any> {
    return this.http.post(`${QueryService.API_BASE_URL_PAGE}/${pageId}/queries`, query, {observe: 'response'});
  }

  getAllQueries(): Observable<any> {
    return this.http.get(`${QueryService.API_BASE_URL_QUERY}`);
  }

  getAllQueriesOfPage(pageId: string): Observable<any> {
    return this.http.get(`${QueryService.API_BASE_URL_PAGE}/${pageId}/queries`);
  }

  getAllQueriesOfUser(userId: string): Observable<any> {
    return this.http.get(`${QueryService.API_BASE_URL_USER}/${userId}/queries`);
  }

  getQuery(queryId: string): Observable<any> {
    return this.http.get(`${QueryService.API_BASE_URL_QUERY}/${queryId}`);
  }

  updateQuery(queryId: string, query: any): Observable<any> {
    return this.http.put(`${QueryService.API_BASE_URL_QUERY}/${queryId}`, query, {observe: 'response'});
  }

  updateQueryOfPage(pageId: string, queryId: string, query: any): Observable<any> {
    return this.http.put(`${QueryService.API_BASE_URL_PAGE}/${pageId}/queries/${queryId}`, query, {observe: 'response'});
  }

  deleteQuery(queryId: string): Observable<any> {
    return this.http.delete(`${QueryService.API_BASE_URL_QUERY}/${queryId}`, {observe: 'response'});
  }

  deleteQueryOfPage(pageId: string, queryId: string): Observable<any> {
    return this.http.delete(`${QueryService.API_BASE_URL_PAGE}/${pageId}/queries/${queryId}`, {observe: 'response'});
  }

}
