import {Injectable, Query} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from './action.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {Page} from '../page/page.model';
import {PageSetModel} from '../pageset/page-set.model';
import {QueryModel} from '../query/query.model';

@Injectable({ providedIn: 'root' })
export class ActionService {
  private static API_BASE_URL_ACTION = environment.node + '/api/actions';
  private static API_BASE_URL_USER = environment.node + '/api/users';

  constructor(
    private http: HttpClient,
  ) {}

  createAction(action: Action, pageSet?: PageSetModel, pages?: [Page]): Observable<any> {
    return this.http.post(`${ActionService.API_BASE_URL_ACTION}/`, action);
  }

  createProject(action: Action, pageSet: PageSetModel, pages: [Page], queries: [QueryModel]): Observable<any> {
    return this.http.post(`${ActionService.API_BASE_URL_ACTION}/createProject/`, {action: action, pageSet: pageSet, pages: pages, queries: queries});
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
