import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange} from "@angular/core";
import { RegionToSvgService } from '../region-to-svg.service';


// This component needs the openseadragon library itself, as well as the openseadragon plugin openseadragon-svg-overlay
// Both libraries are installed via package.json, and loaded globally via the script tag in .angular-cli.json

// OpenSeadragon does not export itself as ES6/ECMA2015 module,
// it is loaded globally in scripts tag of angular-cli.json,
// we still need to declare the namespace to make TypeScript compiler happy.
declare let OpenSeadragon: any;

class IIIFImage {

  scheme = 'https';
  server: string;
  prefix: string;
  identifier: string;

  height: number;
  width: number;

  constructor(imageUrl: string, width: number, height: number) {
    this.height = height;
    this.width = width;

    const urlParts = imageUrl.split('/');

    this.scheme = urlParts[0];
    this.server = urlParts[2];
    this.identifier = urlParts[urlParts.length - 5];

    this.prefix = '';
    for (let i = 3; i < urlParts.length - 5; i++) {
      this.prefix = this.prefix + '/' + urlParts[i];
    }
  }

  tileSource() {

    return {
      'tileSource': {
        '@context': 'http://iiif.io/api/image/2/context.json',
        '@id': this.scheme + '//' + this.server + this.prefix + '/' + this.identifier,
        'height': this.height,
        'width': this.width,
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
  }
}


@Component({
  selector: 'app-image-with-overlay',
  templateUrl: './image-with-overlay.component.html',
  styleUrls: ['./image-with-overlay.component.scss']
})
export class ImageWithOverlayComponent implements OnInit, OnChanges, OnDestroy {

  // @Input() image: IIIFImage;
  @Input() iiifImagePath: string;
  @Input() maxImageWidth: number;
  @Input() maxImageHeight: number;
  @Input() regions: any;
  @Input() width: number;
  @Input() height: number;
  @Output() hoveredRegion = new EventEmitter();
  maxSide: number = 1;

  private viewer;

  constructor(private elementRef: ElementRef, private regionToSvgService: RegionToSvgService) {
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['iiifImagePath'] && changes['iiifImagePath'].isFirstChange()) {
      this.setupViewer();
    }
    if (changes['width'] || changes['height']) {
      if (this.width > this.height) {
        this.maxSide = this.width;
      } else {
        this.maxSide = this.height;
      }
    }
    if (changes['iiifImagePath']) {
      this.openImage();
      this.drawRegions();
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

  drawRegions() {
    if (this.regions) {
      const overlay = this.viewer.svgOverlay();

      const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

      for (let i = 0; i < this.regions.length; i++) {
        const element = RegionToSvgService.createSvgElement(this.regions[i], this.maxSide);

        const id = element.id;

        element.addEventListener('mouseover', (e) => {
          this.hoveredRegion.emit(id);
        });
        svgGroup.appendChild(element);
      }

      overlay.node().appendChild(svgGroup);
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
    if (this.iiifImagePath) {
      const image = new IIIFImage(this.iiifImagePath, this.maxImageWidth, this.maxImageHeight);
      const tileSource = image.tileSource();
      this.viewer.open([tileSource]);
    }
  }

}
