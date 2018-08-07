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
    console.log('Chosen Resource:');
    console.log(chosenResource);
    console.log('Assign which app gets which input data and parse input data for each app');
    if ( this.dataChooserSettingsOutput ) {
      console.log(this.dataChooserSettingsOutput.appModel);
    }
    console.log(this.viewModel);
    this.sendAppTypesBackToNIEOS.emit( this.dataChooserSettingsOutput.appModel );
  }
}
