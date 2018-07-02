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

  dropdownProperty: string = '';

  resourceLabel: string = '';

  showPropertySelect: boolean = true;

  // each resource must belong to a project. Give this as Input
  @Input() projectIRI: string;

  // after posting, the IRI is available outside as output
  @Output() resourceIRI: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // get available vocabularies

    // TODO: do request in service
    this.http.get('http://knora2.nie-ine.ch/v1/vocabularies?email=root%40example.com&password=test')
      .subscribe(
        res => this.vocabularies = res['vocabularies']
      );
  }

  resetVocabulary() {
    // set selected vocabulary
    // get resource classes defined in this vocabulary
    // get description for this vocabulary
    // reset resource class and property data

    // TODO: do request in service
    this.http.get('http://knora2.nie-ine.ch/v1/resourcetypes?vocabulary='
      + encodeURIComponent(this.selectedVocabulary) +
      '&email=root%40example.com&password=test' )
      .subscribe(
        res => this.resourceClasses = res['resourcetypes']
      );

    for (let v of this.vocabularies) {
      if (v['uri'] == this.selectedVocabulary) {
        this.selectedVocabularyDescription = v['description'];
      }
    }

    this.selectedResourceClass = '';
    this.selectedResourceClassDescription = '';
    this.selectedProperties = [];
    this.resourceLabel = '';
  }

  resetResourceClass() {
    // get properties for this resource class
    // reset property data for this resource
    // get description for the selected resource class

    // TODO: do request in service
    this.http.get('http://knora2.nie-ine.ch/v1/resourcetypes/' + encodeURIComponent(this.selectedResourceClass) + '?email=root%40example.com&password=test' )
      .subscribe(
res => {
        this.properties = res['restype_info']['properties'];
        this.selectedResourceClassDescription = res['restype_info']['description'];
       });
    this.selectedProperties = [];
    this.resourceLabel = '';
  }

  addProperty(property: string) {
    // add property with selected property IRI to this new resource
    // save property description from Knora in 'structure' and initialize field 'value'
    // TODO: reset dropdown does not work - fix it

    let propertyStructure;

    if (property != '') {

        for (let p of this.properties) {
          if (p['id'] == property) {
            propertyStructure = p
          }
        }

        this.selectedProperties.push({'structure': propertyStructure, 'value': ''});
    }
    this.dropdownProperty = '';
  }

  deleteProperty(index: number) {
    // remove property at index index
    this.selectedProperties.splice(index, 1);
  }
  
  setValue(newValue, i) {
    this.selectedProperties[i]['value'] = newValue;
  }

  postResource() {
    // create JSON representation for this resource
    const resourceParams = {
      'restype_id': this.selectedResourceClass,
      'properties': { },
      'label': this.resourceLabel,
      'project_id': this.projectIRI
    };

    // add each property with its value to this JSON
    for (let p of this.selectedProperties) {
      try {
        resourceParams['properties'][p['structure']['id']].push(p['value']);
      } catch (e) {
        resourceParams['properties'][p['structure']['id']] = [p['value']];
      }
    }

    // create authentication data for posting
    // TODO: use services
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // post resource or log error
    // on success, give IRI as output of this component
    // TODO: do request in service
    this.http.post('http://knora2.nie-ine.ch/v1/resources?email=root%40example.com&password=test', resourceParams, httpOptions )
      .subscribe(
      res => {
        this.resourceIRI.emit(res['res_id']);
      },
      err => {
        console.log(err);
      }
    );

  }

}
