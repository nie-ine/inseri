import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';

declare let OpenSeadragon: any;

require("../../../shared/svg-overlay/openseadragon-svg-overlay.js");


@Component({
  selector: 'app-text-svg-view',
  templateUrl: './text-svg-view.component.html',
  styleUrls: ['./text-svg-view.component.scss']
})
export class TextSvgViewComponent implements OnInit, OnChanges, OnDestroy {

  @Input() image;

  /**
   * The data of a page as a tree of lines and words, each element with an unique identifier.
   * TODO: class describing this.
   */
  @Input() pageTree;

  /**
   * The unique id of the word that was last clicked and counts as activated. Only one word can be counted as activated at a time.
   */
  @Input() clickedWord: string;

  /**
   * The unique id of the word that was previously clicked and counts as activated. This makes change handling easier.
   */
  oldClickedWord: string;

  /**
   * Give an event containing the unique word id if a word on the page description is clicked
   */
  @Output() clickedWordChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The unique id of the word the mouse is hovering on.
   */
  @Input() hoveredWord: string;

  /**
   * The unique id of the word the mouse is hovering on. This makes change handling easier.
   */
  oldhoveredWord: string;

  /**
   * Give an event containing the unique word id if the mouse hovers on a word in the page description
   */
  @Output() hoveredWordChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The OpenSeaDragon viewer
   */
  private viewer;

  /**
   * The bigger side of the page rectangle to divide the ratio.
   */
  private maxSide;

  /**
   * The style of words with highlighting by hovering.
   * TODO add customization
   */
  hoverStyle = 'fill: cyan; fill-opacity: 0.2;';

  /**
   * No style without hovering or activating. This is used to overwrite highlighting.
   * TODO add customization
   */
  neutralStyle = 'fill: white; fill-opacity: 0;';

  /**
   * The style of the word that is activated.
   * TODO add customization
   */
  clickedStyle = 'fill: cyan; fill-opacity: 0.6;';

  /**
   * TODO: comment
   * @param elementRef
   */
  constructor(private elementRef: ElementRef) { }


  /**
   * default written by angular-cli
   */
  ngOnInit() {
  }

  /**
   * When a word is clicked, set the variable clickedWord to a words unique identifier and communicate this as output clickedWordChange.
   * @param wordIri: the unique identifier of a text element that is clicked
   */
  clickWord(wordIri: string) {
    this.clickedWord = wordIri;
    this.clickedWordChange.emit(this.clickedWord);

    const word = document.getElementById('word-rect--' + wordIri);
    word.setAttribute('style', this.clickedStyle);

    // remove highighting from old focused word
    if (this.oldClickedWord) {
      const oldWord = document.getElementById('word-rect--' + this.oldClickedWord);
      oldWord.setAttribute('style', this.neutralStyle);
    }
    // keep the id for the removal of the hightlighting later
    this.oldClickedWord = this.clickedWord;
  }

  /**
   * When the mouse hovers on a word, set the variable hoveredWord to a words unique identifier and communicate this as output
   * hoveredWordChange.
   * @param wordIri: the unique identifier of a text element that is clicked
   */
  hoverOntoWord(wordIri: string) {
    this.hoveredWord = wordIri;
    this.hoveredWordChange.emit(this.hoveredWord);

    this.oldhoveredWord = this.hoveredWord;

    // only change style if the word is not under absolute focus
    if (wordIri !== this.clickedWord) {
      const word = document.getElementById('word-rect--' + wordIri);
      word.setAttribute('style', this.hoverStyle);
    }
  }

  /**
   * When the mouse leaves from a word, reset the variable hoveredWord and communicate this as output hoveredWordChange.
   */
  hoverOutOfWord() {
    this.hoveredWord = null;
    this.hoveredWordChange.emit(this.hoveredWord);

    // only change style if the word is not under absolute focus
    if (this.oldhoveredWord && this.oldhoveredWord !== this.clickedWord) {
      const word = document.getElementById('word-rect--' + this.oldhoveredWord);
      word.setAttribute('style', this.neutralStyle);
      this.oldhoveredWord = null;
    }
  }

  // copied

  /**
   * On the first change the viewer is set up.
   * On changes of the page tree, the words are drawn.
   * On changes about activated or hovered words, the functions for highlighting are called.
   * @param changes: Input changes
   */
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['pageTree'] && changes['pageTree'].isFirstChange()) {
      this.setupViewer();
    }

    if (changes['pageTree']) {
      if (this.pageTree.pageWidth > this.pageTree.pageHeight) {
        this.maxSide = this.pageTree.pageWidth;
      } else {
        this.maxSide = this.pageTree.pageHeight;
      }

      this.drawWords();
    }

    if (changes['hoveredWord']) {
      if (this.hoveredWord) {
        this.hoverOntoWord(this.hoveredWord);
      } else {
        this.hoverOutOfWord();
      }
      this.openImage();
    }

    if (changes['clickedWord']) {
      this.clickWord(this.clickedWord);
    }
  }

  /**
   * Close the viewer on destroy of the component.
   */
  ngOnDestroy() {
    if (this.viewer) {
      this.viewer.destroy();
      this.viewer = undefined;
    }
  }

  /**
   * Add an SVG to the viewer containing the transcribed words and the boxes around them. The boxes can be hovered on and
   * TODO later also be clicked.
   */
  drawWords() {
    const overlay = this.viewer.svgOverlay();

    const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    const wordElements = [];
    const rectElements = [];


    for (let l = 0; l < this.pageTree.lines.length; l++) {
      for (let w = 0; w < this.pageTree.lines[l].words.length; w++) {

        const word = this.pageTree.lines[l].words[w];

        // WORD BOXES

        const wordRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        // Set the id for the word rectangle to be able to add styles
        wordRect.id = 'word-rect--' + word.wordIri;

        // Place and shape of the word boxes
        wordRect.setAttribute('width', ((word.lrx - word.ulx) / this.maxSide).toString());
        wordRect.setAttribute('height', ((word.lry - word.uly) / this.maxSide).toString());
        wordRect.setAttribute('x', (word.ulx / this.maxSide).toString());
        wordRect.setAttribute('y', (word.uly / this.maxSide).toString());

        // Color of the word boxes
        wordRect.setAttribute('style', this.neutralStyle);

        // Add events with mouse behavior
        wordRect.addEventListener('mouseenter', (e) => {
          this.hoverOntoWord(word.wordIri);
        });
        wordRect.addEventListener('mouseleave', (e) => {
          this.hoverOutOfWord();
        });
        // overlay.onClick(wordRect, this.clickWord(word.wordIri));

        // Collect the rectangles
        rectElements.push(wordRect);

        // WORD TEXT

        const wordText = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        // Position of Words
        wordText.setAttribute('x', (word.ulx / this.maxSide).toString());
        wordText.setAttribute('y', ((word.lry) / this.maxSide).toString());

        // Text style
        // wordText.setAttribute('lengthAdjust', 'spacingAndGlyphs');
        wordText.setAttribute('font-size', (0.5 / this.maxSide) + 'em');
        wordText.setAttribute('fill', 'black');

        // Add content to the text element
        const wordTextNode = document.createTextNode(word.textIri);
        wordText.appendChild(wordTextNode);

        // Collect the text elements
        wordElements.push(wordText);

      }

      // Add first the words and then the rectangles to ensure that the rectangles are always in the foreground.
      for (let i = 0; i < wordElements.length; i++) {
        svgGroup.appendChild(wordElements[i]);
      }
      for (let i = 0; i < rectElements.length; i++) {
        svgGroup.appendChild(rectElements[i]);
      }
    }

    console.log(svgGroup);

    overlay.node().appendChild(svgGroup);
  }

  /**
   * Initialize the OpenSeaDragon viewer
   */
  private setupViewer(): void {
    const viewerContainer = this.elementRef.nativeElement.getElementsByClassName('osdViewerContainer')[0];
    const osdOptions = {
      element: viewerContainer,
      prefixUrl: '//openseadragon.github.io/openseadragon/images/',
      sequenceMode: false,
      showNavigator: false,
      defaultZoomLevel: 1,
      minZoomImageRatio: 1
    };
    this.viewer = new OpenSeadragon.Viewer(osdOptions);
  }

  /**
   * Open the background image from a IIIF Server.
   */
  private openImage(): void {

    const tileSource = {
      'tileSource': {
        '@context': 'http://iiif.io/api/image/2/context.json',
        '@id': this.image['knora-api:stillImageFileValueHasIIIFBaseUrl'] + '/'
          + this.image['knora-api:fileValueHasFilename'],
        'height': this.image['knora-api:stillImageFileValueHasDimY'],
        'width': this.image['knora-api:stillImageFileValueHasDimX'],
        'profile': ['http://iiif.io/api/image/2/level2.json'],
        'protocol': 'http://iiif.io/api/image',
        'tiles': [{
          'scaleFactors': [1, 2, 4, 8, 16, 32],
          'width': 1024
        }]
      },
      'x': 0,
      'y': 0
    };

    this.viewer.open([tileSource]);
  }


}
