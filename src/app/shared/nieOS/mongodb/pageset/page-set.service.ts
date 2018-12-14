import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageSetModel } from './page-set.model';
import { Observable } from 'rxjs';

@Injectable()
export class MongoPageSetService {
  private static API_BASE_URL_PAGE_SET = 'http://localhost:3000/api/pagesets';

  constructor(private http: HttpClient) { }

  createPageSet(pageSet: PageSetModel): Observable<any> {
    return this.http.post(`${MongoPageSetService.API_BASE_URL_PAGE_SET}`, pageSet);
  }

  getPageSet(id: string): Observable<any> {
    return this.http.get(`${MongoPageSetService.API_BASE_URL_PAGE_SET}/${id}`);
  }

  getAllPageSet(): Observable<any> {
    return this.http.get(`${MongoPageSetService.API_BASE_URL_PAGE_SET}`);
  }

  updatePageSet(pageSet: PageSetModel): Observable<any> {
    return this.http.put(`${MongoPageSetService.API_BASE_URL_PAGE_SET}/${pageSet.id}`, pageSet);
  }

  deletePageSet(id: string): Observable<any> {
    return this.http.delete(`${MongoPageSetService.API_BASE_URL_PAGE_SET}/${id}`);
  }
}
