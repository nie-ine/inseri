import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { JoinedTextBlock } from '../joined-text-block/joined-text-block.component';
import { JoinedTextLine } from '../joined-text-line/joined-text-line.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';
import { IIIFImage } from '../../shared/IIIFImage';

export interface JoinedTextElement {
  propertyIri: string;
  propertyDirection: string;
  contentPropertyIri?: string;
  contentProperty?: string;
  sortByPropertyIri?: string;
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
export class JoinedTextViewComponent implements OnChanges {

  @Input() backendAddress: string;

  @Input() textRootIri: string;

  @Input() textConfiguration: JoinedTextViewRoot;

  // TODO:
  // - Turn into app
  // - add column functionality to block-component

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
  clickedResource: string;

  /**
   * The unique id of the word the mouse is hovering on.
   */
  hoveredResource: string;

  constructor(private _route: ActivatedRoute, private _router: Router) { }

  ngOnChanges() {
    this._route.queryParams.subscribe(params => {
      this.highlighted = [].concat(params.style);
      this.clickedResource = params.focus;
      this.hoveredResource = params.hover;
    });
  }

  clickChange(resIri: string) {
    this._router.navigate([], {relativeTo: this._route, queryParams: {focus: resIri}, queryParamsHandling: 'merge'});
  }

  hoverChange(resIri: string) {
    this._router.navigate([], {relativeTo: this._route, queryParams: {hover: resIri}, queryParamsHandling: 'merge'});
  }

}
