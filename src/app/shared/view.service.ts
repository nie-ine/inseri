import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { View } from './models/view';

@Injectable()
export class ViewService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<View[]>('/api/views');
  }

  getById(hash: string) {
    return this.http.get('/api/views/' + hash);
  }

  create(view: View) {
    return this.http.post('/api/views', view);
  }

  update(view: View) {
    return this.http.put('/api/views/' + ( view as any ).hash, view);
  }

  delete(id: number) {
    return this.http.delete('/api/views/' + id);
  }
}
