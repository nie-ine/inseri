import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CanvasOptionsService {
  private nightViewSource = new Subject<boolean>();
  nightView$ = this.nightViewSource.asObservable();
  private nightViewState = false;

  private fontSizeSource = new Subject<number>();
  fontSize$ = this.fontSizeSource.asObservable();

  private termSource = new Subject<string>();
  term$ = this.termSource.asObservable();

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
