import {
  Component, Input, OnInit, OnChanges, SimpleChange, ElementRef, OnDestroy
} from '@angular/core';

// This component needs the openseadragon library itself, as well as the openseadragon plugin openseadragon-svg-overlay
// Both libraries are installed via package.json, and loaded globally via the script tag in .angular-cli.json

// OpenSeadragon does not export itself as ES6/ECMA2015 module,
// it is loaded globally in scripts tag of angular-cli.json,
// we still need to declare the namespace to make TypeScript compiler happy.
declare let OpenSeadragon: any;


@Component({
  selector: 'app-image-frame',
  templateUrl: './image-frame.component.html',
  styleUrls: ['./image-frame.component.css']
})
export class ImageFrameComponent implements OnInit, OnChanges, OnDestroy {

  @Input() image: any;
  @Input() width: number;
  @Input() height: number;

  private viewer;

  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['image'] && changes['image'].isFirstChange()) {
      console.log(this.image);
      this.setupViewer();
    }
    if (changes['image']) {
      this.openImage();
    }
  }

  ngOnInit() {
    // initialisation is done on first run of ngOnChanges
  }

  ngOnDestroy() {
    if (this.viewer) {
      this.viewer.destroy();
      this.viewer = undefined;
    }
  }

  private setupViewer(): void {
    const viewerContainer = this.elementRef.nativeElement.getElementsByClassName('osdViewerContainer')[0];
    const osdOptions = {
      element: viewerContainer,
      prefixUrl: '//openseadragon.github.io/openseadragon/images/',
      sequenceMode: false,
      showNavigator: false,
      defaultZoomLevel: 1,
      minZoomImageRatio: 1
    };
    this.viewer = new OpenSeadragon.Viewer(osdOptions);
  }

  private openImage(): void {

    const domain = this.image.path.split('/')[2];
    const pathToDB = this.image.path.split('/')[3];
    const filename = this.image.path.split('/')[4];

    const sipiBasePath = 'http://' + domain + '/' + pathToDB + '/' + filename;

    const tileSource = {
      'tileSource': {
        '@context': 'http://iiif.io/api/image/2/context.json',
        '@id': sipiBasePath,
        'height': this.image.ny,
        'width': this.image.nx,
        'profile': ['http://iiif.io/api/image/2/level2.json'],
        'protocol': 'http://iiif.io/api/image',
        'tiles': [{
          'scaleFactors': [1, 2, 4, 8, 16, 32],
          'width': 1024
        }]
      },
      'x': 0,
      'y': 0
    };

    this.viewer.open([tileSource]);
  }

}
