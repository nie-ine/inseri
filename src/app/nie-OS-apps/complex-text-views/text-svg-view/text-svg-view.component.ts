import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { IIIFImage } from '../../shared/IIIFImage';

declare let OpenSeadragon: any;

require('../../../shared/svg-overlay/openseadragon-svg-overlay.js');


@Component({
  selector: 'app-text-svg-view',
  templateUrl: './text-svg-view.component.html',
  styleUrls: ['./text-svg-view.component.scss']
})
export class TextSvgViewComponent implements OnInit, OnChanges, OnDestroy {

  /**
   * True if the words in the transcription should be shown.
   */
  @Input() showWords = false;

  /**
   * Show the transcription of a word if it is hovered or clicked.
   */
  @Input() showHighlightedWord = true;

  /**
   * The image can be whited out. 1 means that the image is fully visible. 0 means that it's hidden.
   */
  @Input() imageOpacity = 0.4;

  /**
   * IIIFImage object for the background image.
   */
  @Input() image: IIIFImage;

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
   * Give an event containing the unique word id if a word on the page description is clicked
   */
  @Output() clickedWordChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The unique id of the word that was previously clicked and counts as activated. This makes change handling easier.
   */
  oldClickedWord: string;

  /**
   * The unique id of the word the mouse is hovering on.
   */
  @Input() hoveredWord: string;

  /**
   * Give an event containing the unique word id if the mouse hovers on a word in the page description
   */
  @Output() hoveredWordChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The unique id of the word the mouse is hovering on. This makes change handling easier.
   */
  oldhoveredWord: string;

  /**
   * The OpenSeaDragon viewer
   */
  private viewer;

  /**
   * Factor to normalize the coordinates to the overlay. Determined by the picture length.
   */
  private normalizeCoordinates: number;

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
   * On the first change the viewer is set up.
   * On changes of the page tree, the words are drawn.
   * On changes about activated or hovered words, the functions for highlighting are called.
   * @param changes: Input changes
   */
  ngOnChanges(changes: { [key: string]: SimpleChange }) {

    // set up the viewer on the first change
    if (changes['pageTree'] && changes['pageTree'].isFirstChange()) {
      this.setupViewer();
    }

    // open the image if it changes
    if (changes['image']) {
      this.openImage();
    }

    // redraw the tree if it changes
    if (changes['pageTree']) {
      if (this.pageTree.pageWidth > this.pageTree.pageHeight) {
        this.normalizeCoordinates = 1 / this.pageTree.pageWidth;
      } else {
        this.normalizeCoordinates = 1 / this.pageTree.pageHeight;
      }

      // normalize to width due to input data
      this.normalizeCoordinates = 1 / this.pageTree.pageWidth;

      this.drawWords();
    }

    // change visibility of the words
    if (changes['showWords']) {
      this.changeWordAppearance();
    }

    // change the opacity of the image
    if (changes['imageOpacity']) {
      this.changeOpacity();
    }

    // change the opacity of the image
    if (changes['showHighlightedWord']) {
      this.changeOpacity();
    }

    // change the hovered word
    if (changes['hoveredWord']) {
      if (this.hoveredWord) {
        this.hoverOntoWord(this.hoveredWord);
      } else {
        this.hoverOutOfWord();
      }
    }

    // change the clicked word
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
   * When a word is clicked, set the variable clickedWord to a words unique identifier and communicate this as output clickedWordChange.
   * @param wordIri: the unique identifier of a text element that is clicked
   */
  clickWord(wordIri: string) {
    this.clickedWord = wordIri;
    this.clickedWordChange.emit(this.clickedWord);

    // get the rectangle node of the word
    const word = document.getElementById('word-rect--' + wordIri);
    if (word) {
      word.setAttribute('style', this.clickedStyle);
    }

    if (this.showHighlightedWord && !this.showWords) {
      const wordTranscription = document.getElementById('word-text--' + wordIri);
      if (wordTranscription) {
        wordTranscription.setAttribute('visibility', 'visible');
      }
    }

    // remove highighting from old focused word
    if (this.oldClickedWord) {
      const oldWord = document.getElementById('word-rect--' + this.oldClickedWord);
      if (oldWord) {
        oldWord.setAttribute('style', this.neutralStyle);
      }

      if (this.showHighlightedWord && !this.showWords) {
        const oldWordTranscription = document.getElementById('word-text--' + this.oldClickedWord);
        if (oldWordTranscription) {
          oldWordTranscription.setAttribute('visibility', 'hidden');
        }
      }
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
      if (word) {
        word.setAttribute('style', this.hoverStyle);
      }
    }

    if (this.showHighlightedWord && !this.showWords) {
      const wordTranscription = document.getElementById('word-text--' + wordIri);
      if (wordTranscription) {
        wordTranscription.setAttribute('visibility', 'visible');
      }
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
      if (word) {
        word.setAttribute('style', this.neutralStyle);
      }

      if (this.showHighlightedWord && !this.showWords) {
        const wordTranscription = document.getElementById('word-text--' + this.oldhoveredWord);
        if (wordTranscription) {
          wordTranscription.setAttribute('visibility', 'hidden');
        }
      }

      this.oldhoveredWord = null;
    }
  }

  /**
   * Change the opacity of the lay-over on the image to make some image opacity.
   */
  private changeOpacity() {
    const paceOpacityRect = document.getElementById('text-page--' + this.pageTree.pageId);
    if (paceOpacityRect) {
      paceOpacityRect.setAttribute('style', 'fill: white; fill-opacity:' + (1 - this.imageOpacity).toString());
    }
  }

  /**
   * Apply visibility on the transcription words
   */
  private changeWordAppearance() {
    const words = document.getElementsByClassName('word-text-class');
    if (this.showWords) {
      for (let i = 0; i < words.length; i++) {
        words[i].setAttribute('visibility', 'visible');
      }
    } else {
      for (let i = 0; i < words.length; i++) {
        words[i].setAttribute('visibility', 'hidden');
      }
    }
  }

  /**
   * Add an SVG to the viewer containing the transcribed words and the boxes around them. The boxes can be hovered on and
   * TODO later also be clicked.
   */
  drawWords() {
    const overlay = this.viewer.svgOverlay();

    const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    svgGroup.setAttribute('transform', 'scale(' + (1 / this.pageTree.pageWidth).toString() + ')');


    const wordElements = [];
    const rectElements = [];

    // BOX OVER THE WHOLE IMAGE TO CHANGE OPACITY
    const imageRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    imageRect.id = 'text-page--' + this.pageTree.pageId;

    // Place and shape of the image blur box
    imageRect.setAttribute('width', (this.pageTree.pageWidth).toString());
    imageRect.setAttribute('height', (this.pageTree.pageHeight).toString());
    imageRect.setAttribute('x', '0');
    imageRect.setAttribute('y', '0');

    // Color of the image blur box
    imageRect.setAttribute('style', 'fill: white; fill-opacity: ' + (1 - this.imageOpacity).toString());

    svgGroup.appendChild(imageRect);

    // PARTS FOR THE WORDS
    for (let l = 0; l < this.pageTree.lines.length; l++) {
      for (let w = 0; w < this.pageTree.lines[l].words.length; w++) {

        // Collect the rectangles
        const wordRect = this.buildWordRectangle(this.pageTree.lines[l].words[w]);
        rectElements.push(wordRect);

        // Collect the text elements
        const wordText = this.buildWordTextNode(this.pageTree.lines[l].words[w]);
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

    overlay.node().appendChild(svgGroup);
  }

  /**
   * Bild the text node for a word
   * @param word
   */
  private buildWordTextNode(word): Element {
    const wordText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    wordText.id = 'word-text--' + word.wordIri;
    wordText.setAttribute('class', 'word-text-class');

    // The words text
    const wordTextContent = word.textIri;  // TODO use SPA service here
    const wordTextNode = document.createTextNode(wordTextContent);

    // Position of Words
    wordText.setAttribute('x', ((word.ulx + word.lrx) / 2).toString());
    wordText.setAttribute('y', ((word.uly + word.lry) / 2).toString());
    wordText.setAttribute('text-anchor', 'middle');
    // wordText.setAttribute('dominant-baseline', 'middle'); // does not work in firefox
    wordText.setAttribute('visibility', 'visible');

    // Text style
    const fontSize = (1.8 * (( word.lrx - word.ulx) / wordTextContent.length ) );
    wordText.setAttribute('font-size', fontSize.toString());

    // wordText.setAttribute('font-size', (1 * (word.lry - word.uly) / this.maxSide).toString());
    wordText.setAttribute('fill', 'black');

    // Add content to the text element
    wordText.appendChild(wordTextNode);

    return wordText;
  }

  /**
   * Build the floating rectangle behind a word
   * @param word
   */
  private buildWordRectangle(word): Element {
    const wordRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    // Set the id for the word rectangle to be able to add styles
    wordRect.id = 'word-rect--' + word.wordIri;

    // Place and shape of the word boxes
    wordRect.setAttribute('width', (word.lrx - word.ulx).toString());
    wordRect.setAttribute('height', (word.lry - word.uly).toString());
    wordRect.setAttribute('x', (word.ulx).toString());
    wordRect.setAttribute('y', (word.uly).toString());

    // Color of the word boxes
    wordRect.setAttribute('style', this.neutralStyle);

    // Add events with mouse behavior
    wordRect.addEventListener('mouseenter', (e) => {
      this.hoverOntoWord(word.wordIri);
    });
    wordRect.addEventListener('mouseleave', (e) => {
      this.hoverOutOfWord();
    });
    wordRect.addEventListener('onclick', (e) => {
      this.clickWord(word.wordIri);
      e.preventDefault();
      e.stopPropagation();
    });
    // overlay.onClick(wordRect, this.clickWord(word.wordIri));

    return wordRect;
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

    const tileSource = this.image.tileSource();

    this.viewer.open([tileSource]);
  }


}
