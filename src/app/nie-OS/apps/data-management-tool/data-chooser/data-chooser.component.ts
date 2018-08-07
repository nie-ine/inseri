import {
  Component,
  OnInit,
  Inject,
  AfterViewChecked,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter} from '@angular/core';
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
  @Input() viewModel = new Set();
  @Output() sendAppTypesBackToNIEOS: EventEmitter<any> = new EventEmitter<any>();
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
      data: this.viewModel
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.dataChooserSettingsOutput = result;
      console.log(result.gravSearchQuery);
      result.gravSearchQuery.forEach((value: string, key: string) => {
        this.gravSearchString = value;
        this.performGravSearchQuery( this.gravSearchString );
      });
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
    if ( this.dataChooserSettingsOutput ) {

      for ( const type in this.dataChooserSettingsOutput.appModel ) {

        if ( this.dataChooserSettingsOutput.appModel[ type ].model.length && type !== 'dataChooser' ) {

          for ( const app of this.dataChooserSettingsOutput.appModel[ type ].model ) {

            app.inputs[ 0 ].set.forEach((value: string, key: string) => {

              console.log(chosenResource[ value ]);
              app.inputs[ 0 ].array = [];
              if ( chosenResource[ value ].length ) {
                for ( const entry of chosenResource[ value ] ) {
                  console.log(entry['knora-api:valueAsString']);
                  app.inputs[ 0 ].array[ app.inputs[ 0 ].array.length ] = entry['knora-api:valueAsString'];
                }
              } else {
                app.inputs[ 0 ].array[ app.inputs[ 0 ].array.length ] = chosenResource[ value ]['knora-api:valueAsString'];
              }
            });
          }
        }
      }
      console.log( this.dataChooserSettingsOutput );
      this.sendAppTypesBackToNIEOS.emit( this.dataChooserSettingsOutput.appModel );
    }
  }
}
