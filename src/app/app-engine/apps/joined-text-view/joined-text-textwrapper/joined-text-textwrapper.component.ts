import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-joined-text-textwrapper',
  templateUrl: './joined-text-textwrapper.component.html',
  styleUrls: ['./joined-text-textwrapper.component.scss']
})
export class JoinedTextTextwrapperComponent implements OnInit {

  @Input() resource: any;

  @Input() propertyIri: string;

  @Input() namespaces: any;

  propertyKey: string;

  constructor() { }

  ngOnInit() {
    if (this.propertyIri && this.namespaces) {
      let tempKey = this.propertyIri;

      // Change from simple API Knora namespaces to prefixes
      tempKey = tempKey.replace('/simple/v2#', '/v2#');
      for (const ns of Object.keys(this.namespaces)) {
        tempKey = tempKey.replace(this.namespaces[ns], ns + ':');
      }

      this.propertyKey = tempKey;
    }
  }

}
