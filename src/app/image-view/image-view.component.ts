import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {

  constructor() { }

  viewerWidth = 300;

  // picture data like received from Knora
  picData = {
    duration: 0,
    format_name: 'JPEG2000',
    fps: 0,
    nx: 5184,
    ny: 3456,
    origname: '/path/to/the/images/NB/NB_1979_82/A-5-h_01_003.jpg',
    path: 'https://tools.wmflabs.org/zoomviewer/proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg/pct:65,81,35,15/full/0/default.jpg',
    protocol: 'file'
  };

  picData2 = {
    '@id' : 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/gJVf-AQjSbSTAo8EsU8ErQ',
    '@type' : 'knora-api:StillImageFileValue',
    'knora-api:fileValueAsUrl' : 'https://tools.wmflabs.org/zoomviewer/proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg/pct:65,81,35,15/full/0/default.jpg',
    'knora-api:fileValueHasFilename' : 'proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg',
    'knora-api:fileValueIsPreview' : false,
    'knora-api:stillImageFileValueHasDimX' : 5184,
    'knora-api:stillImageFileValueHasDimY' : 3456,
    'knora-api:stillImageFileValueHasIIIFBaseUrl' : 'https://tools.wmflabs.org/zoomviewer'
  };

  ngOnInit() {
  }

}
