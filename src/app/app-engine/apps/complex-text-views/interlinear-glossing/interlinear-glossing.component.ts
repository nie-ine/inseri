import { Component, OnInit } from '@angular/core';
import { Token } from './token';

@Component({
  selector: 'app-interlinear-glossing',
  templateUrl: './interlinear-glossing.component.html',
  styleUrls: ['./interlinear-glossing.component.css']
})
export class InterlinearGlossingComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
