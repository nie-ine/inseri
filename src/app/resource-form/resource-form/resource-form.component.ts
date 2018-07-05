import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {
  
  @Input() resourceIRI: string;
  @Input() editRights: boolean;
  
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
    // get available vocabularies
    
    // TODO: do request in service
    if (this.resourceIRI) {
      this.http.get('http://knora2.nie-ine.ch/v1/resources/' 
        + encodeURIComponent(this.resourceIRI) 
        + '?email=root%40example.com&password=test')
        .subscribe( res => {
          this.resource = res;
          this.propKeys = Object.keys(this.resource['props']);
          
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
          console.log(res);
          console.log(resourceParams);
        },
        err => {
          console.log('Error occured');
        }
    );
    
    this.getResourceData();
    
    this.activateValue('', null)
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
      + '?email=root%40example.com&password=test', httpOptions );
    
    this.activateValue('', null);
  }
  
  deleteProperty(propertyIRI: string) {
    
    // create authentication data for posting
    // TODO: use services
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // post property or log error
    // TODO: do request in service
    this.http.delete('http://knora2.nie-ine.ch/v1/values/' 
      + encodeURIComponent(propertyIRI)
      + '?email=root%40example.com&password=test', httpOptions);
    this.getResourceData();
    
    this.activateValue('', null);
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
          console.log(res);
          console.log(resourceParams);
        },
        err => {
          console.log('Error occured');
        }
    );
    
    this.getResourceData();
    
    this.activateValue('', null);
  }
  
  changeProperty(valueID: string, propertyIRI: string) {
    
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
          console.log(res);
          console.log(resourceParams);
        },
        err => {
          console.log('Error occured');
        }
    );
    
    this.getResourceData();
    
    this.activateValue('', null)
  }
  
  activateValueHistory(valueID) {
    this.valuesWithShownHistory.add(valueID);
  }
  
  hideValueHistory(valueID) {
    this.valuesWithShownHistory.delete(valueID);
  }
}
