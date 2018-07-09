import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resource-value-history-link-target',
  templateUrl: './resource-value-history-link-target.component.html',
  styleUrls: ['./resource-value-history-link-target.component.scss']
})
export class ResourceValueHistoryLinkTargetComponent implements OnInit {
  
  @Input() resourceIRI: string;
  resource: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
    // TODO: do request in service
    if (this.resourceIRI) {
      this.http.get('http://knora2.nie-ine.ch/v1/resources/' 
        + encodeURIComponent(this.resourceIRI) 
        + '?email=root%40example.com&password=test')
        .subscribe( res => {
          this.resource = res;
        },
        err => {
          console.log(err);
        });
    }
  }
}
