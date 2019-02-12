import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {SynopsisObjectData} from '../synopsis-object-data';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class SynopsisObjectSerializerServiceStub {

  private makeLightTableSnapshotSource = new Subject();
  makeLightTableSnapshot$ = this.makeLightTableSnapshotSource.asObservable();
  private loadLightTableSnapshotSource = new ReplaySubject<SynopsisObjectData[]>(1);
  loadLightTableSnapshot$ = this.loadLightTableSnapshotSource.asObservable();
  private propagateLightTableSharedSnapshotSource = new Subject<[SynopsisObjectData[], SynopsisObjectData[]]>();
  propagateLightTableSharedSnapshot$ = this.propagateLightTableSharedSnapshotSource.asObservable();

  // noinspection JSMethodCanBeStatic
  save(name: string): boolean {
    return true;
  }

  generateSharedSnapshot() {
  }

  load(name: string) {
  }

  loadFromUrl(snapshot: any) {
  }

  // noinspection JSMethodCanBeStatic
  getAllFilenames(): string[] {
    return ['test1', 'test2'];
  }

  sendLightTableSnapshot(snapshot: SynopsisObjectData[]) {
  }
}
