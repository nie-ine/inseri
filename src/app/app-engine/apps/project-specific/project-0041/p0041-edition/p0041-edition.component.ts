import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * This component collects the different edition component of this projects.
 * The query parameters are subscribed in this component (that can be used as NIE-OS app) and passed to the components.
 */
@Component({
  selector: 'app-p0041-edition',
  templateUrl: './p0041-edition.component.html',
  styleUrls: ['./p0041-edition.component.scss']
})
export class P0041EditionComponent implements OnInit {

  /**
   * IRI of the Kanda.
   * TODO remove default value
   */
  kandaIRI = 'http://rdfh.ch/0041/07GyRR1fQLSjaIlAjRTq_Q';

  /**
   * IRI of the Sukta.
   * TODO remove default value
   */
  suktaIRI = 'http://rdfh.ch/0041/CEdPhqFoRqa4JMrLokpwHw';

  /**
   * IRI of the strophe.
   * TODO remove default value
   */
  stropheIRI = 'http://rdfh.ch/0041/WA9dphq9RpmXkq5nSo6q3Q';

  /**
   * Address of the Knora instance the project data are hosted in.
   * TODO remove default value
   */
  @Input() backendAddress = 'http://localhost:3333';

  /**
   * Constructor initializes ActivatedRoute.
   * @param _route  Enables access to query parameters.
   */
  constructor(private _route: ActivatedRoute) { }

  /**
   * On initialization of this component, subscribe to query parameters in the URL.
   */
  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.kandaIRI = params.d1;
      this.suktaIRI = params.d2;
      this.stropheIRI = params.d3;
    });
  }



}
