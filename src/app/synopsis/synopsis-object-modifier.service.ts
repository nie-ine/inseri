import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SynopsisObjectModifierService {

  private closeObjectSource = new Subject<number>();
  closeObject$ = this.closeObjectSource.asObservable();
  private rotateObjectSource = new Subject<[number, number]>();
  rotateObject$ = this.rotateObjectSource.asObservable();
  private invertColorsSource = new Subject<number>();
  invertColors$ = this.invertColorsSource.asObservable();

  closeObject(uid: number) {
    this.closeObjectSource.next(uid);
  }

  rotateObject(uid: number, angle: number) {
    this.rotateObjectSource.next([uid, angle]);
  }

  invertColors(uid: number) {
    this.invertColorsSource.next(uid);
  }

}
