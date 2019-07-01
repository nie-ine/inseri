import { Component, OnInit } from '@angular/core';

import { PAGETRANSCRIPTION } from './page-transcription';
import { IIIFImage } from '../../../shared/IIIFImage';
import { JoinedTextViewRoot } from '../../../joined-text-view/joined-text-view/joined-text-view.component';

/**
 * This component shows the use of the text components.
 * It can be deleted after development.
 */
@Component({
  selector: 'app-text-dev-view',
  templateUrl: './text-dev-view.component.html',
  styleUrls: ['./text-dev-view.component.scss']
})
export class TextDevViewComponent implements OnInit {

  /**
   * Tree of the transcription of a page.
   * TODO typing.
   */
  pageTranscription;

  /**
   * The opacity of the image.
   * 1 is full color, 0 means the image is invisible.
   */
  imageOpacity = 1;

  /**
   * True means the whole transcription is visible. False means the Transcription is invisible.
   */
  showWords = false;

  /**
   * True means the highlighted word is shown with transcription. False means only the region will light up.
   */
  showHighlightedWord = true;

  /**
   * Test data for text components.
   */
  testData = {
    lineGroupId: '1.1',
    lineGroupIri: 'cfugiuzoihjl',
    lines: [
      {
        lineId: '1.1.1',
        lineIri: 'bhjbljbjhl',
        textIri: 'Eiris%20 sazun%20 idisi%2C%20 sazun%20hera%20duoder',
        iriOfMargin: 'fussnoten%20 hier% 20als%20test jkbjjk jk'
      },
      {
        lineId: '1.1.2',
        lineIri: 'ydfgasfg',
        textIri: 'suma%20hapt%20 heptidun%2C%20suma%20 heri%20lezidun'
      },
      {
        lineId: '1.1.3',
        lineIri: 'hbugzuou',
        textIri: 'suma%20clubodun%20 umbi%20cuoniouuidi%3A'
      },
      {
        lineId: '1.1.4',
        lineIri: 'adsfgFASDGDF',
        textIri: 'insprinc%20haptbandun%2C%20 inuar%20uigandun.'
      }
    ]
  };

  /**
   * Test data for text view.
   */
  testDataForPage = {
    pageId: '56v',
    pageIri: 'algadsadf',
    pageHeight: 180,
    pageWidth: 200,
    lines: [
      {
        lineId: '1',
        lineIri: 'adfsgca',
        words: [
          {
            wordIri: 'sdfbsdf',
            textIri: 'Lorem346',
            ulx: 20,
            uly: 20,
            lrx: 50,
            lry: 40
          },
          {
            wordIri: 'dafsd',
            textIri: 'ipsum869',
            ulx: 55,
            uly: 20,
            lrx: 75,
            lry: 40
          },
          {
            wordIri: 'dfhsfh',
            textIri: 'dolor453425',
            ulx: 80,
            uly: 20,
            lrx: 120,
            lry: 40
          },
          {
            wordIri: 'hkjbhj',
            textIri: 'sit78',
            ulx: 125,
            uly: 20,
            lrx: 160,
            lry: 40
          },
          {
            wordIri: 'kjönö',
            textIri: 'amet654',
            ulx: 180,
            uly: 20,
            lrx: 240,
            lry: 40
          }
        ]
      },
      {
        lineId: '2',
        lineIri: 'hjkbjhbj',
        words: [
          {
            wordIri: 'xcybk',
            textIri: 'consectetur343',
            ulx: 20,
            uly: 48,
            lrx: 50,
            lry: 80
          },
          {
            wordIri: 'dafybxffsdk',
            textIri: 'apipisici463',
            ulx: 60,
            uly: 50,
            lrx: 90,
            lry: 80
          },
          {
            wordIri: 'xcvb',
            textIri: 'elit765',
            ulx: 100,
            uly: 50,
            lrx: 110,
            lry: 80
          },
          {
            wordIri: 'nx-cvbxc',
            textIri: 'sed89',
            ulx: 120,
            uly: 50,
            lrx: 150,
            lry: 85
          }
        ]
      },
      {
        lineId: '3',
        lineIri: '6dfgvxdg',
        words: [
          {
            wordIri: 'xcyb',
            textIri: 'eisumod78',
            ulx: 20,
            uly: 100,
            lrx: 50,
            lry: 120
          },
          {
            wordIri: 'dafybxffsd',
            textIri: 'tempor75',
            ulx: 60,
            uly: 100,
            lrx: 75,
            lry: 120
          },
          {
            wordIri: '76899',
            textIri: 'incidunt98',
            ulx: 80,
            uly: 100,
            lrx: 100,
            lry: 120
          },
          {
            wordIri: 'bhjguz',
            textIri: 'ut89',
            ulx: 120,
            uly: 100,
            lrx: 150,
            lry: 120
          },
          {
            wordIri: 'njguouoz',
            textIri: 'labore789',
            ulx: 160,
            uly: 100,
            lrx: 180,
            lry: 120
          }
        ]
      },
      {
        lineId: '4',
        lineIri: 'sdgasdf',
        words: [
          {
            wordIri: 'mnnm.nm',
            textIri: 'et3567',
            ulx: 30,
            uly: 130,
            lrx: 50,
            lry: 150
          },
          {
            wordIri: 'jnbjn',
            textIri: 'dolore658465',
            ulx: 60,
            uly: 130,
            lrx: 85,
            lry: 150
          },
          {
            wordIri: 'bhjkjjk',
            textIri: 'magna890890',
            ulx: 95,
            uly: 130,
            lrx: 110,
            lry: 150
          },
          {
            wordIri: 'bljbljb',
            textIri: 'aliqua.6878',
            ulx: 120,
            uly: 130,
            lrx: 140,
            lry: 150
          },
          {
            wordIri: 'nmmnbjklnmbj',
            textIri: 'Ut678',
            ulx: 150,
            uly: 130,
            lrx: 170,
            lry: 150
          }
        ]
      }
    ]
  };

  /**
   * ID of the word the mouse is on.
   */
  hoveredWord: string;

  /**
   * ID of the word that was clicked last.
   */
  clickedWord: string;

  /**
   * Image data of the image, for svg-text-view
   */
  imageSource = new IIIFImage('https://www.e-manuscripta.ch/zuz/i3f/v20/1510618/full/full/0/default.jpg', 3062, 4034 );

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
        lineparts: {
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
          lineparts: {
            propertyIri: 'http://api.knora.org/ontology/shared/concept/simple/v2#informationHasSubject',
            propertyDirection: 'direct',
            contentPropertyIri: 'http://api.knora.org/ontology/shared/text/simple/v2#hasName',
            hoverable: true,
            clickable: true
          }
        }
      }
    }
  };

  /**
   * default written by angular-cli
   */
  constructor() { }

  /**
   * Initialize with data.
   */
  ngOnInit() {
    this.pageTranscription = PAGETRANSCRIPTION;
  }

}
