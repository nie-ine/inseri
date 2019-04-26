import { Component, Input, OnInit } from '@angular/core';

/**
 * Combination of text lines into a specific form
 */
@Component({
  selector: 'app-text-line-group',
  templateUrl: './text-line-group.component.html',
  styleUrls: ['./text-line-group.component.scss']
})
export class TextLineGroupComponent implements OnInit {

  /**
   * Tree of text lines as input for the line group
   * TODO: specific class for this datatype
   */
  @Input() textTree;

  /**
   * default written by angular-cli
   */
  constructor() { }

  /**
   * written by angular-cli
   */
  ngOnInit() {
  }

}
