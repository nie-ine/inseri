import { Component, OnInit } from '@angular/core';
import { JoinedTextBlock } from '../joined-text-block/joined-text-block.component';
import { JoinedTextLine } from '../joined-text-line/joined-text-line.component';

export interface JoinedTextElement {
  propertyIri: string;
  propertyDirection: string;
  contentPropertyIri?: string;
  contentProperty?: string;
}

export interface JoinedTextViewRoot {
  blocks?: JoinedTextBlock;
  lines?: JoinedTextLine;
}

@Component({
  selector: 'app-joined-text-view',
  templateUrl: './joined-text-view.component.html',
  styleUrls: ['./joined-text-view.component.scss']
})
export class JoinedTextViewComponent implements OnInit {

  // Input()
  backendAddress = 'http://localhost:3333';

  // Input()
  textRootIri = 'http://rdfh.ch/0041/WA9dphq9RpmXkq5nSo6q3Q';


  textConfiguration1: JoinedTextViewRoot = {
    blocks: {
      propertyIri: 'http://api.knora.org/ontology/shared/text-structure/simple/v2#isPartOfTextExpression',
      propertyDirection: 'inverted',
      lines: {
        propertyIri: 'http://0.0.0.0:3333/ontology/0041/atharvaveda/simple/v2#isVerseOfHalfStrophe',
        propertyDirection: 'inverted',
        words: {
          propertyIri: 'http://api.knora.org/ontology/shared/text-structure/simple/v2#isWordOfVerse',
          propertyDirection: 'inverted',
          contentPropertyIri: 'http://api.knora.org/ontology/shared/language/simple/v2#hasContent'
        },
        farfarright: {
          propertyIri: 'http://api.knora.org/ontology/shared/linguistics/simple/v2#hasComment',
          propertyDirection: 'direct',
          contentProperty: 'self'
        }
      }
    }
  };

  // Input()
  textConfiguration2: JoinedTextViewRoot = {
    lines: {
      propertyIri: 'http://api.knora.org/ontology/shared/text-structure/simple/v2#isPartOfTextExpression',
      propertyDirection: 'inverted',
      interfix: ' | ',
      suffix: ' || ',
      lineparts: {
        propertyIri: 'http://0.0.0.0:3333/ontology/0041/atharvaveda/simple/v2#isVerseOfHalfStrophe',
        propertyDirection: 'inverted',
        interfix: ' \' ',
        lineparts: {
          propertyIri: 'http://api.knora.org/ontology/shared/text-structure/simple/v2#isWordOfVerse',
          propertyDirection: 'inverted',
          interfix: ' ',
          words: {
            propertyIri: 'http://api.knora.org/ontology/shared/concept/simple/v2#informationHasSubject',
            propertyDirection: 'direct',
            contentPropertyIri: 'http://api.knora.org/ontology/shared/text/simple/v2#hasName'
          }
        }
      }
    }
  };

  // TODO:
  // - Include all input for HTML-Viewer
  // - Include a component for columns
  // - Include sorting
  // - Split between example and reusable components
  // - Turn into app
  // - Enable click and mouseover events


  // queryParam
  highlightedKeys;

  constructor() { }

  ngOnInit() {
  }

}
