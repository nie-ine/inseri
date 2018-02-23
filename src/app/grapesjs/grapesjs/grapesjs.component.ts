import {Component, NgModule, VERSION} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Popup} from './popup';

@Component({
  selector: 'my-app',
  templateUrl: `grapesjs.component.html`,
})
export class GrapesjsComponent {
  image = {
    '@id' : 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/gJVf-AQjSbSTAo8EsU8ErQ',
    '@type' : 'knora-api:StillImageFileValue',
    'knora-api:fileValueAsUrl' :
      'https://tools.wmflabs.org/' +
      'zoomviewer/proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg/pct:65,81,35,15/full/0/default.jpg',
    'knora-api:fileValueHasFilename' : 'proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg',
    'knora-api:fileValueIsPreview' : false,
    'knora-api:stillImageFileValueHasDimX' : 5184,
    'knora-api:stillImageFileValueHasDimY' : 3456,
    'knora-api:stillImageFileValueHasIIIFBaseUrl' : 'https://tools.wmflabs.org/zoomviewer'
  }
  showPopup1: boolean;
  showPopup2: boolean;
  constructor() {
  }
  showPopup(num: number) {
    this["showPopup" + num] = true;
  }
}
