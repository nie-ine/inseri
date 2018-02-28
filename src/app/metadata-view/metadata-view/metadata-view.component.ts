import { Component, OnInit } from '@angular/core';
import { SubjectTag } from '../tag-chips/tag-chips/tag';

@Component({
  selector: 'app-metadata-view',
  templateUrl: './metadata-view.component.html',
  styleUrls: ['./metadata-view.component.scss']
})
export class MetadataViewComponent implements OnInit {

  // Answer from Knora v2: propInput is the content from "schema:itemListElement"
  propInput = {
    'kuno-raeber:containsEarlierStagesOfManuscriptConvoluteValue' : {
      '@id' : 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/qc2V1PW8TwWFpioYieRYkw',
      '@type' : 'knora-api:LinkValue',
      'knora-api:linkValueHasTarget' : {
        '@id' : 'http://rdfh.ch/kuno-raeber/T8GfzJfnQeG6CKnaMgC2nw',
        '@type' : 'kuno-raeber:PoemManuscriptConvolute',
        'schema:name' : 'PoemManuscriptConvolute-12'
      }
    },
    'kuno-raeber:containsEarlierStagesOfTypescriptConvoluteValue' : {
      '@id' : 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/JFV8ymzuT8yyJ8StmXhz_g',
      '@type' : 'knora-api:LinkValue',
      'knora-api:linkValueHasTarget' : {
        '@id' : 'http://rdfh.ch/kuno-raeber/4JuKqtzySDe6WZ4S88Ho9w',
        '@type' : 'kuno-raeber:PoemTypescriptConvolute',
        'schema:name' : 'PoemTypescriptConvolute-43'
      }
    },
    'text:containsEarlierStagesOfPublicationValue' : {
      '@id' : 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/KfbUk0g3R9aIUG6XrrQX0Q',
      '@type' : 'knora-api:LinkValue',
      'knora-api:linkValueHasTarget' : {
        '@id' : 'http://rdfh.ch/kuno-raeber/7lEoDz4ITAKCHaDrkjs5Yg',
        '@type' : 'kuno-raeber:PrintedPoemBookPublication',
        'schema:name' : 'PrintedPoemBookPublication-9'
      }
    },
    'text:hasAlias' : {
      '@id' : 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/KSzvKntUS3GvARVsrAONSg',
      '@type' : 'knora-api:TextValue',
      'knora-api:valueAsString' : 'notizbuch-1979'
    },
    'text:hasCarrierDescription' : {
      '@id' : 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/7WCER86MTbmdikkh-lBzGg',
      '@type' : 'knora-api:TextValue',
      'knora-api:valueAsString' : 'Grünes Notizbuch, grau-schwarze Tinte'
    }
  };

  // List of properties for the fact-sheet plus the label. The order is the one displayed in the component.
  labelInput = [{
    'prop': 'text:hasAlias', 'label': 'Alias'
  }, {
    'prop': 'text:hasCarrierDescription', 'label': 'Textträger'
  }, {
    'prop': 'text:containsEarlierStagesOfPublicationValue', 'label': 'Spätere Drucke', 'indirectProp': 'text:hasConvoluteTitle'
  }];

  tagInput: Array<SubjectTag> = [];

  tagData = [
    {'linkpart': 'a', 'tagName': 'Ameisen'},
    {'linkpart': 'b', 'tagName': 'Baeume'},
    {'linkpart': 'c', 'tagName': 'Christentum'}
    ];

  constructor() { }

  ngOnInit() {
    for (let d = 0; d < this.tagData.length; d++) {
      this.tagInput.push(new SubjectTag(this.tagData[d].linkpart, d.toString(), this.tagData[d].tagName));
    }
  }

}
