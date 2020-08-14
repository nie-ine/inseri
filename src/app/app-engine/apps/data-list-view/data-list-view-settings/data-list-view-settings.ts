import {Component, Input, OnChanges} from '@angular/core';
import {DisplayedCollumnsService} from '../data-list-view-services/table-data.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'data-list-view-settings',
  templateUrl: './data-list-view-settings.html'
})
export class DataListViewSettingsComponent implements OnChanges
{
  @Input() dataListSettings: any;
  @Input() displayedColumnsIn: any;
  displayedColumns: any;
  selectedOption;
  columnMapping: Array<ColumnDefinition>;

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor( private displayedCollumnsService: DisplayedCollumnsService
  ) {  }

  ngOnChanges() {
    this.displayedColumns = this.displayedColumnsIn;
  }

  saveColumns() {
    this.displayedCollumnsService.setDisplayedColumns(this.displayedColumns);
  }

  restoreColumns() {
    this.displayedCollumnsService.restoreOriginalDisplayedColumns();
  }

  createColumnMapping() {
    this.columnMapping = [];
    for (const col of this.displayedColumns) {
      console.log(col);
      const colDef = new ColumnDefinition( col, col, true, true);
      this.columnMapping.push(colDef);
      }
    console.log('my new comlumn Mapping: ', this.columnMapping);
  }

  reloadColumns() {
    this.restoreColumns();
    this.createColumnMapping();
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
