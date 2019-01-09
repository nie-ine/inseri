import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from './action.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActionService {
  private static API_BASE_URL_ACTION = 'http://localhost:3000/api/actions';
  private static API_BASE_URL_USER = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
  ) {}

  createAction(action: Action): Observable<any> {
    return this.http.post(`${ActionService.API_BASE_URL_ACTION}/`, action);
  }

  getAction(id: string): Observable<any> {
    return this.http.get(`${ActionService.API_BASE_URL_ACTION}/${id}`, {observe: 'response'});
  }

  getAllActions(): Observable<any> {
    return this.http.get(`${ActionService.API_BASE_URL_ACTION}`);
  }

  getAllActionsOfUser(userID: string): Observable<any> {
    return this.http.get<Observable<any>>(`${ActionService.API_BASE_URL_USER}/${userID}/actions`);
  }

  updateAction(action: Action): Observable<any> {
    return this.http.put(`${ActionService.API_BASE_URL_ACTION}/${action.id}`, action);
  }

  deleteAction(id: string): Observable<any> {
    return this.http.delete(`${ActionService.API_BASE_URL_ACTION}/${id}`, {observe: 'response'});
  }

}
