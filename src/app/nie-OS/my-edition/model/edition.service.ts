import { Injectable } from '@angular/core';

import { Edition } from './edition.model';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class EditionService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Edition[]>('/api/editions');
  }

  getById(hash: string) {
    return this.http.get('/api/editions/' + hash);
  }

  create(edition: Edition) {
    return this.http.post('/api/editions', edition);
  }

  update(edition: Edition) {
    return this.http.put('/api/editions/' + edition.hash, edition);
  }

  delete(hash: string) {
    return this.http.delete('/api/editions/' + hash);
  }
}
