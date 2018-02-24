import {Component, Input, ViewChild} from '@angular/core';
import {SynopsisObject} from '../synopsis-object';
import {SynopsisImageData} from '../synopsis-object-data';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';

@Component({
  selector: 'app-synopsis-image-object',
  templateUrl: './synopsis-image-object.component.html',
  styleUrls: ['./synopsis-image-object.component.scss']
})
export class SynopsisImageObjectComponent implements SynopsisObject {

  @Input() data: SynopsisImageData;
  @ViewChild('imageObject') imageObject;
  nightView = false;

  constructor(private synopsisObjectModifierService: SynopsisObjectModifierService) {
    synopsisObjectModifierService.rotate$.subscribe(deg => this.rotate(deg));
  }

  propagateHeightAndWidth() {
    this.synopsisObjectModifierService.propagateHeight(this.data.uid, this.imageObject.nativeElement.clientHeight + 2);
    this.synopsisObjectModifierService.propagateWidth(this.data.uid, this.imageObject.nativeElement.clientWidth + 2);
  }

  rotate(deg: number) {
    this.data.rotation = (this.data.rotation + deg) % 360;
    this.synopsisObjectModifierService.propagateRotation(this.data.uid, this.data.rotation);
  }

  toggleNightView() {
    this.nightView = !this.nightView;
  }
}
