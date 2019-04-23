import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-p0041-strophe',
  templateUrl: './p0041-strophe.component.html',
  styleUrls: ['./p0041-strophe.component.scss']
})
export class P0041StropheComponent implements OnChanges {

  @Input() resourceIRI;
  @Input() backendAddress;
  basicAuthentication = 'email=root%40example.com&password=test'; // TODO: integrate into login framework

  stropheTextData: any;
  stropheData: any;
  stanzaData: any;

  constructor(private http: HttpClient) { }

  ngOnChanges() {
    console.log(this.backendAddress);
    if (this.resourceIRI && this.backendAddress) {
      this.getStropheTextTree();
      this.getStropheData();
    }
  }

  getStropheTextTree() {

    this.http.post(this.backendAddress + '/v2/searchextended?' + this.basicAuthentication,
      'PREFIX atharvaveda: <http://0.0.0.0:3333/ontology/0041/atharvaveda/simple/v2#>\n' +
      'PREFIX text: <http://api.knora.org/ontology/shared/text/simple/v2#>\n' +
      'PREFIX text-structure: <http://api.knora.org/ontology/shared/text-structure/simple/v2#>\n' +
      'PREFIX literature: <http://api.knora.org/ontology/shared/literature/simple/v2#>\n' +
      'PREFIX linguistics: <http://api.knora.org/ontology/shared/linguistics/simple/v2#>\n' +
      'PREFIX language: <http://api.knora.org/ontology/shared/language/simple/v2#>\n' +
      'PREFIX concept: <http://api.knora.org/ontology/shared/concept/simple/v2#>\n' +
      'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n' +
      'PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n' +
      '\n' +
      'CONSTRUCT {\n' +
      '  ?strophe knora-api:isMainResource true .\n' +
      '  ?halfstrophe text-structure:isPartOfTextExpression ?strophe .\n' +
      '  ?verse atharvaveda:isVerseOfHalfStrophe ?halfstrophe .\n' +
      '  ?verse linguistics:hasComment ?versemetrics .\n' +
      '  ?word text-structure:isWordOfVerse ?verse .\n' +
      '  ?word concept:informationHasSubject ?padaword .\n' +
      '  ?padaword text:hasName ?padacontent .\n' +
      '} WHERE {\n' +
      '  BIND(<' + this.resourceIRI + '> AS ?strophe)\n' +
      '  ?strophe a atharvaveda:Strophe .\n' +
      '  ?halfstrophe a atharvaveda:HalfStrophe .\n' +
      '  ?halfstrophe text-structure:isPartOfTextExpression ?strophe .\n' +
      '  ?verse a atharvaveda:Verse .\n' +
      '  ?verse atharvaveda:isVerseOfHalfStrophe ?halfstrophe .\n' +
      '  OPTIONAL { ?verse linguistics:hasComment ?versemetrics . }\n' +
      '  ?word a text-structure:Word .\n' +
      '  ?word text-structure:isWordOfVerse ?verse .\n' +
      '  OPTIONAL { ?word concept:informationHasSubject ?padaword .\n' +
      '  ?padaword text:hasName ?padacontent . } \n' +
      '}'
    ).subscribe(d => {

      const halfStrophes = [];
      let h: any;
      if (this.isArray(d['knora-api:hasIncomingLinkValue'])) {
        h = d['knora-api:hasIncomingLinkValue'];
      } else {
        h = [d['knora-api:hasIncomingLinkValue']];
      }

      for (let i = 0; i < h.length; i++ ) {

        const verses = [];
        let v: Array<any>;
        if (this.isArray(h[i]['knora-api:linkValueHasSource']['knora-api:hasIncomingLinkValue'])) {
          v = h[i]['knora-api:linkValueHasSource']['knora-api:hasIncomingLinkValue'];
        } else {
          v = [h[i]['knora-api:linkValueHasSource']['knora-api:hasIncomingLinkValue']];
        }

        for (let j = 0; j < v.length; j++ ) {

          const samhitawords = [];
          let s: Array<any>;
          if (this.isArray(v[j]['knora-api:linkValueHasSource']['knora-api:hasIncomingLinkValue'])) {
            s = v[j]['knora-api:linkValueHasSource']['knora-api:hasIncomingLinkValue'];
          } else {
            s = [v[j]['knora-api:linkValueHasSource']['knora-api:hasIncomingLinkValue']];
          }

          for (let k = 0; k < s.length; k++ ) {

            const padapathawords = [];
            let p: Array<any>;
            if (this.isArray(
              s[k]['knora-api:linkValueHasSource']['http://api.knora.org/ontology/shared/concept/v2#informationHasSubjectValue'])) {
              p = s[k]['knora-api:linkValueHasSource']['http://api.knora.org/ontology/shared/concept/v2#informationHasSubjectValue'];
            } else {
              p = [s[k]['knora-api:linkValueHasSource']['http://api.knora.org/ontology/shared/concept/v2#informationHasSubjectValue']];
            }

            for (let l = 0; l < p.length; l++ ) {
              if (
                p[l]
                && p[l]['knora-api:linkValueHasTarget']
                && p[l]['knora-api:linkValueHasTarget']['@type'] === 'http://api.knora.org/ontology/shared/concept/v2#Concept'
              ) {
                padapathawords.push(p[l]['knora-api:linkValueHasTarget']);
              }
            }
            if (s[k]['knora-api:linkValueHasSource']['@type'] === 'http://api.knora.org/ontology/shared/text-structure/v2#Word') {
              samhitawords.push({'padawords': padapathawords,
              'id': s[k]['knora-api:linkValueHasSource']['@id']});
            }
          }
          let metric;
          if (v[j]['knora-api:linkValueHasSource']['http://api.knora.org/ontology/shared/linguistics/v2#hasComment']
            && v[j]['knora-api:linkValueHasSource']['http://api.knora.org/ontology/shared/linguistics/v2#hasComment']['knora-api:valueAsString']) {
            metric = v[j]['knora-api:linkValueHasSource']['http://api.knora.org/ontology/shared/linguistics/v2#hasComment']['knora-api:valueAsString'];
          }
          if (v[j]['knora-api:linkValueHasSource']['@type'] === 'atharvaveda:Verse') {
            verses.push({'samhitawords': samhitawords,
            'metric': metric});
          }
        }
        if (h[i]['knora-api:linkValueHasSource']['@type'] === 'atharvaveda:HalfStrophe') {
          halfStrophes.push({'verses': verses});
        }
      }
      this.stropheTextData = halfStrophes;
    }, error1 => {
      console.log(error1);
    });
  }

  getStropheData() {
    this.http.get(this.backendAddress + '/v2/resources/' + encodeURIComponent(this.resourceIRI) + '?' + this.basicAuthentication)
      .subscribe(d => {
        this.stropheData = d;
      }, error1 => {
        console.log(error1);
      });
  }

  isArray(toBeChecked) {
    return Array.isArray(toBeChecked);
  }
}
