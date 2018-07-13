import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * This service deals with requests to the Knora V1 API and centralizes parameters for it.
 */
@Injectable()
export class KnoraV1RequestService {

  instanceAddress = environment.api;
  basicAuthentication = 'email=root%40example.com&password=test'; // TODO: integrate into login framework

  // create authentication data for posting
  // TODO: use services
  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
  };

  constructor(private httpClient: HttpClient) { }

  /**
   * Get all Projects of a running Knora instance
   * @returns {Observable<Object>}
   * */
  getProjects() {
    return this.httpClient.get(this.instanceAddress + '/admin/projects'
      + '?' + this.basicAuthentication);
  }

  /**
   * Get the vocabularies on a running Knora instance.
   * @returns {Observable<Object>}
   */
  getVocabularies() {
    return this.httpClient.get(this.instanceAddress + '/v1/vocabularies'
      + '?' + this.basicAuthentication);
  }

  /**
   * Get the information about the resource types in a vocubulary
   * @param {string} vocabularyIRI  The IRI of the selected vocabulary
   * @returns {Observable<Object>}  The response in Knora V1 format
   */
  getResourcesOfVocabulary(vocabularyIRI: string) {
    return this.httpClient.get(this.instanceAddress + '/v1/resourcetypes'
      + '?vocabulary=' + encodeURIComponent(vocabularyIRI)
      + '&' + this.basicAuthentication );
  }

  /**
   * Get the information about a selected resource class
   * @param {string} resourceClassIRI  The IRI of the resource class
   * @returns {Observable<Object>}  The response in Knora V1 format
   */
  getResourceClass(resourceClassIRI: string) {
    return this.httpClient.get(this.instanceAddress + '/v1/resourcetypes/'
      + encodeURIComponent(resourceClassIRI)
      + '?' + this.basicAuthentication );
  }

  /**
   * Get a JSON representation of a resource
   * @param {string} resourceIRI  The uniqe IRI of the requested resource
   * @returns {Observable<Object>}  The Knora V1 response for this resource
   */
  getResource(resourceIRI: string) {
    return this.httpClient.get(this.instanceAddress + '/v1/resources/'
      + encodeURIComponent(resourceIRI)
      + '?' + this.basicAuthentication );
  }

  /**
   * Look for resources by their label
   * @param {string} label  The label/firstproperty of the resource
   * @returns {Observable<Object>}  The Knora V1 response containing the found resources
   */
  searchResourcesByLabel(label: string) {
    return this.httpClient.get('http://knora2.nie-ine.ch/v1/resources'
      + '?searchstr=' + encodeURIComponent(label)
      + '&' + this.basicAuthentication );
  }

  /**
   * Look for resources by their label, restricted to a resource class
   * @param {string} label  The label/firstproperty of the resource
   * @param {string} resourceClassIRI  The IRI of the resource results should belong to
   * @returns {Observable<Object>}  The Knora V1 response containing the found resources
   */
  searchResourcesByLabelByResourceClass(label: string, resourceClassIRI: string) {
    return this.httpClient.get('http://knora2.nie-ine.ch/v1/resources'
      + '?searchstr=' + encodeURIComponent(label)
      + '&restype_id=' + encodeURIComponent(resourceClassIRI)
      + '&' + this.basicAuthentication );
  }

  /**
   * Delete a resource on a Knora server
   * @param {string} resourceIRI  The IRI of the resource that will be deleted
   * @returns {Observable<Object>}  The Knora V1 response
   */
  deleteResource(resourceIRI: string) {
    return this.httpClient.delete(this.instanceAddress + '/v1/resources/'
      + encodeURIComponent(resourceIRI)
      + '?' + this.basicAuthentication,
      this.httpOptions );
  }

  /**
   * Change the label of a resource on a Knora server
   * @param {string} resourceIRI  The IRI if the resource whose label will change
   * @param resourceParams  the new label as { 'label': <new text> }
   * @returns {Observable<Object>}  The Knora V1 response
   */
  changeResourceLabel(resourceIRI: string, resourceParams) {
    return this.httpClient.put(this.instanceAddress + '/v1/resources/label/'
      + encodeURIComponent(resourceIRI)
      + '?' + this.basicAuthentication,
      resourceParams,
      this.httpOptions );
  }

  /**
   * Write a new resource on a Knora server
   * @param resourceParams  The parameters as described in the Knora docs
   * @returns {Observable<Object>}  The Knora V1 response containing the new resource IRI
   */
  postResource(resourceParams) {
    return this.httpClient.post(this.instanceAddress + '/v1/resources'
      + '?' + this.basicAuthentication,
      resourceParams,
      this.httpOptions );
  }

  /**
   * Delete a property value from a resource
   * @param {string} valueIRI  The IRI of the value that will be deleted
   * @returns {Observable<Object>}  The Knora V1 response
   */
  deletePropertyValue(valueIRI: string) {
    return this.httpClient.delete(this.instanceAddress + '/v1/values/'
      + encodeURIComponent(valueIRI)
      + '?' + this.basicAuthentication,
      this.httpOptions );
  }

  /**
   * Add a property value to a resource
   * @param resourceParams  The parameters as described in the Knora docs
   * @returns {Observable<Object>} the Knora V1 response
   */
  postPropertyValue(resourceParams) {
    return this.httpClient.post( this.instanceAddress + '/v1/values'
      + '?' + this.basicAuthentication,
      resourceParams,
      this.httpOptions );
  }

  /**
   * Change a property value of a resource
   * @param {string} valueIRI  The IRI of the value that will change
   * @param resourceParams  The parameters as described in the Knora docs
   * @returns {Observable<Object>}  The Knora V1 response
   */
  changePropertyValue(valueIRI: string, resourceParams) {
    return this.httpClient.put(this.instanceAddress + '/v1/values/'
      + encodeURIComponent(valueIRI)
      + '?' + this.basicAuthentication,
      resourceParams,
      this.httpOptions );
  }

  /**
   * Get the data of a property value
   * @param {string} valueIRI  The IRI of the requested property value
   * @returns {Observable<Object>}  The Knora V1 response containing the data about the value
   */
  getPropetyValue(valueIRI: string) {
    return this.httpClient.get(this.instanceAddress + '/v1/values/'
      + encodeURIComponent(valueIRI)
      + '?' + this.basicAuthentication );
  }

  /**
   * Get the change history of a property value
   * @param {string} resourceIRI  The IRI of the resource that property value belongs to
   * @param {string} propertyTypeIRI  The IRI of the type this property value has
   * @param {string} valueIRI  The IRI of the property value
   * @returns {Observable<Object>}  The Knora V1 response with the change dates and previous valueIRIs
   */
  getPropertyValueHistory(resourceIRI: string, propertyTypeIRI: string, valueIRI: string) {
    return this.httpClient.get(this.instanceAddress + '/v1/values/history/'
      + encodeURIComponent(resourceIRI)
      + '/' + encodeURIComponent(propertyTypeIRI)
      + '/' + encodeURIComponent(valueIRI)
      + '?' + this.basicAuthentication );
  }
}
