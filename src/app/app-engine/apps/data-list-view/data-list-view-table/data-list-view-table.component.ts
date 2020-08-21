import {Component, Input, OnInit, OnChanges, ViewChild, EventEmitter, Output} from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { DataListViewInAppQueryService} from '../services/query.service';
import {Router} from '@angular/router';
import {DisplayedCollumnsService, SettingsService} from '../data-list-view-services/table-data.service';
import {Subscription} from 'rxjs';

// import { DataListViewSettings } from '../data-list-view-dataListSettings/data-list-view-dataListSettings.service';

@Component({
  selector: 'data-list-view-table',
  templateUrl: './data-list-view-table.component.html',

})
export class DataListViewTableComponent implements OnChanges {
  @Input() dataListTableSettings?: any;
  @Input() dataToDisplay: any;
  definedColumns: any;
  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>();
  displayedColumns: string[];

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // cssUrl: string;
  dataSource: MatTableDataSource <any>;
  dataSourceForExport: MatTableDataSource <any>;
  // TODO: highlight filter results in table cells by pipe
  toHighlightByFilter = ''; // For highlighting Filter results
  columnDefSub: Subscription; // subscribe to changes in column definition.
  // Export variables
  renderedData: any;
  renderedDisplayedData: any;
  exportSelection = 'displayed';
  exportFormat = 'json';
  UMLAUT_REPLACEMENTS = '{[{ "Ä", "Ae" }, { "Ü", "Ue" }, { "Ö", "Oe" }, { "ä", "ae" }, { "ü", "ue" }, { "ö", "oe" }, {É, E}]}';

  constructor( private _router: Router,
               private settingsService: SettingsService,
               private columnService: DisplayedCollumnsService ) {
    this.columnDefSub = this.columnService.displayedColumnsChange.subscribe(cols => {
      this.definedColumns = cols;
      console.log('secretly updated columns:', cols);
      this.updateDisplayedColumns();
    });
    }

  ngOnChanges() {
    this.definedColumns = this.columnService.getDisplayedColumns();
    this.updateDisplayedColumns();
    console.log('new columns in table component: ', this.definedColumns);
    this.populateByDatastream();
    this.setFilter();
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
    this.displayedColumns = [];
    this.definedColumns.forEach(col => {
      if (col.display) { this.displayedColumns.push(col.columnPath); }
    });
  }


public replaceUmlaute(input) {
  for (const i of this.UMLAUT_REPLACEMENTS) {
    // console.log(i[0], i[1]);
    input = input.replace(i[0], i[1]);
    }
    // console.log(input);
  return input;
  }

  // FILTERING THE datasource acc to dataListTableSettings
  private doFilter(value: string) {
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
    if ( this.dataListTableSettings.columns.genericColumns === false ) {
      // JOINING all columns to be searched by filter (defined in the dataListTableSettings) together.
      // NOTE: If the datasource would be nested we have to set filtered data from data to sth like data.[column].value
      // so the object property value is compared by filtering and not the object itself.
      for (const column of this.dataListTableSettings.columns.columnMapping) {
        if (column.filtered) {
          if (data[column.path]) {
            if ('value' in data[column.path]) {
              dataStr = dataStr + data[column.path].value;
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

  private onThisClick(col, val, index) {
    // SIMPLE METHOD TO DO SOMETHING WITH THE clicked cell/object like passing it to somewhere
    if (col.link.type === 'external') {
      //this.definedColumns[index]
      // open page in new window
      console.log(index);

    } else {
      console.log(col);
      console.log(index);
      // this.updateURL(index);
    }
  }

  updateURL( index: any ) {
    this._router.navigate([], {
      queryParams: {
        ['verseNumber']: index
      },
      queryParamsHandling: 'merge'
    });
    this.reloadVariables.emit();
  }

  // TODO: maybe implement features from events by hostlistener ...
  /* @HostListener('click', ['$event'])
   onClick(event) {
    if (this.dataListTableSettings.actions.actions && this.dataListTableSettings.actions.actionMode === 'host' &&
    event.target.parentElement.classList[0] === 'fuuws') {
        // HERE THINGS CAN BE ADDED §
        console.log('opening detail dialog with ' + event.target.firstChild.data );
        console.log( event.target );
        this.openDetailsDialog(event.target.firstChild.data);
      } // else {console.log('actions on cells disabled or no action defined')}
  }*/


  //
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

  openSettings() {
    this.settingsService.switchOpenState();
  }
  //
// Display / Design stuff
//
private isColumnSticky(column: number): boolean {
  // Returns for each column whether/which column should be sticky when scrolling horizontally
  // (this.dataListTableSettings.columns.stickyColumn ? true : false)
  return !!this.dataListTableSettings.columns.stickyColumn;
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
// TODO: highlighting filter results in cells by pipe
@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, search): string {
    const pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex, match => `<b>${match}</b>`) : text;
  }

}

