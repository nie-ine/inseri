import {Component, EventEmitter, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {
  Input, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';

import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import {GeneralRequestService} from '../../../query-engine/general/general-request.service';
import {ActivatedRoute} from '@angular/router';
import {type} from 'os';

@Component({
  selector: 'app-canvas-whiteboard',
  templateUrl: './canvas-whiteboard.component.html',
  styles: ['canvas { border: 1px solid #000; }']
})
export class CanvasWhiteboardComponent implements AfterViewInit, OnChanges {

  // a reference to the canvas element from our template
  @ViewChild('canvas') public canvas: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400;
  @Input() textFile = [];
  @Input() appInputQueryMapping: string;
  @Input() hash: string;
  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private requestService: GeneralRequestService,
    public route: ActivatedRoute
  ) { }

  private cx: CanvasRenderingContext2D;

  ngOnChanges() {
    this.textFile = JSON.parse( this.textFile as any );
    // console.log( this.textFile );
    if ( this.textFile.length > 0 ) {
      // get the context
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      this.cx = canvasEl.getContext('2d');

      // set the width and height
      canvasEl.width = this.width;
      canvasEl.height = this.height;

      // set some default properties about the line
      this.cx.lineWidth = 3;
      this.cx.lineCap = 'round';
      this.cx.strokeStyle = '#000';

      // we'll implement this method to start capturing mouse events
      this.captureEvents(canvasEl);
      for ( const move of this.textFile ) {
        this.drawOnCanvas( move.prevPos, move.prevPos );
      }
    }
  }

  public ngAfterViewInit() {

    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl);

    // console.log( this.textFile );
    // if ( this.textFile ) {
    //   for ( const move of this.textFile ) {
    //     this.drawOnCanvas( move.prevPos, move.prevPos );
    //   }
    // }
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };
        console.log( this.textFile, typeof this.textFile );
        if ( typeof this.textFile === 'string' || this.textFile === undefined ) {
          this.textFile = [];
          this.textFile.push( {
            prevPos: prevPos,
            currentPos: currentPos
          } );
        }
        if ( this.textFile.length ) {
          this.textFile.push( {
            prevPos: prevPos,
            currentPos: currentPos
          } );
        }
        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {

    // incase the context is not set
    if (!this.cx) { return; }

    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }

  save() {
    this.requestService.updateFile(
      this.appInputQueryMapping[ this.hash ][ 'textFile' ][ 'serverUrl' ].split('/')[ 6 ], {
        textFile: JSON.stringify(this.textFile)
      }
      ).subscribe(
        data => {
          console.log( data );
        }, error => console.log( error )
      );
    this.reloadVariables.emit();
  }

}

