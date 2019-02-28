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

  private numberOfMatchesSource = new Subject<number>();
  numberOfMatches$ = this.numberOfMatchesSource.asObservable();

  private shiftIndexOfFocusSource = new Subject<boolean>();
  shiftIndexOfFocus$ = this.shiftIndexOfFocusSource.asObservable();

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

  find(term: string) {
    this.termSource.next(term);
  }

  setNumberOfMatches(matches: number) {
    this.numberOfMatchesSource.next(matches);
  }

  shiftIndexOfFocus(increase: boolean) {
    this.shiftIndexOfFocusSource.next(increase);
  }


  // clearFind() {
  // }

}
