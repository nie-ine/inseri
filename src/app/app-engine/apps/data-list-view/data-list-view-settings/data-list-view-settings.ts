import {Component, EventEmitter, Input, OnChanges} from '@angular/core';
import {DisplayedCollumnsService, OriginalColumnService, SettingsService} from '../data-list-view-services/table-data.service';
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

  drop(event: CdkDragDrop<ColumnDefinition[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    this.updateColumns();
  }
}

export class ColumnDefinition {
  colName: string;
  path: string;
  displayed: boolean;
  filtered: boolean;
  type?: string;
  link?: string;

  constructor( colName, path, displayed, filtered, type?, link?) {
    this.colName = colName;
    this.path = path;
    this.displayed = displayed;
    this.filtered = filtered;
    this.type = type;
    this.link = link;
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
