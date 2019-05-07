import { Component, Input, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource, Sort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DataListViewDetailsDialogComponent } from '../data-list-view-details-dialog/data-list-view-details-dialog.component';
import { PipeTransform, Pipe } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'data-list-view-table',
  templateUrl: './data-list-view-table.component.html',
  styleUrls: ['./data-list-view-table.component.css']
})
export class DataListViewTableComponent implements OnInit {
  @Input() dataListSettings: any;
  @Input() dataToDisplay: any;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: any;
  isLoading = true; // simple bool for displaying a loading sign until the data is loaded and displayed
  dataSource: MatTableDataSource <any>;

  // TODO: highlight filter results in table cells by pipe
  toHighlightByFilter: string = ''; // For highlighting Filter results
  renderedData: any;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
      this.populateByDatastream();
      this.getColumns();
      this.setFilter();
  }

  //
  // DATA STREAM
  //
  private populateByDatastream() {
    // INSTANTIATE the datasource of the table
    this.dataSource = new MatTableDataSource(this.dataToDisplay.results.bindings);
    this.isLoading = false;
    this.dataSource.paginator = this.paginator;

    // SUBSCRIBE to the tabledata for exporting this rendered data
    this.dataSource.connect().subscribe(data => this.renderedData = data);

    // AS the dataSource is nested MATSORT must sort the Table for subproperties (item.poperty.value)
    // and not for properties (standard sort).
    if (this.dataSource) {
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          default:
            return item[property].value;
        }
      };
    }

    this.dataSource.sort = this.sort;

  }

  // GETS columns - either from the settings or by reading our the JSON (manualColumndefinition = false)
  private getColumns() {
    if (this.dataListSettings.columns.manualColumnDefinition){
      this.displayedColumns = this.dataListSettings.columns.displayedColumns;
      console.log('got displayed columns by manual definition: ' + this.displayedColumns);
    } else if ( this.dataToDisplay ) {
      this.displayedColumns = this.dataToDisplay.head.vars;
      console.log('got displayed columns from data stream: ' + this.displayedColumns);
    }
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
      const dataStr = this.joinFilteredColumns(data);
      // applying case sensitivity/insensitivity from settings
      if (this.dataListSettings.filter.caseSensitive) {
        return dataStr.indexOf(filter) !== -1;
      } else {
        return dataStr.toLowerCase().indexOf(filter) !== -1;
      }
    };
  }

  private joinFilteredColumns(data) {
    // JOINING all columns to be searched by filter (defined in the settings) together.
    // NOTE: as the datasource is nested we have to set filtered data from data to sth like data.[column].value
    // so the object property value is compared by filtering and not the object itself.
    let dataStr = '';
    for (let col in this.dataListSettings.filter.filteredColumns) {
      dataStr = dataStr + data[this.dataListSettings.filter.filteredColumns[col]].value
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
  // TODO: adjust export to csv to the nested objects
  private exportToCsv() {
    let data = this.renderedData;

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

    new ngxCsv(data, options.title, options);

  }
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
