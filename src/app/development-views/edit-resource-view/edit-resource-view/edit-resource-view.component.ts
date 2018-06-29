import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-resource-view',
  templateUrl: './edit-resource-view.component.html',
  styleUrls: ['./edit-resource-view.component.scss']
})
export class EditResourceViewComponent implements OnInit {
  
  resourceIRI: string;
  editRights: boolean = false;
  
  results: Array<any>;
  
  searchstring: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    
  }

  search() {
    
    // TODO: do request in service
    this.http.get('http://knora2.nie-ine.ch/v1/resources?searchstr=' +        encodeURIComponent(this.searchstring) + '&email=root%40example.com&password=test')
    .subscribe( res => {
      this.results = res['resources'];
    });
    this.resourceIRI = null;
  }
  
  selectResult(iri) {
    this.resourceIRI = iri;
  }


}
