import {Injectable} from '@angular/core';
import {SynopsisObjectStorageService} from './synopsis-object-storage.service';
import {SynopsisObjectData} from './synopsis-object-data';
import {Subject} from 'rxjs/Subject';

interface StorageObject {
  [name: string]: [SynopsisObjectData[], SynopsisObjectData[]];
}

class LightTableStorage {

  private storage: StorageObject = {};

  add(name: string, thumbnailSnapshot: SynopsisObjectData[], lightTableSnapshot: SynopsisObjectData[]) {
    this.storage[name] = [thumbnailSnapshot, lightTableSnapshot];
  }

  has(name: string): boolean {
    return Object.keys(this.storage).some(x => x === name);
  }

  get(name: string): [SynopsisObjectData[], SynopsisObjectData[]] {
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

@Injectable()
export class SynopsisObjectSerializerService {
  private thumbnailsSnapshot: Array<SynopsisObjectData>;
  private lightTableStorage = new LightTableStorage();
  private snapshotName: string;

  private makeLightTableSnapshotSource = new Subject();
  makeLightTableSnapshot$ = this.makeLightTableSnapshotSource.asObservable();
  private loadLightTableSnapshotSource = new Subject<SynopsisObjectData[]>();
  loadLightTableSnapshot$ = this.loadLightTableSnapshotSource.asObservable();

  constructor(private synopsisObjectStorageService: SynopsisObjectStorageService) {
    synopsisObjectStorageService.synopsisObjects$
      .subscribe(objList => this.thumbnailsSnapshot = objList.map(x => Object.assign({}, x)));
  }

  save(name: string): boolean {
    if (!this.lightTableStorage.has(name)) {
      this.snapshotName = name;
      this.makeLightTableSnapshotSource.next();
      return true;
    }
    return false;
  }

  load(name: string) {
    const snapshot = this.lightTableStorage.get(name);
    this.synopsisObjectStorageService.replace(snapshot[0]);
    this.loadLightTableSnapshotSource.next(snapshot[1]);
  }

  getAllFilenames(): string[] {
    return this.lightTableStorage.getAllFilenames();
  }

  sendLightTableSnapshot(snapshot: SynopsisObjectData[]) {
    this.lightTableStorage.add(this.snapshotName, this.thumbnailsSnapshot, snapshot);
  }

}
