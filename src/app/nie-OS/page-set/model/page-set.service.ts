import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageSetModel } from './page-set.model';
import { Observable } from 'rxjs';

@Injectable()
export class PageSetService {
  private static API_BASE_URL_PAGE_SET = 'http://localhost:3000/api/pagesets';

  constructor(private http: HttpClient) { }

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

  deletePageSet(id: string): Observable<any> {
    return this.http.delete(`${PageSetService.API_BASE_URL_PAGE_SET}/${id}`);
  }

  createPage(pageSetID: string, page: any): Observable<any> {
    console.log('createPage function');
    return this.http.post(`${PageSetService.API_BASE_URL_PAGE_SET}/${pageSetID}/pages`, page);
  }

  updatePage(pageSetID: string, page: any): Observable<any> {
    return this.http.put(`${PageSetService.API_BASE_URL_PAGE_SET}/${pageSetID}/pages/${page.id}`, page, {observe: 'response'});
  }

  deletePage(pageSetID: string, pageID: string): Observable<any> {
    return this.http.delete(`${PageSetService.API_BASE_URL_PAGE_SET}/${pageSetID}/pages/${pageID}`, {observe: 'response'});
  }
}
