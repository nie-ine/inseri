import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-p0041-edition',
  templateUrl: './p0041-edition.component.html',
  styleUrls: ['./p0041-edition.component.scss']
})
export class P0041EditionComponent implements OnInit {

  // TODO remove default values
  kandaIRI = 'http://rdfh.ch/0041/07GyRR1fQLSjaIlAjRTq_Q';
  suktaIRI = 'http://rdfh.ch/0041/CEdPhqFoRqa4JMrLokpwHw';
  stropheIRI = 'http://rdfh.ch/0041/WA9dphq9RpmXkq5nSo6q3Q';

  @Input() backendAddress = 'http://localhost:3333';

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.kandaIRI = params.d1;
      this.suktaIRI = params.d2;
      this.stropheIRI = params.d3;
    });
  }



}
