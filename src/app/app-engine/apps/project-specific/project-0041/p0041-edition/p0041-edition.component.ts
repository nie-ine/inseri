import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p0041-edition',
  templateUrl: './p0041-edition.component.html',
  styleUrls: ['./p0041-edition.component.scss']
})
export class P0041EditionComponent implements OnInit {

  kandaIRI = 'http://rdfh.ch/0041/07GyRR1fQLSjaIlAjRTq_Q';
  suktaIRI = 'http://rdfh.ch/0041/CEdPhqFoRqa4JMrLokpwHw';
  stropheIRI = 'http://rdfh.ch/0041/WA9dphq9RpmXkq5nSo6q3Q';

  backendAddress = 'http://localhost:3333';

  constructor() { }

  ngOnInit() {
  }

}
