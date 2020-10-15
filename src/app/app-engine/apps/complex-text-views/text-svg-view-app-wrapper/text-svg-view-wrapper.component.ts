import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IIIFImage } from '../../shared/IIIFImage';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTree } from '../models/page-tree.model';
import { PAGETRANSCRIPTION } from '../page-transcription';

/**
 * This component wraps a text-svg-view component to make it usable as a NIE-OS app.
 */
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

  /**
   * The maximal width of the IIIF image in pixels.
   */
  @Input() width: number;

  /**
   * The maximal height of the IIIF image in pixels.
   */
  @Input() height: number;

  /**
   * The data of a page as a tree of lines and words, each element with an unique identifier.
   */
  @Input() pageTree: PageTree;

  @Input() viewerWidth = 900;

  @Input() viewerHeight = 1200;

  /**
   * The unique id of the word the mouse is hovering on.
   */
  @Input() hoveredWord: string;

  /**
   * Give an event containing the unique word id if the mouse hovers on a word in the page description
   */
  @Output() hoveredWordChange: EventEmitter<string> = new EventEmitter<string>();

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
   * The image can be whited out. 0 means that the image is fully visible. 1 means that it's hidden.
   */
  imageOpacity = 0.4;

  /**
   * The object that contains the information of the IIIF image for input in openseadragon.
   */
  image: IIIFImage;

  /**
   * Constructor initializes ActivatedRoute
   * @param _route  Enables access to the query parameters.
   * @param _router   Router for navigation.
   */
  constructor(private _route: ActivatedRoute, private _router: Router) { }

  /**
   * default written by angular-cli
   */
  ngOnInit() {
  }

  /**
   * Change properties if the query parameters or the input variables change.
   */
  ngOnChanges() {
    if (this.imageUrl === undefined && this.width === undefined && this.height === undefined && this.pageTree === undefined) {
      this.imageUrl = 'https://www.e-manuscripta.ch/zuz/i3f/v20/1510618/full/full/0/default.jpg';
      this.width = 3062;
      this.height = 4034;
      this.pageTree = PAGETRANSCRIPTION;
    }

    // Change properties if the query parameters change.
    this._route.queryParams.subscribe(params => {
      this.clickedWord = params.focus;
      this.showWords = params.showWords;
      this.showHighlightedWord = params.showFocus;
      this.imageOpacity = params.imageOpacity;
    });

    // Replace the IIIFImage object if its properties change.
    if (this.imageUrl && this.width && this.height) {
      this.image = new IIIFImage(this.imageUrl, this.width, this.height);
    }
  }

  clickChange(resIri: string) {
    this._router.navigate([], {relativeTo: this._route, queryParams: {focus: resIri}, queryParamsHandling: 'merge'});
  }

}
