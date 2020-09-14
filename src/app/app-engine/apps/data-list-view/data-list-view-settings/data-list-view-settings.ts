import {Component, Input, OnChanges} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {DisplayedCollumnsService, SettingsService, ColumnHeader } from '../data-list-view-services/data-list-view.service';
import {FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {GeneralRequestService} from '../../../../query-engine/general/general-request.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'data-list-view-settings',
  templateUrl: './data-list-view-settings.html',
  styleUrls: ['data-list-view-settings.css']
})
export class DataListViewSettingsComponent implements OnChanges {
  @Input() appInputQueryMapping: any;
  @Input() hash: string;
  @Input() dataListSettings: any;
  @Input() dataArrays?: Array<string>;
  @Input() dataJson?: any;
  displayedColumns: any;
  selectedOption;
  previewData: any;

  chosenDataSource: string;

  jsonType: string;
  reloadPageChange: Subscription;

  constructor( private displayedCollumnsService: DisplayedCollumnsService,
               private settingsService: SettingsService,
               private displayedColumnsService: DisplayedCollumnsService,
               private requestService: GeneralRequestService
  ) {
    this.reloadPageChange = this.settingsService.reloadPage.subscribe(settings => {
      this.ngOnChanges();
    });
  }

  ngOnChanges() {
    this.jsonType = this.dataListSettings.jsonType;
    this.displayedColumns = this.displayedCollumnsService.getDisplayedColumns();
  }

  updateColumns() {
    this.displayedCollumnsService.setDisplayedColumns(this.displayedColumns);
  }

  recreateGenericColumns() {
    this.dataListSettings.columns.manualColumns = false;
    this.dataListSettings.columns.columnMapping = [];
    this.updateColumns();
    this.saveSettingsToJson(1); // save && soft reload: only settings & columns get updated
  }

  setInitialDataSource() {
    this.dataListSettings.pathToDataArray = this.chosenDataSource;
    this.saveSettingsToJson(2); // save && hard reload
  }

  testDataSource(path) {
    this.previewData = this.displayedColumnsService.getDataFromPath(path, this.dataJson);
  }

  resetDataSource() {
    this.dataListSettings.pathToDataArray = '';
    this.dataListSettings.jsonType = 'any';
    this.dataListSettings.columns.manualColumns = false;
    this.dataListSettings.columns.columnMapping = [];
    this.saveSettingsToJson(2);
  }

  saveJsonType() {
    this.dataListSettings.jsonType = this.jsonType;
    this.dataListSettings.columns.manualColumns = false;
    this.dataListSettings.columns.columnMapping = [];
    this.updateColumns();
    this.saveSettingsToJson(1);
  }


  drop(event: CdkDragDrop<ColumnHeader[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    this.updateColumns();
  }

  addStyle(event: MatChipInputEvent, columnIndex: number): void {
    const input = event.input;
    const value = event.value;

    // Add our style
    if ((value || '').trim()) {
      this.displayedColumns[columnIndex].styles.push(value.trim());
      // if there is a font-style:normal, we have to remove it
      if (this.displayedColumns[columnIndex].styles.includes('font-style: normal')) {
        const normalStyleToRemove = this.displayedColumns[columnIndex].styles.indexOf('font-style: normal');
        this.displayedColumns[columnIndex].styles.splice(normalStyleToRemove, 1);
      }
      this.updateColumns();
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeStyle(colIndex, styleIndex): void {
    if (this.displayedColumns[colIndex].styles.length > 1) {
      this.displayedColumns[colIndex].styles.splice(styleIndex, 1);
    } else {
      // if the style to remove is the last remaining style in the array, we add font-style: normal
      this.displayedColumns[colIndex].styles.splice(styleIndex, 1);
      this.displayedColumns[colIndex].styles.push('font-style: normal');
    }
    this.updateColumns();
  }

  addLinkPart(colIndex: number, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add link part
    if ((value || '').trim()) {
      this.displayedColumns[colIndex].link.linkPath.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeLinkPart(colIndex: number, linkindex: number): void {
      this.displayedColumns[colIndex].link.linkPath.splice(linkindex, 1);
  }

  saveColumnDefinition() {
    this.dataListSettings.columns.columnMapping = this.displayedColumns;
    this.saveSettingsToJson(0);
  }

  saveSettingsToJson(reload: number) {
    this.requestService.updateFile(
      this.appInputQueryMapping[ this.hash ][ 'settings' ][ 'serverUrl' ].split('/')[ 6 ], {
        [this.hash]: {
          settings: JSON.stringify(this.dataListSettings)
        }
      }
    ).subscribe(
      data => {
        if (reload === 1) { this.settingsService.reloadComponentWithNewSettings(this.dataListSettings); }
        console.log( data );
        if (reload === 2) {
          window.location.reload();
        }

      }, error => console.log( error )
    );
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
