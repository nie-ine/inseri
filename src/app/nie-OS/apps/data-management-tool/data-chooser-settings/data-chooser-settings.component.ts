import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatFormField
} from '@angular/material';
import { KnoraV1RequestService } from '../../../../shared/knora-v1-request.service';
import { environment } from '../../../../../environments/environment';
import { SendGravSearchQueryService } from '../../../../shared/gravsearch/sendGravSearchQuery.service';

@Component({
  selector: 'app-data-chooser-settings',
  templateUrl: './data-chooser-settings.component.html',
  styleUrls: ['./data-chooser-settings.component.scss']
})
export class DataChooserSettingsComponent implements OnInit {
  model: any = {};
  loading = false;
  allProjects: Array<any>;
  selectedProject: any;
  resourceTypes: Array<any>;
  selectedResourceType: any;
  selectedPrefixes: any;
  queryResults: any;
  requestSend: boolean;
  gravSearchString = '';
  gravSearchResponse: any;
  gravSearchSets =
    {
      'PREFIXES': new Set(),
      'constructOpener': 'CONSTRUCT {',
      'CONSTRUCT': new Set(),
      'constructClosure': '}',
      'whereOpener': 'WHERE {',
      'WHERE': new Set(),
      'whereClosure': '}'
    };
  constructor(
    public dialogRef: MatDialogRef<DataChooserSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private knoraV1RequestService: KnoraV1RequestService,
    private sendGravSearchQueryService: SendGravSearchQueryService
  ) {
    this.model = data;
    console.log( data );
  }
  ngOnInit() {
    console.log('Load all projects');
    this.knoraV1RequestService.getProjects()
      .subscribe(
        data => {
          this.allProjects = (data as any).projects;
          console.log(this.allProjects);
        },
        error => {
          console.log(error);
        });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  register() {
    this.loading = true;
    console.log('register');
  }
  getAllVocabuliares( project: any) {
    console.log( project );
    this.knoraV1RequestService
      .getResourcesOfVocabulary( project.ontologies[ 0 ] ) // TODO make this dynamical for more than one ontology per project
      .subscribe(
        data => {
          this.resourceTypes = ( data as any ).resourcetypes;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  getAllInstancesOfChosenResourceClass( resourceType: any ) {
    console.log('Get all Instances for: ');
    console.log(resourceType);
  }

  generateGravsearchPrefixes(project: any) {
    this.selectedPrefixes = [];
    this.selectedPrefixes[ 0 ] = 'PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>';
    this.selectedPrefixes[ 1 ] = 'PREFIX '
      + project.shortname +
      ': <http://0.0.0.0:3333/ontology/'
      + project.shortcode
      + '/'
      + project.shortname
      + '/simple/v2#>';
  }

  returnWHERE(project: string) {
    return project + ':' + this.parseResourceTypeShortName();
  }

  parseResourceTypeShortName() {
    return this.selectedResourceType.split('#', 2)[ 1 ];
  }

  sendRequest() {
    this.requestSend = true;
    this.generateGravSearchString();
    console.log('send request');
  }

  generateGravSearchString() {
    this.gravSearchString = '';
    this.gravSearchSets.PREFIXES = new Set();
    this.gravSearchSets.CONSTRUCT = new Set();
    this.gravSearchSets.WHERE = new Set();
    console.log(this.selectedPrefixes);
    this.gravSearchSets.PREFIXES.add( this.selectedPrefixes[ 0 ] );
    this.gravSearchSets.PREFIXES.add( this.selectedPrefixes[ 1 ] );
    this.gravSearchSets.CONSTRUCT.add('?myVariable knora-api:isMainResource true ;');
    this.gravSearchSets.WHERE.add(
      '?myVariable a '
      + this.returnWHERE( this.selectedProject )
      + ' .'
    );
    console.log(this.gravSearchSets);
    console.log('Generate Gravsearch string');
    console.log('Loop through PREFIXES');
    this.gravSearchSets.PREFIXES.forEach((value: string, key: string) => {
      console.log(value);
      this.gravSearchString += value;
      this.gravSearchString += ' ';
    });
    this.gravSearchString += this.gravSearchSets.constructOpener + ' ';
    this.gravSearchSets.CONSTRUCT.forEach((value: string, key: string) => {
      console.log(value);
      this.gravSearchString += value;
      this.gravSearchString += ' ';
    });
    this.gravSearchString += this.gravSearchSets.constructClosure + ' ';
    this.gravSearchString += this.gravSearchSets.whereOpener + ' ';
    this.gravSearchSets.WHERE.forEach((value: string, key: string) => {
      console.log(value);
      this.gravSearchString += value;
      this.gravSearchString += ' ';
    });
    this.gravSearchString += this.gravSearchSets.whereClosure + ' ';
    console.log( this.gravSearchString );
    this.sendGravSearchQueryService.sendRequest( this.gravSearchString )
      .subscribe(
        data => {
          console.log(data);
          this.gravSearchResponse = data['@graph'];
          console.log(this.gravSearchResponse);
        },
        error => {
          console.log(error);
        });
  }

}
