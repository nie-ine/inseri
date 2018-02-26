import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { RegionToSvgService } from '../../region-to-svg.service';


// This component needs the openseadragon library itself, as well as the openseadragon plugin openseadragon-svg-overlay
// Both libraries are installed via package.json, and loaded globally via the script tag in .angular-cli.json

// OpenSeadragon does not export itself as ES6/ECMA2015 module,
// it is loaded globally in scripts tag of angular-cli.json,
// we still need to declare the namespace to make TypeScript compiler happy.
declare let OpenSeadragon: any;

@Component({
  selector: 'app-image-with-overlay',
  templateUrl: './image-with-overlay.component.html',
  styleUrls: ['./image-with-overlay.component.scss']
})
export class ImageWithOverlayComponent implements OnInit, OnChanges, OnDestroy {

  @Input() image: any;
  @Input() regions: any;
  @Input() width: number;
  @Input() height: number;
  maxSide: number = 1;

  private viewer;

  constructor(private elementRef: ElementRef, private regionToSvgService: RegionToSvgService) {
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['image'] && changes['image'].isFirstChange()) {
      this.setupViewer();
    }
    if (changes['width'] || changes['height']) {
      if (this.width > this.height) {
        this.maxSide = this.width;
      } else {
        this.maxSide = this.height;
      }
    }
    if (changes['image']) {
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
    const overlay = this.viewer.svgOverlay();

    const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    for (let i = 0; i < this.regions.length; i++) {
      const element = RegionToSvgService.createSvgElement(this.regions[i], this.maxSide);

      const id = element.id;

      element.addEventListener('mouseover', function () {
        console.log(id);
        //const dialog: MatDialog = new MatDialog();
        //dialog.open(ImageFrameComponent);
      });

      svgGroup.appendChild(element);
    }

    overlay.node().appendChild(svgGroup);
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

    const tileSource = {
      'tileSource': {
        '@context': 'http://iiif.io/api/image/2/context.json',
        '@id': this.image['knora-api:stillImageFileValueHasIIIFBaseUrl'] + '/'
        + this.image['knora-api:fileValueHasFilename'],
        'height': this.image['knora-api:stillImageFileValueHasDimY'],
        'width': this.image['knora-api:stillImageFileValueHasDimX'],
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
