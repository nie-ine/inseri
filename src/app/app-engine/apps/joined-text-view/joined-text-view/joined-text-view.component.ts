import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';
import { JoinedTextViewRoot } from './joined-text-view';

@Component({
  selector: 'app-joined-text-view',
  templateUrl: './joined-text-view.component.html',
  styleUrls: ['./joined-text-view.component.scss']
})
export class JoinedTextViewComponent implements OnChanges {

  /**
   * Address to the Knora instance with the text resources.
   */
  @Input() backendAddress: string;

  /**
   * IRI of the resource that holds the parts of the text, unless `queryParamForTextRootIri` is defined.
   */
  @Input() textRootIri: string;

  /**
   * Query parameter where the IRI of the text resource comes in, as an alternative to textRootIri.
   */
  @Input() queryParamForTextRootIri: string;

  /**
   * Configuration for the displayed text.
   */
  @Input() textConfiguration: JoinedTextViewRoot;

  /**
   * Default style declarations.
   */
  @Input() styleDeclarations: Array<StyleDeclaration>;

  /**
   * Dynamic style declarations.
   */
  @Input() selectiveStyleDeclarations: SelectableEnvironments;

  /**
   * Variable for the value of textRootIri or queryParamForTextRootIri, depending on configuration.
   */
  internalTextRootIri: string;

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

  /**
   * Constructor
   * @param _route  Activated route for this component
   * @param _router  Router for navigation
   */
  constructor(private _route: ActivatedRoute, private _router: Router) { }

  /**
   * Subscribe to the query parameters for focus, hovering and other selections.
   */
  ngOnChanges() {
    this._route.queryParams.subscribe(params => {
      this.highlighted = [].concat(params.style);
      this.clickedResource = params.focus;
      this.hoveredResource = params.hover;
      if (this.queryParamForTextRootIri) {
        this.internalTextRootIri = params[this.queryParamForTextRootIri];
      }
    });

    if (!this.queryParamForTextRootIri) {
      this.internalTextRootIri = this.textRootIri;
    }
  }

  /**
   * Update the query parameter `focus` after clicking on a resource.
   * @param resIri  IRI of the clicked resource.
   */
  clickChange(resIri: string) {
    this._router.navigate([], {relativeTo: this._route, queryParams: {focus: resIri}, queryParamsHandling: 'merge'});
  }

  /**
   * Update the query parameter `hover` after moving the mouse pointer.
   * @param resIri  IRI of the resource under the mouse pointer
   */
  hoverChange(resIri: string) {
    this._router.navigate([], {relativeTo: this._route, queryParams: {hover: resIri}, queryParamsHandling: 'merge'});
  }

}
