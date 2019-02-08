import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private static API_BASE_URL_MESSAGE = environment.node + '/api/message';

  constructor(
    private http: HttpClient,
  ) {}

  sendMessage( message: string, recipient?: string ): Observable<any> {
    console.log( recipient );
    return this.http.post(`${ContactService.API_BASE_URL_MESSAGE}`,
      {
        message: message,
        recipient: recipient
      });
  }
}
