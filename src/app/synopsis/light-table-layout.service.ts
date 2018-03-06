import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LightTableLayoutService {

  private numberOfColumnsSource = new Subject<number>();
  numberOfColumns$ = this.numberOfColumnsSource.asObservable();
  private tiledLayoutSource = new Subject<boolean>();
  tiledLayout$ = this.tiledLayoutSource.asObservable();

  numberOfColumns(cols: number) {
    this.numberOfColumnsSource.next(cols);
  }

  tiledLayout(tiled: boolean) {
    this.tiledLayoutSource.next(tiled);
  }

}
