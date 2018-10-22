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
    return this.http.get<{message: string, actions: any}>('http://localhost:3000/api/action');
  }

  deleteAction(actionId: string) {
    console.log('delete action ' + actionId);
    this.http.delete('http://localhost:3000/api/action/' + actionId)
      .subscribe( () => {
      console.log('Deleted!');
    });
  }


}
