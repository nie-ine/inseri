import { Injectable } from '@angular/core';
import { JoinedTextElement } from './joined-text-view/joined-text-view';

@Injectable({
  providedIn: 'root'
})
export class JoinedTextViewKnoraRequestService {

  constructor() { }

  /**
   * Form a Gravsearch (subset of SPARQL) query depending on the configuration in the respecitve component input.
   * @param configuration  The way the component is related to its parent and how it interacts graphically and mouse input.
   * @param parentIri  The IRI of the parent resource, e.g. in the case of lines, the block, they belong to.
   */
  getGravSearch(configuration: JoinedTextElement, parentIri): string {

    let graveSearchRequest =
      'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n' +
      'PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n' +
      '\n';

    let constructPart = 'CONSTRUCT {\n  ?res knora-api:isMainResource true .\n';
    let wherePart = '} WHERE {\n';

    if (configuration.contentProperty === 'self') {
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

    return graveSearchRequest;
  }
}
