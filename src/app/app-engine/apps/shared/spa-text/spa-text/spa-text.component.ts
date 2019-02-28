import { Component, Input, OnInit } from '@angular/core';

/**
 * This component is as of now a placeholder and should later be expanded to its full functionality for positional semantic annotations.
 */
@Component({
  selector: 'app-spa-text',
  templateUrl: './spa-text.component.html',
  styleUrls: ['./spa-text.component.scss']
})
export class SpaTextComponent implements OnInit {

  /**
   * The IRI of the text element that has annotations.
   */
  @Input() spaTextIri: string;

  constructor() { }

  /**
   * written by angular-cli
   */
  ngOnInit() {
  }

}
