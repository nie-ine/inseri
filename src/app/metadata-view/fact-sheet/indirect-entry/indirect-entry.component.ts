import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indirect-entry',
  templateUrl: './indirect-entry.component.html',
  styleUrls: ['./indirect-entry.component.scss']
})
export class IndirectEntryComponent implements OnInit {

  @Input() iri: string;
  uri: string;
  title = ' ';

  constructor() { }

  ngOnInit() {
    this.uri = encodeURIComponent(this.iri);

    // TODO: use knora service to get the title of the linked resource when the services are ready.
    this.title = '(include requested title here)';

  }

}
