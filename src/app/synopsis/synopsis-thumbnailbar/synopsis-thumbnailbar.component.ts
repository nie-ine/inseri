import {Component, OnInit} from '@angular/core';
import {SynopsisImageData, SynopsisTextData} from '../synopsis-object-data';

@Component({
  selector: 'app-synopsis-thumbnailbar',
  templateUrl: './synopsis-thumbnailbar.component.html',
  styleUrls: ['./synopsis-thumbnailbar.component.scss']
})
export class SynopsisThumbnailbarComponent implements OnInit {

  thumbnails = [
    new SynopsisTextData('A text', '<h3>A title...</h3><p>...with a text in <i>italic</i> and <b>bold</b>'),
    new SynopsisImageData('A plane', '../../../assets/img/about/2.jpg')
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
