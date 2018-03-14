import {Injectable} from '@angular/core';

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

  startDrag(zone: string) {
    this.zone = zone;
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
