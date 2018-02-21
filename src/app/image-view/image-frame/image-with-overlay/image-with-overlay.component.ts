import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';

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

  private viewer;

  constructor(private elementRef: ElementRef) {
  }

  private static createSvgElement(region) {

    if (region.type === 'polygon') {

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      svgElement.id = 'roi-svgoverlay-' + Math.random() * 10000;
      let points = '';
      for (let j = 0; j < region.points.length; j++) {
        points += region.points[j].x;
        points += ',';
        points += region.points[j].y;
        points += ' ';
      }
      svgElement.setAttribute('points', points);
      svgElement.setAttribute('style', 'fill:rgb(0,0,255);stroke-width:' + 0 + 'px;stroke:' + region.lineColor);

      return svgElement;

    } else if (region.type === 'rectangle') {

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      svgElement.id = 'roi-svgoverlay-' + Math.random() * 10000;
      svgElement.setAttribute('width', (region.points[1].x - region.points[0].x).toString());
      svgElement.setAttribute('height', (region.points[1].y - region.points[0].y).toString());
      svgElement.setAttribute('x', region.points[0].x);
      svgElement.setAttribute('y', region.points[0].y);
      svgElement.setAttribute('style', 'fill:rgb(0,255,0);stroke-width:' + 0 + 'px;stroke:' + region.lineColor);

      return svgElement;

    } else if (region.type === 'circle') {

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      svgElement.id = 'roi-svgoverlay-' + Math.random() * 10000;
      svgElement.setAttribute('cx', region.points[0].x);
      svgElement.setAttribute('cy', region.points[0].y);
      svgElement.setAttribute('r',
        Math.sqrt(Math.pow(region.radius.x, 2) + Math.pow(region.radius.y, 2)).toString());
      svgElement.setAttribute('stroke', region.lineColor);
      svgElement.setAttribute('stroke-width', region.lineWidth);
      svgElement.setAttribute('fill', 'red');

      return svgElement;

    } else {
      return document.createElementNS('http://www.w3.org/2000/svg', 'title');
    }
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['image'] && changes['image'].isFirstChange()) {
      console.log(this.image);
      this.setupViewer();
    }
    if (changes['image']) {
      this.openImage();

      const overlay = this.viewer.svgOverlay();

      const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

      for (let i = 0; i < this.regions.length; i++) {
        svgGroup.appendChild(ImageWithOverlayComponent.createSvgElement(this.regions[i]));
      }

      overlay.node().appendChild(svgGroup);

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
