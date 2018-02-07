import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CanvasOptionsService {
  nightViewSource = new Subject<boolean>();
  nightView$ = this.nightViewSource.asObservable();
  nightViewState = false;

  fontSizeSource = new Subject<number>();
  fontSize$ = this.fontSizeSource.asObservable();

  constructor() {
  }

  toggleNightView() {
    this.nightViewState = !this.nightViewState;
    this.nightViewSource.next(this.nightViewState);
  }

  changeFontSize(size: number) {
    if (size > 500) {size = 500; }
    if (size < 25) {size = 25; }
    this.fontSizeSource.next(size);
  }

}
