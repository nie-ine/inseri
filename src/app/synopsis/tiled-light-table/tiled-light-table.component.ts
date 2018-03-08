import {Component, OnDestroy, OnInit} from '@angular/core';
import {LightTableLayoutService} from '../light-table-layout.service';
import {SynopsisObjectData, SynopsisObjectType} from '../synopsis-object-data';
import {LightTableStashService} from '../light-table-stash.service';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {Subscription} from 'rxjs/Subscription';
import {DragService} from '../drag.service';

@Component({
  selector: 'app-tiled-light-table',
  templateUrl: './tiled-light-table.component.html',
  styleUrls: ['./tiled-light-table.component.scss']
})
export class TiledLightTableComponent implements OnInit, OnDestroy {
  synopsisObjects: SynopsisObjectData[] = [];
  columns = 2;
  synopsisObjectTypes = SynopsisObjectType;
  private loadLightTableSnapshotSubscriber: Subscription;
  private makeLightTableSnapshotSubscriber: Subscription;
  private closeObjectSubscriber: Subscription;
  dragging: boolean;

  constructor(private lightTableLayoutService: LightTableLayoutService,
              private lightTableStashService: LightTableStashService,
              private synopsisObjectModifierService: SynopsisObjectModifierService,
              private synopsisObjectSerializerService: SynopsisObjectSerializerService,
              private dragService: DragService) {
    lightTableLayoutService.numberOfColumns$.subscribe(cols => this.columns = cols);
    this.closeObjectSubscriber =
      synopsisObjectModifierService.closeObject$.subscribe(uid => this.closeObject(uid));
    this.makeLightTableSnapshotSubscriber =
      synopsisObjectSerializerService.makeLightTableSnapshot$.subscribe(() => this.makeSnapshot());
    this.loadLightTableSnapshotSubscriber =
      synopsisObjectSerializerService.loadLightTableSnapshot$.subscribe(snapshot => this.load(snapshot));
    dragService.dragging$.subscribe(dragging => this.dragging = dragging);
  }

  ngOnInit() {
    this.synopsisObjects = this.lightTableStashService.fetch();
  }

  ngOnDestroy() {
    this.lightTableStashService.stash(this.synopsisObjects);
    this.closeObjectSubscriber.unsubscribe();
    this.makeLightTableSnapshotSubscriber.unsubscribe();
    this.loadLightTableSnapshotSubscriber.unsubscribe();
  }

  onDrop(data: SynopsisObjectData, index?: number) {
    if (!data.uid) {
      data.uid = +(Math.random().toString().substr(2));
    } else {
      this.synopsisObjects = this.synopsisObjects.filter(x => x.uid !== data.uid);
    }
    if (index === 0) {
      this.synopsisObjects.unshift(data);
    } else if (index) {
      this.synopsisObjects.splice(index, 0, data);
    } else {
      this.synopsisObjects.push(data);
    }
  }

  private closeObject(uid: number) {
    this.synopsisObjects = this.synopsisObjects.filter(x => x.uid !== uid);
  }

  private makeSnapshot() {
    this.synopsisObjectSerializerService.sendLightTableSnapshot(this.synopsisObjects);
  }

  private load(snapshot: SynopsisObjectData[]) {
    this.synopsisObjects = snapshot;
  }
}
