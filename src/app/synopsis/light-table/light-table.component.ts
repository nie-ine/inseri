import {Component} from '@angular/core';
import {LightTableLayoutService} from '../light-table-layout.service';


@Component({
  selector: 'app-light-table',
  templateUrl: './light-table.component.html',
  styleUrls: ['./light-table.component.scss']
})
export class LightTableComponent {

  tiled = false;

  constructor(private lightTableLayoutService: LightTableLayoutService) {
    lightTableLayoutService.tiledLayout$.subscribe(tiled => {
      this.tiled = tiled;
    });
  }

}
