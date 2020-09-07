import {Component, Input, OnChanges, ViewChild, EventEmitter, Output} from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { PipeTransform, Pipe } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import {Router} from '@angular/router';
import {ColumnHeader, DisplayedCollumnsService, SettingsService, DataCell} from '../data-list-view-services/data-list-view.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'data-list-view-table',
  templateUrl: './data-list-view-table.component.html',
  styleUrls: ['data-list-view-table.component.scss']

})
export class DataListViewTableComponent implements OnChanges {
  @Input() dataListTableSettings?: any;
  @Input() dataToDisplay: any;
  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>(); // Emit changes to other apps
  definedColumns: Array<ColumnHeader>; // The columns defined by settings;
  displayedColumns: string[]; // The displayed columns used by mat table;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource <any>;
  dataSourceForExport: MatTableDataSource <any>;
  // TODO: highlight filter results in table cells by pipe
  toHighlightByFilter = ''; // For highlighting Filter results
  columnDefSub: Subscription; // subscribe to changes in column definition.
  // Export variables
  renderedData: any; // rendered Export data
  renderedDisplayedData: any; // rendered data for export: only the displayed data (filtered && on first page if paginated)
  exportSelection = 'displayed'; // Wether only data which is displayed is exported or not. default: displayed data only
  exportFormat = 'json'; // default export format
  // Replacing
  UMLAUT_REPLACEMENTS = '{[{ "Ä", "Ae" }, { "Ü", "Ue" }, { "Ö", "Oe" }, { "ä", "ae" }, { "ü", "ue" }, { "ö", "oe" }, {É, E}]}';

  hoveredDataCell: DataCell;

  constructor( private _router: Router,
               private settingsService: SettingsService,
               private columnService: DisplayedCollumnsService ) {
    this.columnDefSub = this.columnService.definedColumnsChange.subscribe(cols => {
      this.definedColumns = cols;
      this.updateDisplayedColumns();
      if (this.dataSource) { this.setFilter(); }
    });
    }

  ngOnChanges() {
    this.definedColumns = this.columnService.getDisplayedColumns();
    this.updateDisplayedColumns();
    this.populateByDatastream();
    if (this.dataSource) { this.setFilter(); }
  }
  //
  // DATA STREAM
  //
  populateByDatastream() {
    // INSTANTIATE the datasource of the table
    this.dataSource = new MatTableDataSource(this.dataToDisplay);
    this.dataSource.connect().subscribe(data => { this.renderedDisplayedData = data; } );
    if (this.dataListTableSettings.paginator.paginate) { this.dataSource.paginator = this.paginator; }

    // SUBSCRIBE to the tabledata for exporting this rendered data
    this.dataSourceForExport = new MatTableDataSource(this.dataToDisplay);
    this.dataSourceForExport.connect().subscribe(data => this.renderedData = data);

  }

  ngAfterViewInit() {
    // AS the dataSource is nested sort must sort the table for subproperties (item.poperty.value)
    // and not for properties (standard sort). Therefore changing the sortingDataAccessor.
    this.dataSource.sortingDataAccessor = (item, property) => {
      if ( item[property] ) {
        if ('value' in item[property]) {
          return item[property].value.toLowerCase();
        }
      }
    };
    this.dataSource.sort = this.sort;
  }

  updateDisplayedColumns() {
    if ( this.definedColumns ) {
      this.displayedColumns = [];
      this.definedColumns.forEach(col => {
        if (col.display) { this.displayedColumns.push(col.columnPath); }
      });
    }
  }


  public replaceUmlaute(input) {
    for (const i of this.UMLAUT_REPLACEMENTS) {
      // console.log(i[0], i[1]);
      input = input.replace(i[0], i[1]);
      } return input;
    }

  // FILTERING THE datasource acc to dataListTableSettings
  doFilter(value: string) {
    if (this.dataListTableSettings.filter.caseSensitive) { this.dataSource.filter = value;
      // TODO: highlighting
      this.toHighlightByFilter = value;
    } else { this.dataSource.filter = value.toLowerCase();
      // TODO: highlighting
      this.toHighlightByFilter = value;
    }
  }

  //
  // FILTER
  //
  private setFilter() {
    // setting Filter predicate acc. to dataListTableSettings
    this.dataSource.filterPredicate = (data, filter) => {
      // console.log("resetting filter predicate for Filter term " + filter);
      const dataStr: string = this.joinFilteredColumns(data);
      // applying case sensitivity/insensitivity from dataListTableSettings
      if (this.dataListTableSettings.filter.caseSensitive) {
        return dataStr.indexOf(filter) !== -1;
      } else {
        return dataStr.toLowerCase().indexOf(filter) !== -1;
      }
    };
  }

  private joinFilteredColumns(data) {
    let dataStr = '';
    if ( this.dataListTableSettings.columns.manualColumns === true ) {
      // JOINING all columns to be searched by filter (defined in the dataListTableSettings) together.
      // NOTE: If the datasource would be nested we have to set filtered data from data to sth like data.[column].value
      // so the object property value is compared by filtering and not the object itself.
      for (const column of this.dataListTableSettings.columns.columnMapping) {
        if (column.filtered) {
          if (data[column.columnPath]) {
            if ('value' in data[column.columnPath]) {
              dataStr = dataStr + data[column.columnPath].value;
            }
          }
          }
      }
    } else {for (const column of this.displayedColumns) {
        if (data[column]) {
          if ('value' in data[column]) {
            dataStr = dataStr + data[column].value;
          }
        }
      }
    }
    return dataStr;
  }

  getStyles(styles: Array<string> ) {
    const style = {};
    styles.forEach(s => style[s.split(':')[0]] = s.split(':')[1]);
    // console.log('style', style);
    // return {'font-weight': 'bold', 'font-style': 'italic'};
    // style['cursor'] = (link !== 'none') ? 'pointer' : 'unset';
    return style;
  }

  private onThisClick(col, index) {
    let v = '';
    col.link.linkPath.forEach(p => {
      if (p[0] === '"') { v = v + p.split('"').join(''); } else { v = v + index[p].value; } });
    if (col.link.linkType === 'external') {
      window.open(v, '_blank');
    } else {
      this.updateURL(v, col.link.variableToPass);
    }
  }

  updateURL( index: any, variableToPass = '' ) {
    this._router.navigate([], {
      queryParams: {
        [variableToPass]: index
      },
      queryParamsHandling: 'merge'
    });
    this.reloadVariables.emit();
  }

  // EXPORT

  export() {
    switch (this.exportFormat) {
      case 'csv': {
        this.exportToCsv();
        break;
      }
      case 'json': this.exportToJson();

    }
  }

  public exportToCsv() {

    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'table export',
      useBom: true,
      noDownload: false,
      headers: this.displayedColumns
    };

    let exportData = this.getExportData();
    new ngxCsv(exportData, options.title, options);
  }

  exportToJson() {
    let data;
    if (this.exportSelection === 'displayed') {data = this.renderedDisplayedData} else {
      data = this.renderedData;
    }
    const dataStr = JSON.stringify(data, null, 2);
    const file = new Blob([dataStr], {type: 'text/json'});
    this.download(file, 'export.json');
  }

  download(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) { window.navigator.msSaveOrOpenBlob(blob, filename); } else {
      let elem = document.createElement('a'), url = URL.createObjectURL(blob);
      elem.href = url;
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      setTimeout(function() {
        document.body.removeChild(elem);
        window.URL.revokeObjectURL(url);
      },0);
    }
  }

  copyToClipboard(item): void {
    let listener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }

  public getExportData() {
    if (this.exportSelection === 'displayed') {
      return this.flatten(this.renderedDisplayedData);
    } else { return this.flatten(this.renderedData); }
  }

  public flatten(data) {
    // FLATTENS the data so the actual values of the nested objects are exported - not whole objects.
    let flattenedData = [];
    for (let obj in data) {
          let flattenobject = [];
          if (obj < data.length) {
            for (let property in data[obj]) {
              const prop = data[obj][property].value;
              flattenobject.push(prop);
            }
            flattenedData.push(flattenobject);
          }
    }
    return flattenedData;
  }


  isColumnSticky(column: number): boolean {
    // Returns for each column whether/which column should be sticky when scrolling horizontally
    // (this.dataListTableSettings.columns.stickyColumn ? true : false)
    return false;
    }

  getSumOfDisplayedEntries() {
    if (this.dataSource.filter) {
      return this.dataSource.filteredData.length;
    } else {
      if (this.paginator.pageSize > this.dataSource.data.length) {
        return this.dataSource.data.length;
      } else { return this.paginator.pageSize; }
    }
  }

}

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, search): string {
    const pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex, match => `<b>${match}</b>`) : text;
  }

}

