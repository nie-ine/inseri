import { Component, OnDestroy, OnInit } from '@angular/core';
import { LightTableLayoutService } from '../light-table-layout.service';
import { SynopsisObjectData, SynopsisObjectType } from '../synopsis-object-data';
import { LightTableStashService } from '../light-table-stash.service';
import { SynopsisObjectModifierService } from '../synopsis-object-modifier.service';
import { SynopsisObjectSerializerService } from '../synopsis-object-serializer.service';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(private lightTableLayoutService: LightTableLayoutService,
              private lightTableStashService: LightTableStashService,
              private synopsisObjectModifierService: SynopsisObjectModifierService,
              private synopsisObjectSerializerService: SynopsisObjectSerializerService) {
    lightTableLayoutService.numberOfColumns$.subscribe(cols => this.columns = cols);
    this.closeObjectSubscriber =
      synopsisObjectModifierService.closeObject$.subscribe(uid => this.closeObject(uid));
    this.makeLightTableSnapshotSubscriber =
      synopsisObjectSerializerService.makeLightTableSnapshot$.subscribe(() => this.makeSnapshot());
    this.loadLightTableSnapshotSubscriber =
      synopsisObjectSerializerService.loadLightTableSnapshot$.subscribe(snapshot => this.load(snapshot));
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

  onDrop(data: SynopsisObjectData) {
    if (!data.uid) {
      data.uid = +(Math.random().toString().substr(2));
    }
    this.synopsisObjects.push(data);
  }

  // noinspection JSMethodCanBeStatic
  trackBySynopsisObjects(index: number, object: SynopsisObjectData): number {
    return object.uid;
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
