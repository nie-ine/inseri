import {Component, OnInit} from '@angular/core';
import {KnoraRequestService} from '../shared/knora-request.service';
import {SparqlRequestService} from '../shared/sparql-request.service';
import {ResultToEditionMapperService} from './result-to-edition-mapper.service';

@Component({
  selector: 'app-edition-view',
  templateUrl: './edition-view.component.html',
  styleUrls: ['./edition-view.component.scss']
})
export class EditionViewComponent implements OnInit {

  dummyText = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

  constructor(knoraRequestService: KnoraRequestService,
              sparqlRequestService: SparqlRequestService,
              resultToEditionMapperService: ResultToEditionMapperService) {
  }

  ngOnInit() {
  }

}
