import { Component, OnInit } from '@angular/core';
import { Token } from './token';

/**
 * This component shows morphological annotations of text in the form of a table.
 * TODO: at this point of time, it only shows example data and is not yet parameterized
 */
@Component({
  selector: 'app-interlinear-glossing',
  templateUrl: './interlinear-glossing.component.html',
  styleUrls: ['./interlinear-glossing.component.css']
})
export class InterlinearGlossingComponent implements OnInit {

  /**
   * A list of tokens with the literal content in the token filed and the annotations in the glosses field.
   */
  interlinear: Array<Token> = [
    new Token('Das', ['p', 'this']),
    new Token('ist', ['v', 'is']),
    new Token('ein', ['d', 'a']),
    new Token('langes', ['adj', 'long']),
    new Token('Beispiel', ['n', 'example']),
    new Token(',', ['$,', ',']),
    new Token('das', ['p', 'that']),
    new Token('einen', ['d', 'a']),
    new Token('Zeilenumbruch', ['n', 'line-break']),
    new Token('sicherstellt', ['n', 'ensures']),
    new Token('.', ['$.', '.'])
  ];

  /**
   * written by angular-cli
   */
  constructor() { }

  /**
   * written by angular-cli
   */
  ngOnInit() {
  }

}
