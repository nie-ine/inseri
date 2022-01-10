import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

class JoinedTextElement {
  /** The property that links the lines to their parent */
  propertyIri: string;

  /** 'inverted' if the child links to the parent else 'direct' */
  propertyDirection: string;

  /** If sorting is needed, to by the value of this property */
  sortByPropertyIri?: string;

  /** The identifier that leads to the literal content for this resource. */
  contentPropertyIri?: string;

  /** 'self' if the chosen part is already a text value. */
  contentProperty?: string;
}

/**
 * This service deals with requests to the Knora V2 API and centralizes parameters for it.
 */
@Injectable()
export class HierarchicalNavigationRequestService {

  /**
   * Basic credentials to smoothen CORS requests
   */
  basicAuthentication = 'email=root%40example.com&password=test'; // TODO: integrate into login framework

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

  /**
   * Form a Gravsearch (subset of SPARQL) query depending on the configuration in the respecitve component input.
   * @param configuration  The way the component is related to its parent and how it interacts graphically and mouse input.
   * @param parentIri  The IRI of the parent resource, e.g. in the case of lines, the block, they belong to.
   * @param offset  Offset for paged loading (see Knora documentation)
   */
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
