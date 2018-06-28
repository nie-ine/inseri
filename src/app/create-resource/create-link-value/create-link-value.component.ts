import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-link-value',
  templateUrl: './create-link-value.component.html',
  styleUrls: ['./create-link-value.component.scss']
})
export class CreateLinkValueComponent implements OnInit {
  
  @Input() property;
  @Output() resourceIRI: EventEmitter<string> = new EventEmitter<string>();

  results: Array<any>;
  
  searchstring: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    
  }

  search() {
    
    // TODO: do request in service
    this.http.get('http://knora2.nie-ine.ch/v1/resources?searchstr=' +        encodeURIComponent(this.searchstring) + 
      '&restype_id=' + encodeURIComponent(this.property['attributes'].replace(/^restypeid=/, '')))
    .subscribe( res => {
      this.results = res['resources'];
    });
  }
  
  selectResult(iri) {
    this.resourceIRI.emit(iri);
  }

}
