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
  
  resource: any = {
    "resinfo":{
      "locations":null,
      "restype_label":"person",
      "resclass_has_location":false,
      "preview":null,"person_id":"http://rdfh.ch/users/root",
      "value_of":0,
      "lastmod":"0000-00-00 00:00:00",
      "resclass_name":"object",
      "firstproperty":"test",
      "restype_iconsrc":null,
      "restype_name":"http://www.knora.org/ontology/0048/human#Person",
      "regions":null,
      "restype_description":"A real born living human.",
      "project_id":"http://rdfh.ch/projects/0041",
      "locdata":null,"restype_id":"http://www.knora.org/ontology/0048/human#Person"
    },
    "incoming":[],
    "resdata":{
      "restype_label":"person",
      "restype_name":"http://www.knora.org/ontology/0048/human#Person",
      "iconsrc":null,
      "rights":2,
      "res_id":"http://rdfh.ch/0041/Atharvaveda/cIQgaupHTfyrHZNt80MUvA"
    },
    "status":0,
    "props":{
      "http://www.knora.org/ontology/0048/human#hasFloruit":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#LinkValue","label":"has floruit","guielement":null,"attributes":"restypeid=http://www.knora.org/ontology/0048/human#Floruit","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasFloruit"
      },
      "http://www.knora.org/ontology/0044/concept#hasDedicatedTo":{ 
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#LinkValue","label":"has dedicated to","guielement":null,"attributes":"restypeid=http://www.knora.org/ontology/0048/human#Person","occurrence":"0-n","pid":"http://www.knora.org/ontology/0044/concept#hasDedicatedTo"
      },
      "http://www.knora.org/ontology/0048/human#hasDescription":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#TextValue","label":"has description","guielement":"richtext","attributes":"","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasDescription"
      },
      "http://www.knora.org/ontology/0048/human#hasDeathDate":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#DateValue","label":"has death date","guielement":null,"attributes":"","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasDeathDate"
      },
      "http://www.knora.org/ontology/0048/human#hasAlias":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#TextValue","label":"has alias","guielement":"richtext","attributes":"","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasAlias"
      },
      "http://www.knora.org/ontology/knora-base#hasStandoffLinkTo":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#LinkValue","label":"has Standoff Link to","guielement":null,"attributes":"restypeid=http://www.knora.org/ontology/knora-base#Resource","occurrence":"0-n","pid":"http://www.knora.org/ontology/knora-base#hasStandoffLinkTo"
      },
      "http://www.knora.org/ontology/0048/human#adheringToThought":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#LinkValue","label":"adhering to body of thought","guielement":null,"attributes":"restypeid=http://www.knora.org/ontology/0044/concept#ThoughtBody","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#adheringToThought"
      },
      "http://www.knora.org/ontology/0051/organization#isMemberOf":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#LinkValue","label":"is member of organization","guielement":null,"attributes":"restypeid=http://www.knora.org/ontology/0051/organization#Organization","occurrence":"0-n","pid":"http://www.knora.org/ontology/0051/organization#isMemberOf"
      },
      "http://www.knora.org/ontology/0048/human#hasPreferredName":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#TextValue","label":"has preferred name","guielement":"richtext","attributes":"","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasPreferredName"
      },
      "http://www.knora.org/ontology/0048/human#hasFamilyName":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#TextValue","label":"has family name","guielement":"richtext","attributes":"","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasFamilyName"
      },
      "http://www.knora.org/ontology/0048/human#hasName":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#TextValue","label":"has name","guielement":"richtext","attributes":"","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasName"
      },
      "http://www.knora.org/ontology/0048/human#hasBirthDate":{
        "regular_property":1,
        "value_restype":[null],
        "guiorder":null,
        "value_firstprops":[null],
        "is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#DateValue",
        "label":"has birth date",
        "value_iconsrcs":[null],
        "guielement":null,
        "attributes":"",
        "occurrence":"0-n",
        "value_ids":[     
          "http://rdfh.ch/0041/Atharvaveda/cIQgaupHTfyrHZNt80MUvA/values/cRqvY6fPT4Gt4WRqD-fMlw"
        ],
        "value_rights":[2],
        "pid":"http://www.knora.org/ontology/0048/human#hasBirthDate",
        "values":[
          {
            "dateval1":"1987-10-13",
            "calendar":"GREGORIAN",
            "era1":"CE",
            "dateval2":"1987-10-13",
            "era2":"CE"
          }
        ],
        "comments":[null]
      },
      "http://www.knora.org/ontology/0051/organization#isMemberOfAdministration":{             
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#LinkValue","label":"is member of administration","guielement":null,"attributes":"restypeid=http://www.knora.org/ontology/0051/organization#Organization","occurrence":"0-n","pid":"http://www.knora.org/ontology/0051/organization#isMemberOfAdministration"
      },
      "http://www.knora.org/ontology/0048/human#hasBiologicalSex":{   
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#LinkValue","label":"has biological sex","guielement":null,"attributes":"restypeid=http://www.knora.org/ontology/0048/human#BiologicalSex","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasBiologicalSex"
      },      
      "http://www.knora.org/ontology/0048/human#hasGivenName":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#TextValue","label":"has given name","guielement":"richtext","attributes":"","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasGivenName"
      },
      "http://www.knora.org/ontology/0048/human#isMemberOf":{
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#LinkValue","label":"is member of","guielement":null,"attributes":"restypeid=http://www.knora.org/ontology/0048/human#Group","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#isMemberOf" 
      },
      "http://www.knora.org/ontology/0048/human#hasRole":{  
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#LinkValue","label":"person has role","guielement":null,"attributes":"restypeid=http://www.knora.org/ontology/0048/human#Role","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasRole"
      },
      "http://www.knora.org/ontology/0048/human#hasOccupationalRole":{   
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#LinkValue","label":"has occupational role","guielement":null,"attributes":"restypeid=http://www.knora.org/ontology/0048/human#OccupationalRole","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasOccupationalRole"
      },
      "http://www.knora.org/ontology/0048/human#hasLife":{ 
        "regular_property":1,"guiorder":null,"is_annotation":"0",
        "valuetype_id":"http://www.knora.org/ontology/knora-base#LinkValue","label":"person has life","guielement":null,"attributes":"restypeid=http://www.knora.org/ontology/0048/human#PersonLife","occurrence":"0-n","pid":"http://www.knora.org/ontology/0048/human#hasLife"
      }
    },
    "access":"OK"
    }

  constructor(private http: HttpClient) {
  }
  
  ngOnInit() {
    this.getResourceData();
    
    // DUMMY
    
  this.propKeys = Object.keys(this.resource['props'])//Array.from(this.resource['props'].keys());
  console.log(this.propKeys);

  }
  
  getResourceData() {
    // get available vocabularies
    
    // TODO: do request in service
    if (this.resourceIRI) {
      this.http.get('http://knora2.nie-ine.ch/v1/resources/' + encodeURIComponent(this.resourceIRI) )
        .subscribe( res => {
          this.resource = res;
          this.propKeys = Array.from(res['props'].keys());
        });
    }
  }
  
  resetLabel() {
  
    // TODO
    console.log(this.resource['resinfo']['firstproperty']);
    
    this.getResourceData;
  }
  
  deleteResource() {
    
    // create authentication data for posting
    // TODO: use services
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // post property or log error
    // TODO: do request in service
    this.http.delete('http://knora2.nie-ine.ch/v1/resources/' + encodeURIComponent(this.resourceIRI), httpOptions );
  }
  
  deleteProperty(propertyIRI: string) {
    
    // create authentication data for posting
    // TODO: use services
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // post property or log error
    // TODO: do request in service
    this.http.delete('http://knora2.nie-ine.ch/v1/values/' + encodeURIComponent(propertyIRI) , httpOptions);
    this.getResourceData;
  }
  
  addProperty(propertyIRI: string) {
    
    const resourceParams = {
      'richtext_value': {'utf8str': ''},// TODO
      'comment': 'text' + Math.random() * 1000,
      'project_id': this.resource['resinfo']['project_id']
    };
    
    // create authentication data for posting
    // TODO: use services
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // post property or log error
    // TODO: do request in service
    this.http.post('http://knora2.nie-ine.ch/v1/values/' + resourceParams, httpOptions )
      .subscribe(
        res => {
          console.log(res);
          console.log(resourceParams);
        },
        err => {
          console.log('Error occured');
        }
    );
    
    this.getResourceData;
  }
  
  changeProperty(propertyIRI: string) {
    
    const resourceParams = {
      'richtext_value': {'utf8str': ''},// TODO
      'comment': 'text' + Math.random() * 1000,
      'project_id': this.resource['resinfo']['project_id']
    };
    
    // create authentication data for putting
    // TODO: use services
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa('root@example.com' + ':' + 'test')})
    };

    // put property or log error
    // TODO: do request in service
    this.http.put('http://knora2.nie-ine.ch/v1/values/' + encodeURIComponent(propertyIRI), resourceParams, httpOptions )
      .subscribe(
        res => {
          console.log(res);
          console.log(resourceParams);
        },
        err => {
          console.log('Error occured');
        }
    );
    
    this.getResourceData;
  }
}
