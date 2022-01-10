import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.scss']
})
export class YoutubeVideoComponent implements OnInit, OnChanges {
  safeURL: any;
  @Input()  videoURL = '';

  constructor(
    private _sanitizer: DomSanitizer
  ) {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
  }

  ngOnInit() {
  }

  setNewVideo() {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
  }

}
