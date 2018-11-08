import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AuthData} from '../auth/auth-data.model';
import {Page} from './page.model';
import {MongoActionService} from '../action/action.service';

@Injectable({ providedIn: 'root' })
export class MongoPageService {
  private static API_BASE_URL = 'http://localhost:3000/api/page';
  actions: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private mongoActionService: MongoActionService
  ) {}

  createPage(): any {
    return this.http.post(`${MongoPageService.API_BASE_URL}`, undefined);
  }

  getPage( pageId: string ): any {
    return this.http.get(`${MongoPageService.API_BASE_URL}/${pageId}`);
  }

  updatePage( page: any ): any {
    console.log(page);
    const openAppAsStringArray = [];
    for ( const openApp in page.openApps) {
      console.log( JSON.stringify(page.openApps[openApp]) );
      openAppAsStringArray[ openAppAsStringArray.length ] = JSON.stringify(page.openApps[openApp]);
    }
    console.log( openAppAsStringArray );
    page.openApps = openAppAsStringArray;
    return this.http.put(`${MongoPageService.API_BASE_URL}`, page);
  }
}
