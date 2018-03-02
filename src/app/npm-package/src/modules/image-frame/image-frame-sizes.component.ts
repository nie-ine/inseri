/**
 * Created by Reto Baumgartner (rfbaumgartner) on 07.02.18.
 */
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'nie-image-frame-sizes',
    template: `<input type="radio" value="small" name="viewerWidth" [ngModel]="viewerSize" (change)="radioChange('small')"> Small Viewer
               <input type="radio" value="normal" name="viewerWidth" [ngModel]="viewerSize" (change)="radioChange('normal')"> Normal Viewer
               <input type="radio" value="large" name="viewerWidth" [ngModel]="viewerSize" (change)="radioChange('large')"> Large Viewer

               <ng-content select="nie-image-frame" ></ng-content>`
})
export class ImageFrameSizesComponent implements OnInit {

    viewerWidth: number = 10;
    viewerSize = 'small';
    @Output() viewerWidthChange: EventEmitter<number> = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
        this.updateSize();
    }

    radioChange(v: string) {
        this.viewerSize = v;
        this.updateSize();
        this.viewerWidthChange.emit(this.viewerWidth);
    }

    updateSize() {
        if (this.viewerSize === 'large') {
            this.viewerWidth = 900;
        } else if (this.viewerSize === 'normal') {
            this.viewerWidth = 600;
        } else {
            this.viewerWidth = 300;
        }
    }

}
