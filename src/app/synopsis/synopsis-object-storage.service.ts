import {Injectable} from '@angular/core';
import {SynopsisObjectData} from './synopsis-object-data';
import {ReplaySubject} from 'rxjs/ReplaySubject';

/**
 * Application-wide storage for objects which were selected for synopsis view
 */
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

  replace(snapshot: SynopsisObjectData[]) {
    this.synopsisObjects = snapshot;
    this.synopsisObjectsSource.next(this.synopsisObjects);
  }

  remove(index: number) {
    if (this.synopsisObjects.length > index) {
      this.synopsisObjects.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

}
