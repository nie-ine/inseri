import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-indirect-entry',
  templateUrl: './indirect-entry.component.html',
  styleUrls: ['./indirect-entry.component.scss']
})
export class IndirectEntryComponent implements OnInit {

  @Input() iri: string;
  @Input() prop: string;
  uri: string;
  title: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.uri = encodeURIComponent(this.iri);

    // TODO: replace this request with a request through a service
    // this.httpClient.get('http://130.60.24.65:3338/v2/resources/' + encodeURI(this.iri)).subscribe(res => {
    this.httpClient.get('http://130.60.24.65:3338/v2/resources/http%3A%2F%2Frdfh.ch%2Fkuno-raeber%2F2Ghtz54mTFiGeNPLjZMTbg')
      .subscribe(res => {
      this.title = res['schema:itemListElement']['text:hasConvoluteTitle']['knora-api:valueAsString'];
      console.log(res);
    });
  }

}
