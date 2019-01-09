import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private static API_BASE_URL_MESSAGE = 'http://localhost:3000/api/message';

  constructor(
    private http: HttpClient,
  ) {}

  sendMessage( message: string ): Observable<any> {
    return this.http.post(`${ContactService.API_BASE_URL_MESSAGE}`,
      {
        message: message
      });
  }
}
