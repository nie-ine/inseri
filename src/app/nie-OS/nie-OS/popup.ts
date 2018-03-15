import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  ContentChildren,
  QueryList,
  ElementRef,
  Renderer2 } from '@angular/core';
import 'rxjs/add/operator/map';

declare var grapesjs: any; // Important!

@Component({
  selector: 'popup',
  templateUrl: 'popup.html',
  styleUrls: ['popup.css']
})
export class Popup {

  show = false;

  @Input() title: string;

  mousemoveEvent: any;
  mouseupEvent: any;

  firstPopupX = 100;
  firstPopupY = 100;
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

  isMouseBtnOnPress: boolean;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
    this.mouseup = this.unboundMouseup.bind(this);
    this.dragging = this.unboundDragging.bind(this);
  }

  ngOnInit() {
    const editor = grapesjs.init({
      container: '#grapesJSViewer',
      components: '<div class="txt-red">Hello world!</div>',
      style: '.txt-red{color: red}',
    });

    const blockManager = editor.BlockManager;

    blockManager.add('konvolut-titel', {
      label: 'Vokabulare in Knora',
      attributes: { class:'fa fa-newspaper-o' },
      content:  '<div>NIE-INE test</div>',
    });
  }

  appear() {
    //prevent drag event
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
    this.curX = this.xStartElementPoint + (event.pageX - this.xStartMousePoint);
    this.curY = this.yStartElementPoint + (event.pageY - this.yStartMousePoint);
  }
}
