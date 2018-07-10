import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class KnoraV1RequestService {

  instanceAddress = 'http://knora2.nie-ine.ch'; // TODO: move to centralized place
  basicAuthentication = 'email=root%40example.com&password=test'; // TODO: integrate into login framewor

  // create authentication data for posting
  // TODO: use services
  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
  };

  constructor(private httpClient: HttpClient) { }

  getVocabularies() {
    return this.httpClient.get(this.instanceAddress + '/v1/vocabularies'
      + '?' + this.basicAuthentication);
  }

  getResourcesOfVocabulary(vocabularyIRI: string) {
    return this.httpClient.get(this.instanceAddress + '/v1/resourcetypes'
      + '?vocabulary=' + encodeURIComponent(vocabularyIRI)
      + '&' + this.basicAuthentication );
  }

  getResourceClass(resourceClassIRI: string) {
    return this.httpClient.get(this.instanceAddress + '/v1/resourcetypes/'
      + encodeURIComponent(resourceClassIRI)
      + '?' + this.basicAuthentication );
  }

  getResource(resourceIRI: string) {
    return this.httpClient.get(this.instanceAddress + '/v1/resources/'
      + encodeURIComponent(resourceIRI)
      + '?' + this.basicAuthentication );
  }

  searchResourcesByLabel(label: string) {
    return this.httpClient.get('http://knora2.nie-ine.ch/v1/resources'
      + '?searchstr=' + encodeURIComponent(label)
      + '&' + this.basicAuthentication );
  }

  searchResourcesByLabelByResourceClass(label: string, resourceClassIRI: string) {
    return this.httpClient.get('http://knora2.nie-ine.ch/v1/resources'
      + '?searchstr=' + encodeURIComponent(label)
      + '?restype_id=' + encodeURIComponent(resourceClassIRI)
      + '&' + this.basicAuthentication );
  }

  deleteResource(resourceIRI: string) {
    return this.httpClient.delete(this.instanceAddress + '/v1/resources/'
      + encodeURIComponent(resourceIRI)
      + '?' + this.basicAuthentication,
      this.httpOptions );
  }

  changeResourceLabel(resourceIRI: string, resourceParams) {
    return this.httpClient.put(this.instanceAddress + '/v1/resources/label/'
      + encodeURIComponent(resourceIRI)
      + '?' + this.basicAuthentication,
      resourceParams,
      this.httpOptions );
  }

  postResource(resourceParams) {
    return this.httpClient.post(this.instanceAddress + '/v1/resources'
      + '?' + this.basicAuthentication,
      resourceParams,
      this.httpOptions );
  }

  deletePropertyValue(valueIRI: string) {
    return this.httpClient.delete(this.instanceAddress + '/v1/values/'
      + encodeURIComponent(valueIRI)
      + '?' + this.basicAuthentication,
      this.httpOptions );
  }

  postPropertyValue(resourceParams) {
    return this.httpClient.post( this.instanceAddress + '/v1/values'
      + '?' + this.basicAuthentication,
      resourceParams,
      this.httpOptions );
  }

  changePropertyValue(valueIRI: string, resourceParams) {
    return this.httpClient.put(this.instanceAddress + '/v1/values/'
      + encodeURIComponent(valueIRI)
      + '?' + this.basicAuthentication,
      resourceParams,
      this.httpOptions );
  }

  getPropetyValue(valueIRI: string) {
    return this.httpClient.get(this.instanceAddress + '/v1/values/'
      + encodeURIComponent(valueIRI)
      + '?' + this.basicAuthentication );
  }

  getPropertyValueHistory(resourceIRI: string, propertyTypeIRI: string, valueIRI: string) {
    return this.httpClient.get(this.instanceAddress + '/v1/values/history/'
      + encodeURIComponent(resourceIRI)
      + '/' + encodeURIComponent(propertyTypeIRI)
      + '/' + encodeURIComponent(valueIRI)
      + '?' + this.basicAuthentication );
  }


}
