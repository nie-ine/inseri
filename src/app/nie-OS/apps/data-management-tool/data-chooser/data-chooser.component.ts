import {Component, OnInit, Inject, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField} from '@angular/material';
import {DataChooserSettingsComponent} from "../data-chooser-settings/data-chooser-settings.component";
import {SendGravSearchQueryService} from "../../../../shared/gravsearch/sendGravSearchQuery.service";

@Component({
  selector: 'app-data-chooser',
  templateUrl: './data-chooser.component.html',
  styleUrls: ['./data-chooser.component.scss']
})
export class DataChooserComponent implements OnInit, AfterViewChecked {
  gravSearchString: string;
  dataChooserString: string;
  gravSearchResponse: Array<any>;
  chosenPropertyArray: Array<any>;
  dataChooserSettingsOutput: any;
  constructor(
    public dialogSettings: MatDialog,
    private cdr: ChangeDetectorRef,
    private sendGravSearchQueryService: SendGravSearchQueryService
  ) { }

  ngOnInit() {
  }
  openDataChooserDialog() {
    console.log('Open Data Chooser Dialog');
    const dialogRef = this.dialogSettings.open(DataChooserSettingsComponent, {
      width: '1000px',
      height: '1000px',
      data: {  }
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( !result ) {
        this.gravSearchString = 'PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>' +
          'PREFIX incunabula: <http://0.0.0.0:3333/ontology/0803/incunabula/simple/v2#>' +
          'CONSTRUCT { ?myVariable knora-api:isMainResource true .' +
          '?myVariable incunabula:title ?title .' +
          '?myVariable incunabula:description ?description .' +
          '?myVariable incunabula:hasAuthor ?hasAuthor . }' +
          'WHERE { ?myVariable incunabula:title ?title .' +
          '?myVariable incunabula:description ?description .' +
          '?myVariable incunabula:hasAuthor ?hasAuthor .' +
          '?myVariable a incunabula:book . } '
        this.dataChooserString = 'title';
        this.performGravSearchQuery( this.gravSearchString );
      } else {
        this.dataChooserSettingsOutput = result;
        console.log(result.gravSearchQuery);
        result.gravSearchQuery.forEach((value: string, key: string) => {
          this.gravSearchString = value;
          this.performGravSearchQuery( this.gravSearchString );
        });
      }
    });
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  performGravSearchQuery( query: string ) {
    this.sendGravSearchQueryService.sendRequest( query )
      .subscribe(
        data => {
          this.gravSearchResponse = data['@graph'];
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  chooseResource(chosenResource: any) {
    console.log('Chosen Resource:');
    console.log(chosenResource);
    console.log('Assign which app gets which input data and parse input data for each app');
    console.log(this.dataChooserSettingsOutput.appModel);
  }
}
