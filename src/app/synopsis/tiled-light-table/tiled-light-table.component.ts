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
  private closeObjectsByIdSubscriber: Subscription;
  private invertColorsSubscriber: Subscription;
  dragging = false;

  constructor(private lightTableLayoutService: LightTableLayoutService,
              private lightTableStashService: LightTableStashService,
              private synopsisObjectModifierService: SynopsisObjectModifierService,
              private synopsisObjectSerializerService: SynopsisObjectSerializerService,
              private dragService: DragService) {
    lightTableLayoutService.numberOfColumns$.subscribe(cols => this.columns = cols);
    this.closeObjectSubscriber =
      synopsisObjectModifierService.closeObject$.subscribe(uid => this.closeObject(uid));
    this.closeObjectsByIdSubscriber =
      synopsisObjectModifierService.closeObjectsById$.subscribe(id => this.closeObjectsById(id));
    this.makeLightTableSnapshotSubscriber =
      synopsisObjectSerializerService.makeLightTableSnapshot$.subscribe(() => this.makeSnapshot());
    this.invertColorsSubscriber =
      synopsisObjectModifierService.invertColors$.subscribe(uid => this.updateInversion(uid));
    dragService.dragging$.subscribe(dragging => this.dragging = dragging);
  }

  ngOnInit() {
    if (this.lightTableStashService.fetch()) {
      this.load(this.lightTableStashService.fetch());
    }
    this.loadLightTableSnapshotSubscriber =
      this.synopsisObjectSerializerService.loadLightTableSnapshot$.subscribe(snapshot => this.load(snapshot));
  }

  ngOnDestroy() {
    this.lightTableStashService.stash(this.synopsisObjects);
    this.closeObjectSubscriber.unsubscribe();
    this.closeObjectsByIdSubscriber.unsubscribe();
    this.makeLightTableSnapshotSubscriber.unsubscribe();
    this.loadLightTableSnapshotSubscriber.unsubscribe();
    this.invertColorsSubscriber.unsubscribe();
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
    this.dragging = false;
  }

  // noinspection JSMethodCanBeStatic
  setColumns(cols: number) {
    switch (cols) {
      case 1:
        return 'col-1';
      case 2:
        return 'col-2';
      case 3:
        return 'col-3';
      case 4:
        return 'col-4';
      case 5:
        return 'col-5';
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

  private updateInversion(uid: number) {
    const index = this.synopsisObjects.findIndex(x => x.uid === uid);
    this.synopsisObjects[index].invertedColors = !this.synopsisObjects[index].invertedColors;
  }

  private closeObjectsById(id: string) {
    this.synopsisObjects = this.synopsisObjects.filter(x => x.id !== id);
  }
}
