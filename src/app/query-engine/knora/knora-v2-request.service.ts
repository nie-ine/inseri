import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * This service deals with requests to the Knora V2 API and centralizes parameters for it.
 */
@Injectable()
export class KnoraV2RequestService {

  instanceAddress = environment.api;
  basicAuthentication = 'email=root%40example.com&password=test'; // TODO: integrate into login framework

  // create authentication data for posting
  // TODO: use services
  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
  };

  constructor(private httpClient: HttpClient) { }

  /**
   * Get a JSON representation of a resource
   * @param {string} resourceIRI  The uniqe IRI of the requested resource
   * @returns {Observable<Object>}  The Knora V2 response for this resource
   */
  getResource(resourceIRI: string) {
    return this.httpClient.get(this.instanceAddress + '/v2/resources/'
      + encodeURIComponent(resourceIRI)
      + '?' + this.basicAuthentication );
  }

  /**
   * Get a JSON representation of a resource
   * @param {string} resourceIRI  The uniqe IRI of the requested resource
   * @param {string} databaseAddress  The domain of the Knora instance
   * @returns {Observable<Object>}  The Knora V2 response for this resource
   */
  getResourceFromSpecificInstance(resourceIRI: string, databaseAddress: string) {
    return this.httpClient.get(databaseAddress + '/v2/resources/'
      + encodeURIComponent(resourceIRI)
      + '?' + this.basicAuthentication );
  }

  /**
   * Get a JSON representation of a tree defined by a gravesearch query
   * @param {string} graveSearchRequest  A SPARQL like request
   * @returns {Observable<Object>}  The Knora V2 response for this resource
   */
  extendedSearch(graveSearchRequest: string) {
    return this.httpClient.post(this.instanceAddress + '/v2/searchextended?' + this.basicAuthentication, graveSearchRequest);
  }

  /**
   * Get a JSON representation of a tree defined by a gravesearch query
   * @param {string} graveSearchRequest  A SPARQL like request
   * @param {string} databaseAddress  The domain of the Knora instance
   * @returns {Observable<Object>}  The Knora V2 response for this resource
   */
  extendedSearchFromSpecificInstance(graveSearchRequest: string, databaseAddress: string) {
    return this.httpClient.post(databaseAddress + '/v2/searchextended?' + this.basicAuthentication, graveSearchRequest);
  }

  /**
   * Get the number of main resources defined by a gravesearch query
   * @param {string} graveSearchRequest  A SPARQL like request
   * @param {string} databaseAddress  The domain of the Knora instance
   * @returns {Observable<Object>}  The Knora V2 response for this resource
   */
  countExtendedSearchFromSpecificInstance(graveSearchRequest: string, databaseAddress: string) {
    return this.httpClient.post(databaseAddress + '/v2/searchextended/count?' + this.basicAuthentication, graveSearchRequest);
  }

}
