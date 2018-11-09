import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageSetModel } from './page-set.model';
import { Observable } from 'rxjs';

@Injectable()
export class PageSetService {
  private static API_BASE_URL_PAGE_SET = 'http://localhost:3000/api/pages';

  constructor(private http: HttpClient) { }

  // getAll() {
  //   return this.http.get<PageSetModel[]>('/api/pages');
  // }
  //
  // getById(hash: string) {
  //   return this.http.get('/api/pages/' + hash);
  // }
  //
  // create(pageSet: PageSetModel) {
  //   return this.http.post('/api/pages', pageSet);
  // }
  //
  // update(pageSet: PageSetModel) {
  //   return this.http.put('/api/pages/' + pageSet.hash, pageSet);
  // }
  //
  // delete(hash: string) {
  //   return this.http.delete('/api/pages/' + hash);
  // }

  // Requests concerning page sets
  createPageSet(pageSet: PageSetModel): Observable<any> {
    return this.http.post(`${PageSetService.API_BASE_URL_PAGE_SET}`, pageSet);
  }

  getPageSet(id: string): Observable<any> {
    return this.http.get(`${PageSetService.API_BASE_URL_PAGE_SET}/${id}`);
  }

  getAllPageSet(): Observable<any> {
    return this.http.get(`${PageSetService.API_BASE_URL_PAGE_SET}`);
  }

  updatePageSet(pageSet: PageSetModel): Observable<any> {
    return this.http.put(`${PageSetService.API_BASE_URL_PAGE_SET}/${pageSet.id}`, pageSet);
  }

  deletePageSet(hash: string): Observable<any> {
    return this.http.delete(`${PageSetService.API_BASE_URL_PAGE_SET}/${hash}`);
  }
}
