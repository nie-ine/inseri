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
    
    // TODO do request in service
    this.http.get('http://knora2.nie-ine.ch/v1/vocabularies')
      .subscribe(
        res => this.vocabularies = res['vocabularies']
      );
  }
  
  resetVocabulary(vocabulary: string) {
    this.selectedVocabulary = vocabulary;
    
    // TODO do request in service
    this.http.get('http://knora2.nie-ine.ch/v1/resourcetypes?vocabulary=' + encodeURIComponent(this.selectedVocabulary))
      .subscribe(
        res => this.resourceClasses = res['resourcetypes']
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

    // TODO do request in service
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
  
  setLink(iri, i) {
    this.selectedProperties[i]['value'] = iri;
  }
  
  postResource() {
    const resourceParams = {
      'restype_id': this.selectedResourceClass,
      'properties': { },
      'label': this.resourceLabel,
      'project_id': this.projectIRI
    };
    
    for (let p of this.selectedProperties) { 
      if (p['structure']['valuetype_id'] == 'http://www.knora.org/ontology/knora-base#LinkValue') {
        try { 
          resourceParams['properties'][p['structure']['id']].push(
            {'link_value': p['value'] }
            );
        } catch (e) {
          resourceParams['properties'][p['structure']['id']] = [
            {'link_value': p['value'] } ];
        }
      }
      else if (p['structure']['valuetype_id'] == 'http://www.knora.org/ontology/knora-base#IntValue') {
        try { 
          resourceParams['properties'][p['structure']['id']].push(
            {'int_value': Math.floor(p['value']) }
            );
        } catch (e) {
          resourceParams['properties'][p['structure']['id']] = [
          {'int_value': Math.floor(p['value']) } ];
        }
      }
      else if (p['structure']['valuetype_id'] == 'http://www.knora.org/ontology/knora-base#DecimalValue') {
        try { 
          resourceParams['properties'][p['structure']['id']].push(
            {'decimal_value': p['value'] }
            );
        } catch (e) {
          resourceParams['properties'][p['structure']['id']] = [
            {'decimal_value': p['value'] } ];
        }
      }
      else if (p['structure']['valuetype_id'] == 'http://www.knora.org/ontology/knora-base#BooleanValue') {
        try { 
          resourceParams['properties'][p['structure']['id']].push(
            {'boolean_value': p['value'] }
            );
        } catch (e) {
          resourceParams['properties'][p['structure']['id']] = [
            {'boolean_value': p['value'] } ];
        }
      }
      else if (p['structure']['valuetype_id'] == 'http://www.knora.org/ontology/knora-base#TextValue') {
        try { 
          resourceParams['properties'][p['structure']['id']].push(
            {'richtext_value': {'utf8str': p['value']}}
            );
        } catch (e) {
          resourceParams['properties'][p['structure']['id']] = [
            {'richtext_value': {'utf8str': p['value']}} ];
        }
      }
      else if (p['structure']['valuetype_id'] == 'http://www.knora.org/ontology/knora-base#DateValue') {
        try { 
          resourceParams['properties'][p['structure']['id']].push(
            {'date_value': p['value'] }
            );
        } catch (e) {
          resourceParams['properties'][p['structure']['id']] = [
            {'date_value': p['value'] } ];
        }
      }
    }

    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // TODO do request in service
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
