import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class LightTableLayoutService {

  private numberOfColumnsSource = new ReplaySubject<number>(1);
  numberOfColumns$ = this.numberOfColumnsSource.asObservable();
  private tiledLayoutSource = new ReplaySubject<boolean>(1);
  tiledLayout$ = this.tiledLayoutSource.asObservable();

  numberOfColumns(cols: number) {
    this.numberOfColumnsSource.next(cols);
  }

  tiledLayout(tiled: boolean) {
    this.tiledLayoutSource.next(tiled);
  }

}
