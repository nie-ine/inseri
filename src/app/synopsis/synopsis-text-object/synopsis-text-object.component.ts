import {Component, Input, ViewChild} from '@angular/core';
import {SynopsisObject} from '../synopsis-object';
import {SynopsisTextData} from '../synopsis-object-data';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';

@Component({
  selector: 'app-synopsis-text-object',
  templateUrl: './synopsis-text-object.component.html',
  styleUrls: ['./synopsis-text-object.component.scss']
})
export class SynopsisTextObjectComponent implements SynopsisObject {

  @Input() data: SynopsisTextData;
  @ViewChild('textObject') textObject;
  nightView = false;

  constructor(private synopsisObjectModifierService: SynopsisObjectModifierService) {
    synopsisObjectModifierService.rotate$.subscribe(deg => this.rotate(deg));
  }

  propagateHeightAndWidth() {
    this.synopsisObjectModifierService.propagateHeight(this.data.uid, this.textObject.nativeElement.clientHeight + 2);
    this.synopsisObjectModifierService.propagateWidth(this.data.uid, this.textObject.nativeElement.clientWidth + 2);
  }

  rotate(deg: number) {
    this.data.rotation = (this.data.rotation + deg) % 360;
    this.synopsisObjectModifierService.propagateRotation(this.data.uid, this.data.rotation);
  }

  toggleNightView() {
    this.nightView = !this.nightView;
  }

}
