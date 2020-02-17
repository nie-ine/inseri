import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsergroupService {

  private static API_BASE_URL_USERGROUP = environment.node + '/api/usergroups';

  constructor(private http: HttpClient) { }

  createGroup(title: string, description: string): Observable<any> {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP}`,
      { title: title, description: description}, {observe: 'response'});
  }
  getAllUserGroups() {
    return this.http.get(
      `${UsergroupService.API_BASE_URL_USERGROUP}`, {observe: 'response'});
  }

}
