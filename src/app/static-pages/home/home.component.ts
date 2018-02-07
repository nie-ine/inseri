import { Component, OnInit } from '@angular/core';

declare let OpenSeadragon: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  ngOnInit() {
  }

}
