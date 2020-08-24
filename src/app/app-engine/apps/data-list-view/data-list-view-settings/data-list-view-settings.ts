import {Component, EventEmitter, Input, OnChanges} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {DisplayedCollumnsService, OriginalColumnService, SettingsService, ColumnHeader } from '../data-list-view-services/table-data.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'data-list-view-settings',
  templateUrl: './data-list-view-settings.html',
  styleUrls: ['data-list-view-settings.css']
})
export class DataListViewSettingsComponent implements OnChanges
{
  @Input() dataListSettings: any;
  displayedColumns: any;
  selectedOption;
  nameFormControls: Array<FormControl>;

  matcher = new MyErrorStateMatcher();

  constructor( private displayedCollumnsService: DisplayedCollumnsService,
               private settingsService: SettingsService,
               private originalColumnsService: OriginalColumnService
  ) { }

  ngOnChanges() {
    this.displayedColumns = this.displayedCollumnsService.getDisplayedColumns();
    this.createNameFormControls(this.displayedColumns);
  }

  createNameFormControls(columns) {
    this.nameFormControls = [];
    columns.forEach( col => {
      this.nameFormControls.push(new FormControl('', [
        Validators.required
      ]));
    });
  }

  updateColumns() {
    this.displayedCollumnsService.setDisplayedColumns(this.displayedColumns);
  }

  saveColumns() {
    this.dataListSettings.columns.columnMapping = this.displayedColumns;
    // TODO: save to file
  }

  closeSettings() {
    this.settingsService.switchOpenState();
  }

  recreateGenericColumns() {
    this.dataListSettings.columns.genericColumns = true;
    this.dataListSettings.columns.columnMapping = [];
    // save the sets & reload
  }

  reloadColumns() {
    const cols = this.originalColumnsService.getOriginalDisplayedColumns();
    this.displayedCollumnsService.setDisplayedColumns(cols);
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
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
