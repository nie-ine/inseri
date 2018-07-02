import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-link-value-editor',
  templateUrl: './link-value-editor.component.html',
  styleUrls: ['./link-value-editor.component.scss']
})
export class LinkValueEditorComponent implements OnInit {

  @Input() targetClass: string;
  @Output() linkValue: EventEmitter<any> = new EventEmitter<any>();

  results: Array<any>;

  searchstring: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  search() {
    // TODO: do request in service
    
    let request = 'http://knora2.nie-ine.ch/v1/resources?searchstr=' 
      + encodeURIComponent(this.searchstring)
      + '&email=root%40example.com&password=test';
    
    if (this.targetClass){ 
      request += '&restype_id=' +
      encodeURIComponent(this.targetClass.replace(/^restypeid=/, ''))
    }
      
    this.http.get(request)
    .subscribe( res => {
      this.results = res['resources'];
    });
  }

  selectResult(iri) {
    this.linkValue.emit({'text_value': iri});
  }

}
