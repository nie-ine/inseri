import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AuthData} from '../auth/auth-data.model';
import {Action} from './action.model';

@Injectable({ providedIn: 'root' })
export class MongoActionService {
  private static API_BASE_URL = 'http://localhost:3000/api/action';
  actions: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createAction( action: Action ) {
    console.log(action);
    this.http.post(`${MongoActionService.API_BASE_URL}`, action)
      .subscribe( response => {
        console.log(response);
      });
  }

  getAction(actionId: number) {
    return this.http.get(`${MongoActionService.API_BASE_URL}/${actionId}`);
  }

  getAllActions(): any {
    return this.http.get<{message: string, actions: any}>(`${MongoActionService.API_BASE_URL}`);
  }

  deleteAction(actionId: string) {
    console.log('delete action ' + actionId);
    this.http.delete(`${MongoActionService.API_BASE_URL}/${actionId}`)
      .subscribe( () => {
      console.log('Deleted!');
    });
  }


}
