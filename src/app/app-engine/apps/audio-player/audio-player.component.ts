import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnChanges {

  @Input() msbapAudioUrl: string;
  title: string;

  constructor() { }

  ngOnChanges() {
    this.title = this.msbapAudioUrl;
  }

}
