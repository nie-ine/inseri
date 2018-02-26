import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SynopsisObjectSelectorService {

  selectNewObjectSource = new Subject<number>();
  selectNewObject$ = this.selectNewObjectSource.asObservable();

  constructor() { }

  selectNewObject(uid: number) {
    this.selectNewObjectSource.next(uid);
  }


}
