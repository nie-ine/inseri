import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange} from "@angular/core";
import { RegionToSvgService } from '../region-to-svg.service';


/**
 * This component needs the openseadragon library itself, as well as the openseadragon plugin openseadragon-svg-overlay
 * Both libraries are installed via package.json, and loaded globally via the script tag in .angular-cli.json

 * OpenSeadragon does not export itself as ES6/ECMA2015 module,
 * it is loaded globally in scripts tag of angular-cli.json,
 * we still need to declare the namespace to make TypeScript compiler happy.
 */
declare let OpenSeadragon: any;

/**
 * This object defines the metadata for an image on a IIIF compatible image server.
 */
export class IIIFImage {

  /**
   * Protocol for access.
   */
  scheme = 'https';

  /**
   * The image server.
   */
  server: string;

  /**
   * Path on the server to the image.
   */
  prefix: string;

  /**
   * ID of the image.
   */
  identifier: string;

  /**
   * Maximal height of the image in pixels.
   */
  height: number;

  /**
   * Maximal width of the image in pixels.
   */
  width: number;

  /**
   * Constructor for this object.
   * @param imageUrl  An URL that defines a possible view of this image.
   * @param width  Maximal width of the image in pixels.
   * @param height  Maximal height of the image in pixels.
   */
  constructor(imageUrl: string, width: number, height: number) {
    this.height = Number(height);
    this.width = Number(width);

    const urlParts = imageUrl.split('/');

    this.scheme = urlParts[0];
    this.server = urlParts[2];
    this.identifier = urlParts[urlParts.length - 5];

    this.prefix = '';
    for (let i = 3; i < urlParts.length - 5; i++) {
      this.prefix = this.prefix + '/' + urlParts[i];
    }
  }

  /**
   * Formatted input for openseadragon.
   */
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

/**
 * This component allows showing an image from a IIIF server together with SVG annotations.
 */
@Component({
  selector: 'app-image-with-overlay',
  templateUrl: './image-with-overlay.component.html',
  styleUrls: ['./image-with-overlay.component.scss']
})
export class ImageWithOverlayComponent implements OnInit, OnChanges, OnDestroy {

  // Input not possible with object but with object's inputs.
  // @Input() image: IIIFImage;

  /**
   * A valid path to a IIIF image.
   */
  @Input() iiifImagePath: string;

  /**
   * Maximal width of the image in pixels.
   */
  @Input() maxImageWidth: number;

  /**
   * Maximal height of the image in pixels.
   */
  @Input() maxImageHeight: number;

  /**
   * Annotations on the image.
   */
  @Input() regions: any;

  /**
   * Width of the viewer in pixels.
   */
  @Input() width: number;

  /**
   * Height of the viewer in pixels.
   */
  @Input() height: number;

  /**
   * ID of the region, the mouse is over.
   */
  @Output() hoveredRegionChange = new EventEmitter<string>();
  @Input() hoveredRegion: string;

  /**
   * Length of longer side of the viewer in pixels.
   */
  maxSide: number = 1;

  /**
   * Openseadragon viewer
   */
  private viewer;

  /**
   * Constructor initializes ElementRef and RegionToSvgService
   * @param elementRef  Enables access to elements by class name.
   * @param regionToSvgService  Service that transforms regions to SVG overlay.
   */
  constructor(private elementRef: ElementRef, private regionToSvgService: RegionToSvgService) {
  }

  /**
   * On the first change the viewer is initialized, then the image can be drawn or the sides changed.
   * @param changes  changes by Angular change detection
   */
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    console.log( 'Changes image with overlay', this.iiifImagePath, this.maxImageHeight, this.maxImageWidth );
    if (this.maxImageHeight === undefined && this.maxImageWidth === undefined && this.iiifImagePath === undefined) {
      // default image for demonstration purpose
      // this.iiifImagePath = 'https://www.e-manuscripta.ch/zuz/i3f/v20/1510618/full/full/50/default.jpg';
      // this.maxImageWidth = 3062;
      // this.maxImageHeight = 4034;
      // as regions are optional, no default can be given
    }

    if( this.maxImageHeight !== undefined && this.maxImageWidth !== undefined && this.iiifImagePath !== undefined ) {
      console.log( 'set up viewer' );
      // if (changes['iiifImagePath'] && changes['iiifImagePath'].isFirstChange()) {
        this.setupViewer();
      // }
      if (changes['width'] || changes['height']) {
        if (this.width > this.height) {
          this.maxSide = this.width;
        } else {
          this.maxSide = this.height;
        }
      }
      // if (changes['iiifImagePath']) {
        this.openImage();
        this.drawRegions();
      // }
    }


  }

  /**
   * default written by angular-cli
   */
  ngOnInit() {
    // initialisation is done on first run of ngOnChanges
  }

  /**
   * Delete the viewer on closing the component.
   */
  ngOnDestroy() {
    if (this.viewer) {
      this.viewer.destroy();
      this.viewer = undefined;
    }
  }

  /**
   * Draw the regions as SVG overlay.
   */
  drawRegions() {
    if (this.regions) {
      const overlay = this.viewer.svgOverlay();

      const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

      for (let i = 0; i < this.regions.length; i++) {
        const element = RegionToSvgService.createSvgElement(this.regions[i], this.maxSide);

        const id = element.id;

        element.addEventListener('mouseover', (e) => {
          this.hoveredRegionChange.emit(id);
        });
        svgGroup.appendChild(element);
      }

      overlay.node().appendChild(svgGroup);
    }
  }

  /**
   * Initialize viewer as IIIF viewer.
   */
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

  /**
   * Apply image data to viewer.
   */
  private openImage(): void {
    if (this.iiifImagePath) {
      const image = new IIIFImage(this.iiifImagePath, this.maxImageWidth, this.maxImageHeight);
      const tileSource = image.tileSource();
      this.viewer.open([tileSource]);
    }
  }

}
