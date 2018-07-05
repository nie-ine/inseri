import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resource-value-history-value',
  templateUrl: './resource-value-history-value.component.html',
  styleUrls: ['./resource-value-history-value.component.scss']
})
export class ResourceValueHistoryValueComponent implements OnInit {
  
  @Input() valueIRI: string;
  valueData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValue();
  }
  
  getValue() {
    // TODO: do request in service
    if (this.valueIRI) {
      this.http.get('http://knora2.nie-ine.ch/v1/values/' 
        + encodeURIComponent(this.valueIRI)
        + '?email=root%40example.com&password=test'
        )
        .subscribe( res => {
          this.valueData = res;
          console.log(res);
        });
    }
  }

}
