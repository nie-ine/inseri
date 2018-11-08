import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Page } from './page';

@Injectable()
export class PageService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Page[]>('/api/pages');
  }

  getById(hash: string) {
    return this.http.get('/api/pages/' + hash);
  }

  create(page: Page) {
    return this.http.post('/api/pages', page);
  }

  update(page: Page) {
    return this.http.put('/api/pages/' + ( page as any ).hash, page);
  }

  delete(id: number) {
    return this.http.delete('/api/pages/' + id);
  }
}
