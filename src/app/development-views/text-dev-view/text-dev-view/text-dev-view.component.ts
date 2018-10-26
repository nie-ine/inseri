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
    lines: [
      {
        lineId: '1',
        lineIri: 'adfsgca',
        words: [
          {
            wordIri: 'sdfbsdf',
            textIri: 'Lorem346'
          },
          {
            wordIri: 'dafsd',
            textIri: 'ipsum869'
          },
          {
            wordIri: 'dfhsfh',
            textIri: 'dolor453425'
          },
          {
            wordIri: 'hkjbhj',
            textIri: 'sit78'
          },
          {
            wordIri: 'kjönö',
            textIri: 'amet654'
          }
        ]
      },
      {
        lineId: '2',
        lineIri: 'hjkbjhbj',
        words: [
          {
            wordIri: 'xcybk',
            textIri: 'consectetur343'
          },
          {
            wordIri: 'dafybxffsdk',
            textIri: 'apipisici463'
          },
          {
            wordIri: 'xcvb',
            textIri: 'elit765'
          },
          {
            wordIri: 'nx-cvbxc',
            textIri: 'sed89'
          }
        ]
      },
      {
        lineId: '3',
        lineIri: '6dfgvxdg',
        words: [
          {
            wordIri: 'xcyb',
            textIri: 'eisumod78'
          },
          {
            wordIri: 'dafybxffsd',
            textIri: 'tempor75'
          },
          {
            wordIri: '76899',
            textIri: 'incidunt98'
          },
          {
            wordIri: 'bhjguz',
            textIri: 'ut89'
          },
          {
            wordIri: 'njguouoz',
            textIri: 'labore789'
          }
        ]
      },
      {
        lineId: '4',
        lineIri: 'sdgasdf',
        words: [
          {
            wordIri: 'mnnm.nm',
            textIri: 'et3567'
          },
          {
            wordIri: 'jnbjn',
            textIri: 'dolore658465'
          },
          {
            wordIri: 'bhjkjjk',
            textIri: 'magna890890'
          },
          {
            wordIri: 'bljbljb',
            textIri: 'aliqua.6878'
          },
          {
            wordIri: 'nmmnbjklnmbj',
            textIri: 'Ut678'
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
