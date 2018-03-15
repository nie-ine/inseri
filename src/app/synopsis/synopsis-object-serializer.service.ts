import { Injectable } from '@angular/core';
import { SynopsisObjectStorageService } from './synopsis-object-storage.service';
import { SynopsisObjectData } from './synopsis-object-data';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LightTableLayoutService } from './light-table-layout.service';

interface StorageObject {
  [name: string]: [SynopsisObjectData[], SynopsisObjectData[], boolean, number | undefined];
}

/**
 * In-memory storage for light table views
 */
class LightTableStorage {

  private storage: StorageObject = {};

  add(name: string, thumbnailSnapshot: SynopsisObjectData[], lightTableSnapshot: SynopsisObjectData[], tiled: boolean, cols?: number) {
    this.storage[name] = [thumbnailSnapshot, lightTableSnapshot, tiled, cols];
  }

  has(name: string): boolean {
    return Object.keys(this.storage).some(x => x === name);
  }

  get(name: string): [SynopsisObjectData[], SynopsisObjectData[], boolean, number | undefined] {
    return this.storage[name];
  }

  getAllFilenames(): string[] {
    return Object.keys(this.storage);
  }

  remove(name: string): boolean {
    if (this.has(name)) {
      this.storage[name] = undefined;
      return true;
    }
    return false;
  }

}

/**
 * Saves light table permanently
 */
@Injectable()
export class SynopsisObjectSerializerService {
  private thumbnailsSnapshot: Array<SynopsisObjectData>;
  private lightTableStorage = new LightTableStorage();
  private snapshotName: string;
  private sharedSnapshot = false;
  private tiled;
  private numberOfColumns;

  private makeLightTableSnapshotSource = new Subject();
  makeLightTableSnapshot$ = this.makeLightTableSnapshotSource.asObservable();
  private loadLightTableSnapshotSource = new ReplaySubject<SynopsisObjectData[]>(1);
  loadLightTableSnapshot$ = this.loadLightTableSnapshotSource.asObservable();
  private propagateLightTableSharedSnapshotSource = new Subject<[SynopsisObjectData[], SynopsisObjectData[]]>();
  propagateLightTableSharedSnapshot$ = this.propagateLightTableSharedSnapshotSource.asObservable();

  constructor(private synopsisObjectStorageService: SynopsisObjectStorageService,
              private lightTableLayoutService: LightTableLayoutService) {
    synopsisObjectStorageService.synopsisObjects$
      .subscribe(objList => this.thumbnailsSnapshot = objList.map(x => Object.assign({}, x)));
    lightTableLayoutService.numberOfColumns$.subscribe(cols => this.numberOfColumns = cols);
    lightTableLayoutService.tiledLayout$.subscribe(tiled => this.tiled = tiled);
  }

  save(name: string): boolean {
    if (!this.lightTableStorage.has(name)) {
      this.snapshotName = name;
      this.makeLightTableSnapshotSource.next();
      return true;
    }
    return false;
  }

  generateSharedSnapshot() {
    this.sharedSnapshot = true;
    this.makeLightTableSnapshotSource.next();
  }

  load(name: string) {
    const snapshot = this.lightTableStorage.get(name);
    this.lightTableLayoutService.tiledLayout(snapshot[2]);
    if (snapshot[2]) {
      this.lightTableLayoutService.numberOfColumns(snapshot[3]);
    }
    this.synopsisObjectStorageService.replace(snapshot[0]);
    this.loadLightTableSnapshotSource.next(snapshot[1]);
  }

  loadFromUrl(snapshot: any) {
    this.synopsisObjectStorageService.replace(<SynopsisObjectData[]>snapshot[0]);
    this.loadLightTableSnapshotSource.next(<SynopsisObjectData[]>snapshot[1]);
  }

  getAllFilenames(): string[] {
    return this.lightTableStorage.getAllFilenames();
  }

  sendLightTableSnapshot(snapshot: SynopsisObjectData[]) {
    if (this.sharedSnapshot) {
      this.propagateLightTableSharedSnapshotSource.next([this.thumbnailsSnapshot, snapshot]);
      this.sharedSnapshot = false;
    } else {
      this.lightTableStorage.add(
        this.snapshotName,
        this.thumbnailsSnapshot,
        snapshot,
        this.tiled,
        this.tiled ? this.numberOfColumns : undefined
      );
    }
  }

}
