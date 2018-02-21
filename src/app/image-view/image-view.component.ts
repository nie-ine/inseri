import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {

  constructor() {
  }

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
    '@id': 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/gJVf-AQjSbSTAo8EsU8ErQ',
    '@type': 'knora-api:StillImageFileValue',
    'knora-api:fileValueAsUrl': 'https://tools.wmflabs.org/zoomviewer/proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg/pct:65,81,35,15/full/0/default.jpg',
    'knora-api:fileValueHasFilename': 'proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg',
    'knora-api:fileValueIsPreview': false,
    'knora-api:stillImageFileValueHasDimX': 5184,
    'knora-api:stillImageFileValueHasDimY': 3456,
    'knora-api:stillImageFileValueHasIIIFBaseUrl': 'https://tools.wmflabs.org/zoomviewer'
  };

  regions = [{
    'status': 'active',
    'lineColor': '#ff3333',
    'lineWidth': 2,
    'points': [
      {'x': 0.10596026490066225, 'y': 0.2199074074074074},
      {'x': 0.6390728476821192, 'y': 0.2175925925925926},
      {'x': 0.6390728476821192, 'y': 0.7314814814814815},
      {'x': 0.10264900662251655, 'y': 0.7337962962962963},
      {'x': 0.10927152317880795, 'y': 0.2199074074074074}
    ],
    'type': 'polygon'
  }, {
    'status': 'active',
    'lineColor': '#ff3333',
    'lineWidth': 2,
    'points': [
      {'x': 0.18505338078291814, 'y': 0.16203703703703703},
      {'x': 0.8185053380782918, 'y': 0.7199074074074074}
    ],
    'type': 'rectangle'
  }, {
    'status': 'active',
    'lineColor': '#3333ff',
    'lineWidth': 2,
    'points': [
      {'x': 0.3400735294117647, 'y': 0.45376078914919854}
      ],
    'type': 'circle',
    'radius': {'x': 0.04595588235294118, 'y': 0.03082614056720101},
    'original_index': 1
  }];

  ngOnInit() {
  }

}
