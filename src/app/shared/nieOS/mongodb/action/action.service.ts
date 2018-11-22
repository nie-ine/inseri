import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from './action.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MongoActionService {
  private static API_BASE_URL = 'http://localhost:3000/api/actions';

  constructor(
    private http: HttpClient,
  ) {}

  createAction(action: Action): Observable<any> {
    return this.http.post(`${MongoActionService.API_BASE_URL}/`, action);
  }

  getAction(id: string): Observable<any> {
    return this.http.get(`${MongoActionService.API_BASE_URL}/${id}`, {observe: 'response'});
  }

  getAllActions(userID: string): Observable<any> {
    return this.http.get<Observable<any>>(`http://localhost:3000/api/users/${userID}/actions`);
  }

  updateAction(action: Action): Observable<any> {
    return this.http.put(`${MongoActionService.API_BASE_URL}/${action.id}`, action);
  }

  deleteAction(id: string): Observable<any> {
    return this.http.delete(`${MongoActionService.API_BASE_URL}/${id}`, {observe: 'response'});
  }

}
