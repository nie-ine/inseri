import { Component } from '@angular/core';
import { SynopsisObjectSerializerService } from './synopsis-object-serializer.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {LightTableLayoutService} from './light-table-layout.service';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent {

  constructor(private route: ActivatedRoute,
              private synopsisObjectSerializerService: SynopsisObjectSerializerService,
              private lightTableLayoutService: LightTableLayoutService) {
    route.paramMap.subscribe(params => this.loadStateFromUrl(params));
  }

  loadStateFromUrl(params: ParamMap) {
    if (params.has('snapshot') && (params.has('tiled') === params.has('cols'))) {
      try {
        if (params.has('tiled')) {
          const tiled = JSON.parse(decodeURIComponent(params.get('tiled')));
          this.lightTableLayoutService.tiledLayout(tiled);
          const cols = JSON.parse(decodeURIComponent(params.get('cols')));
          this.lightTableLayoutService.numberOfColumns(cols);
        }
        const snapshot = JSON.parse(decodeURIComponent(params.get('snapshot')));
        this.synopsisObjectSerializerService.loadFromUrl(snapshot);
      } catch (e) {
        console.log(e.message);
      }
    }
  }


}
