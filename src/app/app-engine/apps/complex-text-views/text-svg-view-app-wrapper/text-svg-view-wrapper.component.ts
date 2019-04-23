import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IIIFImage } from '../../shared/IIIFImage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-svg-view-wrapper',
  templateUrl: './text-svg-view-wrapper.component.html',
  styleUrls: ['./text-svg-view-wrapper.component.scss']
})
export class TextSvgViewWrapperComponent implements OnInit, OnChanges {

  /**
   * IIIFImage object for the background image.
   */
  @Input() imageUrl: string;

  @Input() width: number;

  @Input() height: number;

  /**
   * The data of a page as a tree of lines and words, each element with an unique identifier.
   * TODO: class describing this.
   */
  @Input() pageTree;

  /**
   * The unique id of the word that was last clicked and counts as activated. Only one word can be counted as activated at a time.
   */
  clickedWord: string;

  /**
   * True if the words in the transcription should be shown.
   */
  showWords = true;

  /**
   * Show the transcription of a word if it is hovered or clicked.
   */
  showHighlightedWord = true;

  /**
   * The image can be whited out. 1 means that the image is fully visible. 0 means that it's hidden.
   */
  imageOpacity = 0.4;

  /**
   * The unique id of the word the mouse is hovering on.
   */
  hoveredWord: string;

  image: IIIFImage;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this._route.queryParams.subscribe(params => {
      this.clickedWord = params.focus;
      this.showWords = params.showWords;
      this.showHighlightedWord = params.showFocus;
      this.imageOpacity = params.imageOpacity;
      this.hoveredWord = params.hover;
    });

    if (this.imageUrl && this.width && this.height) {
      this.image = new IIIFImage(this.imageUrl, this.width, this.height);
    }
  }

}
