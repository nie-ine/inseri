import {Injectable} from '@angular/core';
import {SynopsisObjectData} from './synopsis-object-data';

/**
 * Stash snapshots of floating light table view
 */
@Injectable()
export class LightTableStashService {

  snapshot: SynopsisObjectData[];

  constructor() {
  }

  fetch() {
    return this.snapshot;
  }

  stash(data: SynopsisObjectData[]) {
    this.snapshot = data;
  }

}
