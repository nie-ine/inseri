import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * This component shows page transcriptions with heavily annotated words on lines. The words can be hovered on or clicked for more info.
 */
@Component({
  selector: 'app-text-page-of-words',
  templateUrl: './text-page-of-words.component.html',
  styleUrls: ['./text-page-of-words.component.scss']
})
export class TextPageOfWordsComponent implements OnInit {

  /**
   * The data of a page as a tree of lines and words, each element with an unique identifier.
   * TODO: class describing this.
   */
  @Input() textTree;

  /**
   * The unique id of the word that was last clicked and counts as activated. Only one word can be counted as activated at a time.
   */
  @Input() clickedWord: string;

  /**
   * Give an event containing the unique word id if a word on the page description is clicked
   */
  @Output() clickedWordChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The unique id of the word the mouse is hovering on.
   */
  @Input() hoveredWord: string;

  /**
   * Give an event containing the unique word id if the mouse hovers on a word in the page description
   */
  @Output() hoveredWordChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * default written by angular-cli
   */
  constructor() { }

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
  }

  /**
   * When the mouse hovers on a word, set the variable hoveredWord to a words unique identifier and communicate this as output
   * hoveredWordChange.
   * @param wordIri: the unique identifier of a text element that is clicked
   */
  hoverOntoWord(wordIri: string) {
    this.hoveredWord = wordIri;
    this.hoveredWordChange.emit(this.hoveredWord);
  }

  /**
   * When the mouse leaves from a word, reset the variable hoveredWord and communicate this as output hoveredWordChange.
   */
  hoverOutOfWord() {
    this.hoveredWord = null;
    this.hoveredWordChange.emit(this.hoveredWord);
  }

}
