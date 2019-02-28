import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

/**
 * This service deals with requests to the Knora V2 API and centralizes parameters for it.
 */
@Injectable()
export class SendGravSearchQueryService {

  instanceAddress = environment.api;
  basicAuthentication = 'email=root%40example.com&password=test'; // TODO: integrate into login framework

  // create authentication data for posting
  // TODO: use services
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test'),
        'Content-Type':  'text/plain'
      }
      )
  };

  constructor(private httpClient: HttpClient) { }

  /**
   * Sends a request to the simple API of Knora v2 gravsearch
   * @returns {Observable<Object>}
   * */
  sendRequest( gravsearchRequest: string ) {
    return this.httpClient.post(
      this.instanceAddress + '/v2/searchextended' + '?' + this.basicAuthentication,
      gravsearchRequest,
      {
        headers: { 'Content-Type': 'text/plain' }
      }
      );
  }
}
