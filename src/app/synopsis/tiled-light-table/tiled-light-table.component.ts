import {Component, OnDestroy, OnInit} from '@angular/core';
import {LightTableLayoutService} from '../light-table-layout.service';
import {SynopsisObjectData, SynopsisObjectType} from '../synopsis-object-data';
import {LightTableStashService} from '../light-table-stash.service';

@Component({
  selector: 'app-tiled-light-table',
  templateUrl: './tiled-light-table.component.html',
  styleUrls: ['./tiled-light-table.component.scss']
})
export class TiledLightTableComponent implements OnInit, OnDestroy {
  synopsisObjects: SynopsisObjectData[] = [];
  columns = 2;
  synopsisObjectTypes = SynopsisObjectType;

  constructor(private lightTableLayoutService: LightTableLayoutService,
              private lightTableStashService: LightTableStashService) {
    this.lightTableLayoutService.numberOfColumns$.subscribe(cols => this.columns = cols);
  }

  ngOnInit() {
    this.synopsisObjects = this.lightTableStashService.fetch();
  }

  ngOnDestroy() {
    this.lightTableStashService.stash(this.synopsisObjects);
  }

  onDrop(data: SynopsisObjectData) {
    this.synopsisObjects.push(data);
  }

  // noinspection JSMethodCanBeStatic
  trackBySynopsisObjects(index: number, object: SynopsisObjectData): number {
    return object.uid;
  }
}
