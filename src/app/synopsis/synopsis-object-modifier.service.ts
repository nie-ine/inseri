import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SynopsisObjectModifierService {

  private closeObjectSource = new Subject<number>();
  closeObject$ = this.closeObjectSource.asObservable();
  private rotateSource = new Subject<number>();
  rotate$ = this.rotateSource.asObservable();
  private modifyObjectSource = new Subject<any>();
  modifyObject$ = this.modifyObjectSource.asObservable();


  closeObject(uid: number) {
    this.closeObjectSource.next(uid);
  }

  propagateRotation(uid: number, deg: number) {
    this.modifyObject(uid, 'rotation', deg);
  }

  propagateHeight(uid: number, height: number) {
    this.modifyObject(uid, 'height', height);
  }

  propagateWidth(uid: number, width: number) {
    this.modifyObject(uid, 'width', width);
  }

  private modifyObject(uid: number, property: string, value: number) {
    this.modifyObjectSource.next({uid: uid, property: property, value: value});
  }

}
