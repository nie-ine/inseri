import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {
  
  @Input() resourceIRI: string;
  @Input() editRights: boolean;
  @Output() resourceIsDeleted: EventEmitter<any> = new EventEmitter();
  
  propKeys: Array<string>;
  stableResourceIRI: string;
  
  focusedValue: string = '';
  focusedValueContent: any = '';
  
  valuesWithShownHistory: Set<string> = new Set();
  valueHistory: any;

  resource: any;

constructor(private http: HttpClient) {
  }
  
  ngOnInit() {
    this.getResourceData();
  }
  
  getResourceData() {
    
    // TODO: do request in service
    if (this.resourceIRI) {
      this.http.get('http://knora2.nie-ine.ch/v1/resources/' 
        + encodeURIComponent(this.resourceIRI) 
        + '?email=root%40example.com&password=test')
        .subscribe( res => {
          this.resource = res;
          this.propKeys = Object.keys(this.resource['props']);
        },
        err => {
          console.log(err);
        });
      this.stableResourceIRI = this.resourceIRI;
    }
  }
  
  activateValue(id: string, content) {
    this.focusedValue = id;
    this.focusedValueContent = content;
  }

  setValue(newValue) {
    // set date value
    this.focusedValueContent = newValue;
  }
  
  resetLabel() {
    
    const resourceParams = {"label": this.focusedValueContent };
    
    // create authentication data for putting
    // TODO: use services
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // put property or log error
    // TODO: do request in service
    this.http.put('http://knora2.nie-ine.ch/v1/resources/label/' 
      + encodeURIComponent(this.stableResourceIRI)
      + '?email=root%40example.com&password=test', resourceParams, httpOptions )
      .subscribe(
        res => {
          this.getResourceData();
          this.activateValue('', null)
        },
        err => {
          console.log(err);
        }
    );
  }
  
  deleteResource() {
    
    // create authentication data for posting
    // TODO: use services
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // post property or log error
    // TODO: do request in service
    this.http.delete('http://knora2.nie-ine.ch/v1/resources/' 
      + encodeURIComponent(this.stableResourceIRI) 
      + '?email=root%40example.com&password=test', httpOptions )
      .subscribe(
        res => {
          this.resourceIsDeleted.emit();
          this.activateValue('', null)
        },
        err => {
          console.log(err);
        }
    );
  }
  
  deleteProperty(valueID: string) {
    
    // create authentication data for posting
    // TODO: use services
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // post property or log error
    // TODO: do request in service
    this.http.delete('http://knora2.nie-ine.ch/v1/values/' 
      + encodeURIComponent(valueID)
      + '?email=root%40example.com&password=test', httpOptions)
      .subscribe(
        res => {
          // reload resource data
          this.getResourceData();
          this.activateValue('', null);
        },
        err => {
          console.log(err);
        }
    );
  }
  
  addProperty(propertyIRI: string) {
  
    const resourceParams = this.focusedValueContent;
    resourceParams['res_id'] = this.stableResourceIRI;
    resourceParams['prop'] = propertyIRI
    resourceParams['project_id'] = this.resource['resinfo']['project_id'];
    
    // create authentication data for posting
    // TODO: use services
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // post property or log error
    // TODO: do request in service
    this.http.post('http://knora2.nie-ine.ch/v1/values'
      + '?email=root%40example.com&password=test', resourceParams, httpOptions )
      .subscribe(
        res => {
          // reload resource data
          this.getResourceData();
          this.activateValue('', null);
        },
        err => {
          console.log(err);
        }
    );
  }
  
  changeProperty(valueID: string) {
    
    const resourceParams = this.focusedValueContent;
    resourceParams['project_id'] = this.resource['resinfo']['project_id'];
    
    // create authentication data for putting
    // TODO: use services
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // put property or log error
    // TODO: do request in service
    this.http.put('http://knora2.nie-ine.ch/v1/values/' 
      + encodeURIComponent(valueID)
      + '?email=root%40example.com&password=test', resourceParams, httpOptions )
      .subscribe(
        res => {
          // reload resource data
          this.getResourceData();
          this.activateValue('', null);
        },
        err => {
          console.log(err);
        }
    );
  }
  
  activateValueHistory(valueID) {
    this.valuesWithShownHistory.add(valueID);
  }
  
  hideValueHistory(valueID) {
    this.valuesWithShownHistory.delete(valueID);
  }
}
