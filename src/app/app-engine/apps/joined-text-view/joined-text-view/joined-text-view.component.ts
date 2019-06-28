import { Component, Input, OnInit } from '@angular/core';
import { JoinedTextBlock } from '../joined-text-block/joined-text-block.component';
import { JoinedTextLine } from '../joined-text-line/joined-text-line.component';
import { ActivatedRoute } from '@angular/router';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';
import { IIIFImage } from '../../shared/IIIFImage';

export interface JoinedTextElement {
  propertyIri: string;
  propertyDirection: string;
  contentPropertyIri?: string;
  contentProperty?: string;
}

export interface JoinedTextViewRoot {
  blocks?: JoinedTextBlock;
  lines?: JoinedTextLine;
}

@Component({
  selector: 'app-joined-text-view',
  templateUrl: './joined-text-view.component.html',
  styleUrls: ['./joined-text-view.component.scss']
})
export class JoinedTextViewComponent implements OnInit {

  @Input() backendAddress: string;

  @Input() textRootIri: string;

  @Input() textConfiguration: JoinedTextViewRoot;

  // TODO:
  // - Include a component for columns
  // - Include sorting
  // - add css classes with component type and depth in their title
  // - Turn into app
  // - Enable click and mouseover events (input switches and events in components)
  // - Clean code and comment
  // - Remove CSS functionalities if possible with StyleDeclaration
  // - Is margin replaceable by block? Can linepart and word be merged?
  // - Sync with TextSvgViewWrapperComponent

  @Input() styleDeclarations: Array<StyleDeclaration>;

  /**
   * Dynamic style declarations.
   */
  @Input() selectiveStyleDeclarations: SelectableEnvironments;

  /**
   * Keys of selected selectiveStyleDeclarations.
   */
  highlighted: Array<string>;

  /**
   * The unique id of the word that was last clicked and counts as activated. Only one word can be counted as activated at a time.
   */
  clickedWord: string;

  /**
   * The unique id of the word the mouse is hovering on.
   */
  hoveredWord: string;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.highlighted = [].concat(params.style);
      this.clickedWord = params.focus;
      this.hoveredWord = params.hover;
    });
  }

}
