import { Injectable } from '@angular/core';

import { Action } from './models/action';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class ActionService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Action[]>('/api/actions');
  }

  getById(id: number) {
    return this.http.get('/api/actions/' + id);
  }

  create(action: Action) {
    return this.http.post('/api/actions', action);
  }

  update(action: Action) {
    return this.http.put('/api/actions/' + action.id, action);
  }

  delete(id: number) {
    return this.http.delete('/api/actions/' + id);
  }
}
