import { Injectable } from '@angular/core';
import { SynopsisObjectData } from './synopsis-object-data';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class SynopsisObjectStorageService {

  private synopsisObjects: SynopsisObjectData[] = [];

  private synopsisObjectsSource = new ReplaySubject<Array<SynopsisObjectData>>(1);
  synopsisObjects$ = this.synopsisObjectsSource.asObservable();

  constructor() {
  }

  add(synopsisObjectData: SynopsisObjectData) {
    this.synopsisObjects.push(synopsisObjectData);
    this.synopsisObjectsSource.next(this.synopsisObjects);
  }

  remove(uid: number): boolean {
    const index = this.synopsisObjects.findIndex(x => x.uid === uid);
    if (index > -1) {
      this.synopsisObjects.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

}
