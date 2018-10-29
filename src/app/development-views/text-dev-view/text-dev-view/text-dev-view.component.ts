import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-dev-view',
  templateUrl: './text-dev-view.component.html',
  styleUrls: ['./text-dev-view.component.scss']
})
export class TextDevViewComponent implements OnInit {

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

  hoveredWord: string;
  clickedWord: string;

  constructor() { }

  ngOnInit() {
  }

}
