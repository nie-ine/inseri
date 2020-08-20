import {EventEmitter, Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })

export class DisplayedCollumnsService {
  displayedColumns: Array<any>;
  displayedColumnsChange: EventEmitter<Array<any>>;
  originalDisplayedColumns: Array<any>;
  displayedColumnsSet = new Set();

  constructor() {
    this.displayedColumnsChange = new EventEmitter<Array<any>>();
  }

  public createColumns(columns: Array<string>) {
    const dispColumns = [];
    columns.forEach(colDef => {
      const column = new DataHeader(colDef, colDef);
      dispColumns.push(column);
    });
    return dispColumns;
  }

  public setInitialDisplayedColumns(dataListSettings, data?) {
    let displayedColumns: Array<any> = [];
    if (dataListSettings.columns.genericColumns) {
      if (dataListSettings.jsonType === 'sparql') {
        displayedColumns = this.createColumns(data.head.vars);
        this.setDisplayedColumns(displayedColumns);
      } else {
        // gets the data array from a given path string pathToDataArray
        const dataArray = dataListSettings.pathToDataArray.split('.').reduce((a, b) => a[b], data);
        const distinctColumns = this.generateDisplayedColumnsFromData(dataArray);
        displayedColumns = this.createColumns(distinctColumns);
        this.originalDisplayedColumns = displayedColumns;
        this.setDisplayedColumns(displayedColumns);
        }
      // if not using generic columns
    } else {
      for (const column of dataListSettings.columns.columnMapping) {
        if (column.displayed === true) {
          const col = new DataHeader(column.name, column.path );
          displayedColumns.push(col);
        }
      }
      this.originalDisplayedColumns = displayedColumns;
      this.setDisplayedColumns(displayedColumns);
    }
  }

  public setDisplayedColumns(cols) {
    this.displayedColumns = cols;
    console.log('new disp cols: ', cols);
    this.displayedColumnsChange.emit(this.displayedColumns);
  }

  public restoreOriginalDisplayedColumns() {
    this.displayedColumns = this.originalDisplayedColumns;
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

export class DataHeader {
  columnName: string;
  columnPath: string;

  constructor(columnName, columnPath) {
    this.columnName = columnName;
    this.columnPath = columnPath;
  }
}
