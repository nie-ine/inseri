import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JoinedTextElement } from '../joined-text-view/joined-text-view/joined-text-view';

/**
 * This service deals with requests to the Knora V2 API and centralizes parameters for it.
 */
@Injectable()
export class HierarchicalNavigationRequestService {

  basicAuthentication = 'email=root%40example.com&password=test'; // TODO: integrate into login framework

  // create authentication data for posting
  // TODO: use services
  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
  };

  constructor(private httpClient: HttpClient) { }

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

  getGravSearch(configuration: JoinedTextElement, parentIri, offset): string {

    let graveSearchRequest =
      'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n' +
      'PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n' +
      '\n';

    let constructPart = 'CONSTRUCT {\n  ?res knora-api:isMainResource true .\n';
    let wherePart = '} WHERE {\n';

    if (configuration.contentProperty && configuration.contentProperty === 'self') {
      constructPart = constructPart + '  ?res <' + configuration.propertyIri + '> ?rescontent .\n';
      wherePart = wherePart + ' BIND(<' + parentIri + '> AS ?res) ';
      wherePart = wherePart + '  ?res <' + configuration.propertyIri + '> ?rescontent .\n';


    } else {
      if (configuration.propertyDirection === 'inverted') {
        wherePart = wherePart + '  ?res <' + configuration.propertyIri + '> <' + parentIri + '> .\n';
      } else if (configuration.propertyDirection === 'direct') {
        wherePart = wherePart + '  <' + parentIri + '> <' + configuration.propertyIri + '> ?res .\n';
      }

      if (configuration.contentPropertyIri) {
        constructPart = constructPart + '  ?res <' + configuration.contentPropertyIri + '> ?rescontent .\n';
        wherePart = wherePart + '  ?res <' + configuration.contentPropertyIri + '> ?rescontent .\n';
      }
    }

    if (configuration.sortByPropertyIri) {
      wherePart = wherePart + '  ?res <' + configuration.sortByPropertyIri + '> ?sortingprop .\n';
    }

    graveSearchRequest = graveSearchRequest + constructPart + wherePart + '}';
    if (configuration.sortByPropertyIri) {
      graveSearchRequest = graveSearchRequest + ' ORDER BY ?sortingprop';
    }
    graveSearchRequest = graveSearchRequest + ' OFFSET ' + offset;

    return graveSearchRequest;
  }

}
