import { Component, Input, OnInit } from '@angular/core';
import { SynopsisObject } from '../synopsis-object';
import { SynopsisTextData } from '../synopsis-object-data';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-floating-text-object',
  templateUrl: './floating-text-object.component.html',
  styleUrls: ['./floating-text-object.component.scss']
})
export class FloatingTextObjectComponent implements SynopsisObject, OnInit {
  @Input() data: SynopsisTextData;
  safeHtml: SafeHtml;
  showMenu = false;

  constructor(private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.data.htmlText);
  }

  toggleShowMenu(state: boolean) {
    this.showMenu = state;
  }

}
