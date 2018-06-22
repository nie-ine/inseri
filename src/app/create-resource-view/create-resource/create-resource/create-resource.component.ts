import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.scss']
})
export class CreateResourceComponent implements OnInit {
    
  vocabularies: Array<any>;
  selectedVocabulary: string = '';
  selectedVocabularyDescription: string = '';
  
  resourceClasses: Array<any>;
  selectedResourceClass: string = '';
  selectedResourceClassDescription: string = '';
  
  properties: Array<any>;
  selectedProperties: Array<any>;
  
  resourceLabel: string = '';
  
  showPropertySelect: boolean = true;
  
  @Input() projectIRI: string;
    
  @Output() resourceIRI: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('http://knora2.nie-ine.ch/v1/vocabularies')
      .subscribe(
        res => this.vocabularies = res['vocabularies']
      );
  }
  
  resetVocabulary(vocabulary: string) {
    this.selectedVocabulary = vocabulary;
    
    this.http.get('http://knora2.nie-ine.ch/v1/resourcetypes?vocabulary=' + encodeURIComponent(this.selectedVocabulary))
      .subscribe(
        res => this.resourceClasses = res['resourcetypes'];
      );
    
    for (let v of this.vocabularies) {
      if (v['uri'] == vocabulary) {
        this.selectedVocabularyDescription = v['description'];
      }
    }
    
    this.selectedResourceClass = '';
    this.selectedResourceClassDescription = '';
    this.selectedProperties = [];
    this.resourceLabel = '';
  }
  
  resetResourceClass(resourceClass: string) {
    this.selectedResourceClass = resourceClass;

    this.http.get('http://knora2.nie-ine.ch/v1/resourcetypes/' + encodeURIComponent(this.selectedResourceClass))
      .subscribe(
res => {
        this.properties = res['restype_info']['properties'];
        this.selectedResourceClassDescription = res['restype_info']['description'];
       });
    this.selectedProperties = [];
    this.resourceLabel = '';
  }
  
  addProperty(property: string) {
    let propertyStructure;
    
    for (let p of this.properties) {
      if (p['id'] == property) {
        propertyStructure = p
      }
    }
  
    this.selectedProperties.push({'structure': propertyStructure, 'value': ''});  
  }
  
  deleteProperty(index: number) {
    this.selectedProperties.splice(index, 1);
  }
  
  postResource() {
    const resourceParams = {
      'restype_id': this.selectedResourceClass,
      'properties': { },
      'label': this.resourceLabel
      'project_id': this.projectIRI
    };
    
    for (let p of this.selectedProperties) { 
      if (p['structure']['valuetype_id'] == 'http://www.knora.org/ontology/knora-base#LinkValue') {
        //
      }
      else if (p['structure']['valuetype_id'] == 'http://www.knora.org/ontology/knora-base#IntValue') {
        //
      }
      else if (p['structure']['valuetype_id'] == 'http://www.knora.org/ontology/knora-base#TextValue') {
        try { 
          resourceParams['properties'][p['structure']['id']].push(
            {'richtext_value': {'utf8str': p['value']}}
            );
        } catch (e: TypeError) {
          resourceParams['properties'][p['structure']['id']] = [
           {'richtext_value': {'utf8str': p['value']}} ];
        }
      }
      else if (p['structure']['valuetype_id'] == 'http://www.knora.org/ontology/knora-base#DateValue') {
        //
      }
    }

    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    this.http.post('http://knora2.nie-ine.ch/v1/resources', resourceParams, httpOptions )
      .subscribe(
      res => {
        console.log(res);
        this.resourceIRI.emit(res['res_id']);
      },
      err => {
        console.log(err);
        console.log('Error occured with resouce params:');
        console.log(resourceParams);
        console.log('and as user');
        console.log(httpOptions);
      }
    );
    
  }
  
}
