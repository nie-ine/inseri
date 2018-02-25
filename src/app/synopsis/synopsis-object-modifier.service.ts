import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SynopsisObjectModifierService {

  private closeObjectSource = new Subject<number>();
  closeObject$ = this.closeObjectSource.asObservable();

  closeObject(uid: number) {
    this.closeObjectSource.next(uid);
  }

}
