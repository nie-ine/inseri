import {EventEmitter, Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })

export class DisplayedCollumnsService {
  displayedColumns: Array<ColumnHeader>;
  displayedColumnsChange: EventEmitter<Array<any>>;

  displayedColumnsSet = new Set();

  constructor() {
    this.displayedColumnsChange = new EventEmitter<Array<any>>();
  }

  public createColumns(columns: Array<string>) {
    const dispColumns = [];
    columns.forEach(colDef => {

      const column = new ColumnHeader(colDef, colDef);
      dispColumns.push(column);
    });
    return dispColumns;
  }

  public setInitialDisplayedColumns(dataListSettings, data?) {
    let displayedColumns: Array<any> = [];
    if (!dataListSettings.columns.manualColumns) {
      if (dataListSettings.jsonType === 'sparql') {
        displayedColumns = this.createColumns(data.head.vars);
      } else {
        console.log('datalistSettings: ', dataListSettings );
        console.log('data: ', data);
        // gets the data array from a given path string pathToDataArray
        const dataArray = dataListSettings.pathToDataArray.split('.').reduce((a, b) => a[b], data);
        console.log('dataArray: ', dataArray);
        const distinctColumns = this.generateDisplayedColumnsFromData(dataArray);
        displayedColumns = this.createColumns(distinctColumns);
        }
    } else { // if manual columns
      for (const column of dataListSettings.columns.columnMapping) {
        const col = new ColumnHeader(column.columnName, column.columnPath, column.display, column.filtered, column.styles, column.link, column.type );
        displayedColumns.push(col);
      }
    }
    this.setDisplayedColumns(displayedColumns);
    return displayedColumns;
  }

  public getDisplayedColumns() {
    return this.displayedColumns;
  }

  public setDisplayedColumns(cols) {
    this.displayedColumns = cols;
    this.displayedColumnsChange.emit(this.displayedColumns);
  }

  private generateDisplayedColumnsFromData(data: Array<any>) {
    data.forEach( obj => this.collectColumns(obj));
    return Array.from(this.displayedColumnsSet.values());
  }

  collectColumns(input, reference?) {
    // FLATTENS the objects completely into a property name with the original path with dots as delimiters.
    let colName = '';
    Object.keys(input).forEach(propName => {
      if (reference) {
        colName = reference + '.' + propName; } else { colName = propName; }
      const p = input[propName];
      if (typeof p === 'object' && p !== null) {
        this.collectColumns(p, colName); } else {
          this.displayedColumnsSet.add(colName);
      }
    });
  }
}

export class DataCell {
  value: string;
  type: string;

  constructor(value, type, link) {
    this.value = value;
    this.type = type;
  }
}

@Injectable({ providedIn: 'root' })

export class SettingsService {
  settingsOpenState = false;
  settingsOpenStateChange: EventEmitter<boolean>;
  reloadPage: EventEmitter<any>;

  constructor() {
    this.settingsOpenStateChange = new EventEmitter<boolean>();
    this.reloadPage = new EventEmitter<any>();
  }

  reloadComponentWithNewSettings(settings) {
    this.reloadPage.emit(settings);
  }

  switchOpenState() {
    this.settingsOpenState = !this.settingsOpenState;
    this.settingsOpenStateChange.emit(this.settingsOpenState); }
}

export class ColumnHeader {
  columnName: string;
  columnPath: string;
  display: boolean;
  filtered: boolean;
  styles: Array<any>;
  type?: string;
  link?: InLink;

  constructor(columnName: string,
              columnPath: string,
              display = true,
              filtered = true,
              styles: Array<any> = ['font-style: normal'],
              link: InLink =  {linkType: 'none', linkPath: [], variableToPass: ''},
              type: string = 'literal') {
    this.columnName = columnName;
    this.columnPath = columnPath;
    this.display = display;
    this.filtered = filtered;
    this.styles = styles;
    this.link = link;
    this.type = type;
  }
}

export interface InLink {
  linkType: string;
  linkPath: Array<string>;
  variableToPass: string;
}
