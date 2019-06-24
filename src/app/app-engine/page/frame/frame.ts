import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  ContentChildren,
  QueryList,
  ElementRef,
  Renderer2, OnInit, OnChanges
} from '@angular/core';
import 'rxjs/add/operator/map';
import {MatDialog} from '@angular/material';
import { FrameSettingsComponent } from '../frame-settings/frame-settings.component';

@Component({
  selector: 'popup',
  templateUrl: 'frame.html',
  styleUrls: ['frame.css']
})
export class Frame implements OnInit, OnChanges {

  show = false;

  @Input() title: string;
  @Input() type: string;
  @Input() id: number;
  @Input() firstPopupX: number;
  @Input() firstPopupY: number;
  @Input() hash: string;
  @Input() width: number;
  @Input() height: number;
  @Input() index: number = undefined;
  @Input() arrayLength: number = undefined;
  @Input() queryId: string;
  @Input() position = 'absolute';
  @Input() fullWidth: string;
  @Output() sendAppCoordinatesBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendAppSettingsBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendIndexBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendTiledPositionBack: EventEmitter<any> = new EventEmitter<any>();

  mousemoveEvent: any;
  mouseupEvent: any;
  firstPopupZ = 3;
  xStep = 30;
  yStep = 30;
  zStep = 3;
  curX: any;
  curY: any;
  curZIndex: any;
  xStartElementPoint: number;
  yStartElementPoint: number;
  xStartMousePoint: number;
  yStartMousePoint: number;
  fatherPopup: any;
  sendCoordinatesBack: any;
  isMouseBtnOnPress: boolean;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {
    this.mouseup = this.unboundMouseup.bind(this);
    this.dragging = this.unboundDragging.bind(this);
  }

  ngOnChanges() {
    // console.log('changes');
  }

  ngOnInit() {
    // If coordinates of window are set through input, let it appear
    if ( this.firstPopupX && this.firstPopupY ) {
      this.appear();
    } else {
      this.firstPopupX = 100;
      this.firstPopupY = 100;
    }
  }

  appear() {
    // prevent drag event
    document.getSelection().removeAllRanges();
    this.setPos();
    this.show = true;
  }

  disappear() {
    this.show = false;
  }

  setPos() {
    if (this.fatherPopup == undefined) {
      this.curX = this.firstPopupX;
      this.curY = this.firstPopupY;
      this.curZIndex = this.firstPopupZ;
    }
    else {
      this.curX = this.fatherPopup.curX + this.xStep;
      this.curY = this.fatherPopup.curY + this.yStep;
      this.curZIndex = this.fatherPopup.curZIndex + this.zStep;
    }
  }

  mouseup: (event: any) => void;
  unboundMouseup(event: any) {
    // Remove listeners
    this.mousemoveEvent();
    this.mouseupEvent();
  }

  mousedown(event: any) {
    if (event.button === 0/*only left mouse click*/) {
      this.xStartElementPoint = this.curX;
      this.yStartElementPoint = this.curY;
      this.xStartMousePoint = event.pageX;
      this.yStartMousePoint = event.pageY;

      // if listeners exist, first Remove listeners
      if (this.mousemoveEvent)
        this.mousemoveEvent();
      if (this.mouseupEvent)
        this.mouseupEvent();

      this.mousemoveEvent = this.renderer.listen("document", "mousemove", this.dragging);
      this.mouseupEvent = this.renderer.listen("document", "mouseup", this.mouseup);
    }
  }
  dragging: (event: any) => void;
  unboundDragging(event: any) {
    this.sendCoordinatesBack = {};
    this.sendCoordinatesBack.x = this.curX;
    this.sendCoordinatesBack.y = this.curY;
    this.sendCoordinatesBack.type = this.type;
    this.sendCoordinatesBack.hash = this.hash;
    this.sendCoordinatesBack.title = this.title;
    this.sendCoordinatesBack.width = this.width;
    this.sendCoordinatesBack.height = this.height;
    console.log(this.sendCoordinatesBack);
    this.sendAppCoordinatesBack.emit(
      this.sendCoordinatesBack
    );
    this.curX = this.xStartElementPoint + (event.pageX - this.xStartMousePoint);
    this.curY = this.yStartElementPoint + (event.pageY - this.yStartMousePoint);
  }

  openSettings() {
    console.log( 'Open Settings' );
    const dialogRef = this.dialog.open(FrameSettingsComponent, {
      width: '50%',
      height: '50%',
      data: [
        this.title,
        this.width,
        this.height
      ]
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if ( result ) {
        this.sendAppSettingsBack.emit(
          {
            title: result[ 0 ],
            width: result[ 1 ],
            height: result[ 2 ],
            hash: this.hash,
            type: this.type,
            fullWidth: result[ 3 ]
          }
        );
        // this.title = result.title;
      }
    });
  }

  emitIndex() {
    console.log( this.index, this.hash );
    this.sendIndexBack.emit(
      {
        index: this.index,
        hash: this.hash,
        queryId: this.queryId
      }
    );
  }

  up() {
    console.log( 'up' );
    this.sendTiledPositionBack.emit(
      {
        move: 'up',
        hash: this.hash,
        y: this.curY,
        type: this.type,
        index: this.index
      }
    );
  }

  down() {
    console.log( 'down' );
    this.sendTiledPositionBack.emit(
      {
        move: 'down',
        hash: this.hash,
        y: this.curY,
        type: this.type,
        index: this.index
      }
    );
  }
}
