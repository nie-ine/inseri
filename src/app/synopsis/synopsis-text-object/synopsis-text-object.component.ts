import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {SynopsisObject} from '../synopsis-object';
import {SynopsisTextData} from '../synopsis-object-data';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-synopsis-text-object',
  templateUrl: './synopsis-text-object.component.html',
  styleUrls: ['./synopsis-text-object.component.scss']
})
export class SynopsisTextObjectComponent implements SynopsisObject, OnInit {
  @Input() data: SynopsisTextData;
  safeHtml: SafeHtml;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.data.htmlText);
  }

}
