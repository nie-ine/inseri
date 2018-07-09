import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resource-value-history',
  templateUrl: './resource-value-history.component.html',
  styleUrls: ['./resource-value-history.component.scss']
})
export class ResourceValueHistoryComponent implements OnInit {
  
  @Input() resourceIRI: string;
  @Input() propertyTypeIRI: string;
  @Input() valueID: string;
  
  valueHistory: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValueHistory();
  }
  
  getValueHistory() {
    // TODO: do request in service
    if (this.resourceIRI) {
      this.http.get('http://knora2.nie-ine.ch/v1/values/history/' 
        + encodeURIComponent(this.resourceIRI) 
        + '/' + encodeURIComponent(this.propertyTypeIRI) 
        + '/' + encodeURIComponent(this.valueID)
        + '?email=root%40example.com&password=test'
        )
        .subscribe( res => {
          this.valueHistory = res;
        },
        err => {
          console.log(err);
        });
    }
  }
}
