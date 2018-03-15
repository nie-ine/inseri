import {Component, Input} from '@angular/core';
import {SynopsisImageData} from '../synopsis-object-data';

@Component({
  selector: 'app-tiled-image-object',
  templateUrl: './tiled-image-object.component.html',
  styleUrls: ['./tiled-image-object.component.scss']
})
export class TiledImageObjectComponent {

  @Input() data: SynopsisImageData;
  showMenu = false;

}
