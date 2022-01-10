import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

/**
 * Propagates the modification of a synopsis object
 */
@Injectable()
export class SynopsisObjectModifierService {

  private closeObjectSource = new Subject<number>();
  closeObject$ = this.closeObjectSource.asObservable();
  private closeObjectsByIdSource = new Subject<string>();
  closeObjectsById$ = this.closeObjectsByIdSource.asObservable();
  private rotateObjectSource = new Subject<[number, number]>();
  rotateObject$ = this.rotateObjectSource.asObservable();
  private invertColorsSource = new Subject<number>();
  invertColors$ = this.invertColorsSource.asObservable();
  private resizeObjectSource = new Subject<[number, number, number]>();
  resizeObject$ = this.resizeObjectSource.asObservable();

  closeObject(uid: number) {
    this.closeObjectSource.next(uid);
  }

  closeObjectsById(id: string) {
    this.closeObjectsByIdSource.next(id);
  }

  rotateObject(uid: number, angle: number) {
    this.rotateObjectSource.next([uid, angle]);
  }

  invertColors(uid: number) {
    this.invertColorsSource.next(uid);
  }

  resizeObject(uid: number, width: number, height: number) {
    this.resizeObjectSource.next([uid, width, height]);
  }

}
