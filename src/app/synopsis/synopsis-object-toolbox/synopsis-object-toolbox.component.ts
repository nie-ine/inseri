import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';

@Component({
  selector: 'app-synopsis-object-toolbox',
  templateUrl: './synopsis-object-toolbox.component.html',
  styleUrls: ['./synopsis-object-toolbox.component.scss']
})
export class SynopsisObjectToolboxComponent {

  @Input() uid: number;
  @Output() rotate = new EventEmitter<number>();
  @Output() nightView = new EventEmitter();

  constructor(private synopsisObjectModifierService: SynopsisObjectModifierService) {
  }

  closeObject() {
    this.synopsisObjectModifierService.closeObject(this.uid);
  }

  rotateLeft() {
    // this.rotate.emit(-90);
    this.synopsisObjectModifierService.rotateObject(this.uid, -90);
  }

  rotateRight() {
    // this.rotate.emit(90);
    this.synopsisObjectModifierService.rotateObject(this.uid, 90);
  }

  invertColors() {
    // this.nightView.emit();
    this.synopsisObjectModifierService.invertColors(this.uid);
  }

}
