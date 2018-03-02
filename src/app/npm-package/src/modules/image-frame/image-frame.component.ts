/**
 * Created by Reto Baumgartner (rfbaumgartner) on 07.02.18.
 */
import {
    Component, Input, OnInit, OnChanges, SimpleChange, ElementRef, OnDestroy
} from '@angular/core';

// This component needs the openseadragon library which installed via package.json, and loaded globally via the script tag in .angular-cli.json

// in .angular-cli.json add openseadragon.min.js under scripts like written here:

//      "scripts": [
// +        "../node_modules/openseadragon/build/openseadragon/openseadragon.min.js"
//      ],

// OpenSeadragon does not export itself as ES6/ECMA2015 module,
// it is loaded globally in scripts tag of angular-cli.json,
// we still need to declare the namespace to make TypeScript compiler happy.
declare let OpenSeadragon: any;


@Component({
    selector: 'nie-image-frame',
    template: `<div class="osdViewerContainer" [ngStyle]="{'height': height + 'px', 'width': width + 'px'}"></div>`
})
export class ImageFrameComponent implements OnInit, OnChanges, OnDestroy {

    @Input() public image?: any;
    @Input() public width: number = 1;
    @Input() public height: number = 1;

    private viewer: any;

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
