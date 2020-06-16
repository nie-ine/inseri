import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MicroserviceService {

  constructor(private http: HttpClient) { }

  postToMicroservice( serviceId: string, body: any ): Observable<any> {
    return this.http.post( environment[ serviceId ], body, {observe: 'response'});
  }
}
