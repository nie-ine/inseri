import {
  Component, Input, OnInit, OnChanges, SimpleChange, ElementRef, OnDestroy
} from '@angular/core';
import { IIIFImage } from '../../shared/IIIFImage';

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

  @Input() image: IIIFImage;
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

      const overlay = this.viewer.svgOverlay();

      const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

      const svgTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      svgTitle.textContent = 'test';

      svgGroup.appendChild(svgTitle);

      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      svgElement.id = 'roi-svgoverlay-' + Math.random() * 10000;
      svgElement.setAttribute('cx', '0.5');
      svgElement.setAttribute('cy', '0.5');
      svgElement.setAttribute('r', '0.04');
      svgElement.setAttribute('stroke', 'black');
      svgElement.setAttribute('stroke-width', '0.003');
      svgElement.setAttribute('fill', 'red');

      svgGroup.appendChild(svgElement);

      const svgElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      svgElement2.id = 'roi-svgoverlay-' + Math.random() * 10000;
      svgElement2.setAttribute('width', '0.2');
      svgElement2.setAttribute('height', '0.1');
      svgElement2.setAttribute('x', '0.6');
      svgElement2.setAttribute('y', '0.3');
      svgElement2.setAttribute('style', 'fill:rgb(0,0,255);stroke-width:0.003;stroke:rgb(0,0,0)');

      svgGroup.appendChild(svgElement2);

      const svgElement3 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      svgElement3.setAttribute('transform', 'translate(0,0) scale(0.0004) rotate(0)');

      svgElement3.innerHTML = '<g\n' +
        '     inkscape:groupmode="layer"\n' +
        '     id="layer5"\n' +
        '     inkscape:label="dark">\n' +
        '    <path\n' +
        '       style="display:inline;fill:#0070bf;stroke:#0070bf;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1"\n' +
        '       d="M 443.60491,284 614.45835,511 390.20677,511 219.9347,284 Z"\n' +
        '       id="path145"\n' +
        '       inkscape:connector-curvature="0" />\n' +
        '    <path\n' +
        '       style="display:inline;fill:#0070bf;stroke:#0070bf;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1"\n' +
        '       d="M 225.59373,260 331.16267,106.59305 438.19018,260 Z"\n' +
        '       id="path133"\n' +
        '       inkscape:connector-curvature="0"\n' +
        '       sodipodi:nodetypes="cccc" />\n' +
        '    <path\n' +
        '       style="display:inline;fill:#0070bf;stroke:#0070bf;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1"\n' +
        '       d="m 542.59518,260 105.721,-153.60865 106.50938,153.62217 z"\n' +
        '       id="path135"\n' +
        '       inkscape:connector-curvature="0" />\n' +
        '    <path\n' +
        '       style="fill:#0070bf;stroke:#0070bf;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1"\n' +
        '       d="M 614.45835,511 1087.8982,511 1125.6013,451 848.56686,451 865.5,424.5 l 277.2958,0 31.227,-49.09462 H 897.78215 L 914.5,346.5 l 275,0 39.2947,-61.76121 -469.93968,0 z"\n' +
        '       id="path155"\n' +
        '       inkscape:connector-curvature="0" />\n' +
        '  </g>\n' +
        '  <g\n' +
        '     inkscape:groupmode="layer"\n' +
        '     id="layer6"\n' +
        '     inkscape:label="bright">\n' +
        '    <path\n' +
        '       style="display:inline;fill:#05aeee;stroke:#05aeee;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1"\n' +
        '       d="M 298.04122,511 74.916695,511 219.9347,284 h 223.67021 z"\n' +
        '       id="path137"\n' +
        '       inkscape:connector-curvature="0"\n' +
        '       sodipodi:nodetypes="ccccc" />\n' +
        '    <path\n' +
        '       style="display:inline;fill:#05aeee;stroke:#05aeee;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1"\n' +
        '       d="M 535.5,284 758.85502,284 614.45835,511 390.20677,511 Z"\n' +
        '       id="path139"\n' +
        '       inkscape:connector-curvature="0"\n' +
        '       sodipodi:nodetypes="ccccc" />\n' +
        '  </g>';

      svgGroup.appendChild(svgElement3);


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

    const tileSource = this.image.tileSource();
    this.viewer.open([tileSource]);
  }

}
