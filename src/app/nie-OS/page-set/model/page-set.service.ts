import { Injectable } from '@angular/core';

import { PageSetModel } from './page-set.model';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class PageSetService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<PageSetModel[]>('/api/pages');
  }

  getById(hash: string) {
    return this.http.get('/api/pages/' + hash);
  }

  create(pageSet: PageSetModel) {
    return this.http.post('/api/pages', pageSet);
  }

  update(pageSet: PageSetModel) {
    return this.http.put('/api/pages/' + pageSet.hash, pageSet);
  }

  delete(hash: string) {
    return this.http.delete('/api/pages/' + hash);
  }
}
