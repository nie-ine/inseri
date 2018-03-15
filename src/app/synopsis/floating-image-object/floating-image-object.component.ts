import { Component, Input } from '@angular/core';
import { SynopsisObject } from '../synopsis-object';
import { SynopsisImageData } from '../synopsis-object-data';

@Component({
  selector: 'app-floating-image-object',
  templateUrl: './floating-image-object.component.html',
  styleUrls: ['./floating-image-object.component.scss']
})
export class FloatingImageObjectComponent implements SynopsisObject {
  @Input() data: SynopsisImageData;
  showMenu = false;

  toggleShowMenu(state: boolean) {
    this.showMenu = state;
  }
}
