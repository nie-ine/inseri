import { Injectable } from '@angular/core';
import { JoinedTextElement } from './joined-text-view/joined-text-view.component';

@Injectable({
  providedIn: 'root'
})
export class JoinedTextViewKnoraRequestService {

  constructor() { }

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

    graveSearchRequest = graveSearchRequest + constructPart + wherePart + '}';
    return graveSearchRequest;
  }
}
