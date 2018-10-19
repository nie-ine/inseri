import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AuthData} from '../auth/auth-data.model';
import {Action} from './action.model';

@Injectable({ providedIn: 'root' })
export class MongoActionService {
  actions: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createAction( action: Action ) {
    console.log(action);
    this.http.post('http://localhost:3000/api/action', action)
      .subscribe( response => {
        console.log(response);
      });
  }

  getAllActions(): any {
    return this.http.get('http://localhost:3000/api/action');
  }


}
