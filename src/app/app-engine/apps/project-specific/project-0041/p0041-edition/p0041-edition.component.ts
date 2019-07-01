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
   */
  kandaIRI: string;

  /**
   * IRI of the Sukta.
   */
  suktaIRI: string;

  /**
   * IRI of the strophe.
   */
  stropheIRI: string;

  /**
   * Address of the Knora instance the project data are hosted in.
   */
  @Input() backendAddress: string;

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
      this.kandaIRI = params.d0;
      this.suktaIRI = params.d1;
      this.stropheIRI = params.d2;
    });
  }



}
