import {Component, ElementRef, Inject, OnInit, Renderer2} from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare var Browserling: any;

@Component({
  selector: 'app-browserling',
  templateUrl: './browserling.component.html',
  styleUrls: ['./browserling.component.scss']
})
export class BrowserlingComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document
  ) { }

  ngOnInit() {
    const browserling = new Browserling('1234');
    browserling.setBrowser('ie');
    browserling.setVersion('9');
    browserling.setUrl('http://www.catonmat.net');
    console.log( browserling );
    const div = document.querySelector('#browserling');
    div.appendChild(browserling.iframe());
    this.renderer.appendChild(this.elementRef.nativeElement, div);
  }

}
