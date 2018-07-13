import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatFormField
} from '@angular/material';
import { KnoraV1RequestService } from '../../../../shared/knora-v1-request.service';

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
  constructor(
    public dialogRef: MatDialogRef<DataChooserSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private knoraV1RequestService: KnoraV1RequestService
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
}
