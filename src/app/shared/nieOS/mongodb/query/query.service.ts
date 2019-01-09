import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoQueryService {

  private static API_BASE_URL_QUERY = 'http://localhost:3000/api/queries';

  constructor(private http: HttpClient) { }

  getAllQueries(): Observable<any> {
    return this.http.get(`${MongoQueryService.API_BASE_URL_QUERY}`);
  }

  getQuery(queryId: string): Observable<any> {
    return this.http.get(`${MongoQueryService.API_BASE_URL_QUERY}/${queryId}`);
  }

  updateQuery(queryId: string, query: any): Observable<any> {
    return this.http.put(`${MongoQueryService.API_BASE_URL_QUERY}/${queryId}`, query, {observe: 'response'});
  }

  deleteQuery(queryId: string): Observable<any> {
    return this.http.delete(`${MongoQueryService.API_BASE_URL_QUERY}/${queryId}`, {observe: 'response'});
  }
}
