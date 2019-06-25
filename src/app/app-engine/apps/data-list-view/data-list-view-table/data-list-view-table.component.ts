import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DataListViewDetailsDialogComponent } from '../data-list-view-details-dialog/data-list-view-details-dialog.component';
import { DataService } from '../resources.service';
import { PipeTransform, Pipe } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'data-list-view-table',
  templateUrl: './data-list-view-table.component.html',
  providers: [DataService]
})
export class DataListViewTableComponent implements OnInit {
  @Input() dataListSettings: any;
  @Input() dataToDisplay: any;
  @Input() displayedColumns?: any;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // cssUrl: string;
  dataSource: MatTableDataSource <any>;
  dataSourceForExport: MatTableDataSource <any>;
  // TODO: highlight filter results in table cells by pipe
  toHighlightByFilter: string = ''; // For highlighting Filter results
  // Export variables
  renderedData: any;
  renderedDisplayedData: any;
  exportSelection = 'displayed';
  UMLAUT_REPLACEMENTS = '{[{ "Ä", "Ae" }, { "Ü", "Ue" }, { "Ö", "Oe" }, { "ä", "ae" }, { "ü", "ue" }, { "ö", "oe" }]}';

  constructor(private dialog: MatDialog, private dataService: DataService) {
  }

  ngOnInit() {
    // console.log('displayed columns:' + this.displayedColumns);
    this.populateByDatastream();
    this.setFilter();
  }
  //
  // DATA STREAM
  //
  private populateByDatastream() {
    // INSTANTIATE the datasource of the table
    // TODO: if (jsonType === extendedSearch ) { ... }
    this.dataSource = new MatTableDataSource(this.dataToDisplay);
    this.dataSource.connect().subscribe(data => { this.renderedDisplayedData = data;} );
    if (this.dataListSettings.paginator.paginate) { this.dataSource.paginator = this.paginator; }

    // SUBSCRIBE to the tabledata for exporting this rendered data
    this.dataSourceForExport = new MatTableDataSource(this.dataToDisplay);
    this.dataSourceForExport.connect().subscribe(data => this.renderedData = data);

    if (this.dataSource) {
      if (this.dataListSettings.columns.nestedDatasource) {
        // IF the dataSource is nested sort must sort the table for subproperties (item.poperty.value)
        // and not for properties (standard sort). Therefore changing the sortingDataAccessor.
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            default:
              return item[property].value;
          }};
      } /*else {
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            default:
                return this.replaceUmlaute(item[property]);
          }};*/
      this.dataSource.sort = this.sort;
    }
    //
  }

public replaceUmlaute(input) {
  console.log(input);
  for (const i of this.UMLAUT_REPLACEMENTS) {
    console.log(i[0], i[1]);
    input = input.replace(i[0], i[1]);
    }
    // console.log(input);
  return input;
  }

  // FILTERING THE datasource acc to settings
  private doFilter(value: string) {
    if (this.dataListSettings.filter.caseSensitive) { this.dataSource.filter = value;
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
    // setting Filter predicate acc. to settings
    this.dataSource.filterPredicate = (data, filter) => {
      // console.log("resetting filter predicate for Filter term " + filter);
      const dataStr: string = this.joinFilteredColumns(data);
      // applying case sensitivity/insensitivity from settings
      if (this.dataListSettings.filter.caseSensitive) {
        return dataStr.indexOf(filter) !== -1;
      } else {
        return dataStr.toLowerCase().indexOf(filter) !== -1;
      }
    };
  }

  private joinFilteredColumns(data) {
    let dataStr = '';
    if ( this.dataListSettings.columns.genericColumns === false ) {
      // JOINING all columns to be searched by filter (defined in the settings) together.
      // NOTE: If the datasource would be nested we have to set filtered data from data to sth like data.[column].value
      // so the object property value is compared by filtering and not the object itself.
      for (const column of this.dataListSettings.columns.columnMapping) {
        if (column.filtered) {
          dataStr = dataStr + data[column.name];
          }
      }
    } else {for (const column of this.displayedColumns) {
        dataStr = dataStr + data[column];
        }
    }
    return dataStr;
  }

  private onThisClick(val, object) {
    // SIMPLE METHOD TO DO SOMETHING WITH THE clicked cell/object like passing it to somewhere
    if (this.dataListSettings.actions.actions && this.dataListSettings.actions.actionMode === 'object') {
      if (this.dataListSettings.actions.actionType === 'dialog') {
        console.log('opening detail dialog with object with property value ' + val);
        this.openDetailsDialog(val);
      } else {
        console.log('actions disabled or no action defined');
      }
    }
  }

  // TODO: maybe outsource this
  private openDetailsDialog(msg) {
    this.dialog.open(DataListViewDetailsDialogComponent, {
      data: {
        message: msg, buttonText: {cancel: 'close'
        }
      },
    });
  }

  // TODO: maybe implement features from events by hostlistener ...
  /* @HostListener('click', ['$event'])
   onClick(event) {
    if (this.dataListSettings.actions.actions && this.dataListSettings.actions.actionMode === 'host' &&
    event.target.parentElement.classList[0] === 'fuuws') {
        // HERE THINGS CAN BE ADDED §
        console.log('opening detail dialog with ' + event.target.firstChild.data );
        console.log( event.target );
        this.openDetailsDialog(event.target.firstChild.data);
      } // else {console.log('actions on cells disabled or no action defined')}
  }*/


  //
  // EXPORT TO CSV
  public exportToCsv() {

    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'data export',
      useBom: true,
      noDownload: false,
      headers: this.displayedColumns
    };

    let exportData = this.getExportData();
    new ngxCsv(exportData, options.title, options);
  }

  public getExportData() {
    if (this.exportSelection === 'displayed') {
      return this.renderedDisplayedData;
    } else { return this.renderedData; }
  }

  /*public flatten(data) {
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
  }*/
  //
// Display / Design stuff
//
private isColumnSticky (column: number): boolean {
  // Returns for each column whether/which column should be sticky when scrolling horizontally
  // (this.dataListSettings.columns.stickyColumn ? true : false)
  return !!this.dataListSettings.columns.stickyColumn;
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
