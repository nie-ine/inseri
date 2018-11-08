import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Action} from '../action/action.model';

@Injectable({ providedIn: 'root' })
export class MongoContactService {
  private static API_BASE_URL = 'http://localhost:3000/api/message';

  constructor(
    private http: HttpClient,
  ) {}

  sendMessage( message: string ): Observable<any> {
    return this.http.post(`${MongoContactService.API_BASE_URL}`,
      {
        message: message
      });
  }
}
