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
    if (dataListSettings.columns.genericColumns) {
      if (dataListSettings.jsonType === 'sparql') {
        displayedColumns = this.createColumns(data.head.vars);
      } else {
        // gets the data array from a given path string pathToDataArray
        const dataArray = dataListSettings.pathToDataArray.split('.').reduce((a, b) => a[b], data);
        const distinctColumns = this.generateDisplayedColumnsFromData(dataArray);
        displayedColumns = this.createColumns(distinctColumns);
        }
      // if not generic columns
    } else {
      for (const column of dataListSettings.columns.columnMapping) {
        const col = new ColumnHeader(column.name, column.path, column.displayed, column.filtered, column.link, column.type );
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
    console.log('disp cols set: ', cols);
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
  link: string;

  constructor(value, type, link) {
    this.value = value;
    this.type = type;
    this.link = link;
  }
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  settingsOpenState = false;
  settingsOpenStateChange: EventEmitter<boolean>;

  constructor() {
    this.settingsOpenStateChange = new EventEmitter<boolean>();
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

  constructor(columnName, columnPath, display?, filtered?, styles?: Array<any>, link?: InLink, type?) {
    this.columnName = columnName;
    this.columnPath = columnPath;
    this.display = display || true;
    this.filtered = filtered || true;
    this.styles = styles || ['font-style: normal'];
    this.link = link || {linkType: 'external', linkValue: columnPath};
    this.type = type || 'literal';
  }
}

export interface InLink {
  linkType: string;
  linkValue: string;
}



@Injectable({ providedIn: 'root' })
export class OriginalColumnService {
  private originalColumnDefinition = [];


  setOriginalDisplayedColumns(cols) {
    this.originalColumnDefinition = cols;
    console.log('this.originalColumnDefinition is set', this.originalColumnDefinition);
  }

  getOriginalDisplayedColumns() {
    console.log('this.originalColumnDefinition has been requested', this.originalColumnDefinition)
    return this.originalColumnDefinition;
  }
}
