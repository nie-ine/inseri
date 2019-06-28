import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';

@Component({
  selector: 'app-joined-text-textwrapper',
  templateUrl: './joined-text-textwrapper.component.html',
  styleUrls: ['./joined-text-textwrapper.component.scss']
})
export class JoinedTextTextwrapperComponent implements OnInit {

  @Input() resource: any;

  @Input() propertyIri: string;

  @Input() namespaces: any;

  @Input() styleDeclarations: Array<StyleDeclaration>;

  /**
   * Dynamic style declarations.
   */
  @Input() selectiveStyleDeclarations: SelectableEnvironments;

  /**
   * Keys of selected selectiveStyleDeclarations.
   */
  @Input() highlighted: Array<string>;

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

  propertyKey: string;

  constructor() { }

  ngOnInit() {
    if (this.propertyIri && this.namespaces) {
      let tempKey = this.propertyIri;

      // Change from simple API Knora namespaces to prefixes
      tempKey = tempKey.replace('/simple/v2#', '/v2#');
      for (const ns of Object.keys(this.namespaces)) {
        tempKey = tempKey.replace(this.namespaces[ns], ns + ':');
      }

      this.propertyKey = tempKey;
    }
  }

}
