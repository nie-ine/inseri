import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {SynopsisTextData} from '../synopsis-object-data';

@Component({
  selector: 'app-tiled-text-object',
  templateUrl: './tiled-text-object.component.html',
  styleUrls: ['./tiled-text-object.component.scss']
})
export class TiledTextObjectComponent implements OnInit {
  @Input() data: SynopsisTextData;
  safeHtml: SafeHtml;
  showMenu = false;

  constructor(private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.data.htmlText);
  }

}
