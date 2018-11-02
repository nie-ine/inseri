import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AuthData} from '../auth/auth-data.model';
import {Page} from './page.model';

@Injectable({ providedIn: 'root' })
export class MongoPageService {
  private static API_BASE_URL = 'http://localhost:3000/api/page';
  actions: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createPage(): any {
    console.log('Create page');
    return this.http.post(`${MongoPageService.API_BASE_URL}`, undefined);
  }
}
