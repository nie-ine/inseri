import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export interface ObjectDimensions {
  width: number;
  height: number;
  mouseOffsetX: number;
  mouseOffsetY: number;
}

@Injectable()
export class DragService {

  private zone: string;
  objectDimensions: ObjectDimensions = {
    width: 0,
    height: 0,
    mouseOffsetX: 0,
    mouseOffsetY: 0
  };

  private draggingSource = new Subject<boolean>();
  dragging$ = this.draggingSource.asObservable();

  startDrag(zone: string) {
    this.zone = zone;
    this.draggingSource.next(true);
  }

  endDrag() {
    this.draggingSource.next(false);
  }

  accepts(zone: string): boolean {
    return zone === this.zone;
  }

  propagateObjectDimensions(width: number, height: number, mouseOffsetX: number, mouseOffsetY: number) {
    this.objectDimensions.width = width;
    this.objectDimensions.height = height;
    this.objectDimensions.mouseOffsetX = mouseOffsetX;
    this.objectDimensions.mouseOffsetY = mouseOffsetY;
  }

}
