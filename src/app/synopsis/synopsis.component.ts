import { Component } from '@angular/core';
import { SynopsisObjectSerializerService } from './synopsis-object-serializer.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent {

  constructor(private route: ActivatedRoute, private synopsisObjectSerializerService: SynopsisObjectSerializerService) {
    route.paramMap.subscribe(params => this.loadStateFromUrl(params));
  }

  loadStateFromUrl(params: ParamMap) {
    if (params.has('snapshot')) {
      try {
        const snapshot = JSON.parse(decodeURIComponent(params.get('snapshot')));
        this.synopsisObjectSerializerService.loadFromUrl(snapshot);
      } catch (e) {
        console.log(e.message);
      }
    }
  }


}
