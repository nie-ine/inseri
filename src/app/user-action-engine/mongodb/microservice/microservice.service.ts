import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MicroserviceService {
  private static API_BASE_URL_MICROSERVICES =  environment.node +  '/api/microservices';

  constructor(private http: HttpClient) { }

  postToMicroservice( serviceId: string, body: any ): Observable<any> {
    // console.log( body.getAll('data') );
    return this.http.post( `${MicroserviceService.API_BASE_URL_MICROSERVICES}/
    ${encodeURIComponent(environment[ serviceId ])}` , body, {observe: 'response'});
  }
}
