import { Component, Input, OnInit, ViewChild, HostListener } from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import { DataService } from './resources.service';
import { MatDialog } from '@angular/material';
import { DataListViewDetailsDialogComponent } from './data-list-view-details-dialog/data-list-view-details-dialog.component';
import { PipeTransform, Pipe } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'data-list-view',
  styleUrls: ['data-list-view-component.css'],
  templateUrl: './data-list-view.component.html',
  providers: [DataService]
})

export class DataListView implements OnInit {
  @Input() queryResponse: any;
  //
  // Inputmode:  "json" --> queryResponse will be displayed;
  // Inputmode "query": A passed query will be run by the app itself and the answer will be displayed;
  @Input() inputMode: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  resData: any;
  fuu: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns = {};

  // TODO: highlight filter results in table cells by pipe
  toHighlightByFilter: string = ''; // For highlighting Filter results

  // TODO: Store/load SETTINGS on/from MongoDB:
  dataListSettings = {
    "inputModeFallback":  "querys",
    "columns":{
      "manualColumnDefinition": false,
      "displayedColumns": ["authorsname", "description"],
      "stickyColumn": 0,
      },
    "filter": {   "showFilter": true,
      "filteredColumns": ["authorsname", "description"],
      "caseSensitive" : false},
    "paginator":{ "pageIndex": "0",
      "pageSize": "5",
      "pageSizeOptions": [5, 10, 25, 50, 100, 250]},
    "export": {   "showExport": true},
    "sort":{      "disallowSorting": false},
    "styles": {
      "cellStyle": {"cursor" : "pointer"},
    },
    "actions":{
      "actions": true,
      "_comment": { "cursorstyle": "use custom css properties",
                    "intLink":"opens another app",
                    "extLink": "opens another webpage"},
      "actionMode": "object",
      "actionType": "dialog",
      "actionRange": "cell",
      "baseUrl": "http://localhost:4200/page?actionID=5c8a6300b4438759d237b246",
      "urlParams": {  "label" : "label.value",
        "highlight" : "authorsname.value"}
    }
  };

  // TODO: delete resData2 else once the binding/the inputs are implemented.
  resData2 =
    {
      "head": {
        "vars": [
          "my_person",
          "label",
          "authorsname",
          "description"
        ]
      },
      "results": {
        "bindings": [{
          "description": {
            "type": "literal",
            "value": "Novariensis; natus c. 1100; venit in Galliam c. 1136; breviter Remis moratus est."
          },
          "authorsname": {
            "type": "literal",
            "value": "Petrus Lombardus"
          },
          "label": {
            "type": "literal",
            "value": "AID_1_PetrusLombardus"
          },
          "my_person": {
            "type": "uri",
            "value": "http://rdfh.ch/0046/zS7E7xyEQxKQG30LZQSZbQ"
          }
        },
          {
            "description": {
              "type": "literal",
              "value": "Vide Antonius; Arnoldus Vesaliensis; Bandinus ..."
            },
            "authorsname": {
              "type": "literal",
              "value": "Abbreviationes Sententiarum Petri Lombardi"
            },
            "label": {
              "type": "literal",
              "value": "AID_2_AbbreviationesSententiarumPetriLombardi"
            },
            "my_person": {
              "type": "uri",
              "value": "http://rdfh.ch/0046/2Kx5KiOET9OS1yVbk6DOVg"
            }
          },
          {
            "description": {
              "type": "literal",
              "value": "Vide ARNOLDUS; FRANCISCUS TOTI DE PERUSIO ..."
            },
            "authorsname": {
              "type": "literal",
              "value": "Tabulae in Sententias Petri Lombardi"
            },
            "label": {
              "type": "literal",
              "value": "AID_3_TabulaeinSententiasPetriLombardi"
            },
            "my_person": {
              "type": "uri",
              "value": "http://rdfh.ch/0046/Xe845xy9RgK1WZR_2kCjlw"
            }
          },
          {
            "description": {
              "type": "literal",
              "value": "Vide Arnoldus Vesaliensis; Fridericus Werdinensis OCist; Helwicus."
            },
            "authorsname": {
              "type": "literal",
              "value": "Petri Lombardi Sententiae Metrice Redactae"
            },
            "label": {
              "type": "literal",
              "value": "AID_4_PetriLombardiSententiaeMetriceRedactae"
            },
            "my_person": {
              "type": "uri",
              "value": "http://rdfh.ch/0046/BJ06D4gURMiNEJDyrMpmsQ"
            }
          },
          {
            "description": {
              "type": "literal",
              "value": "Vide someone else."
            },
            "authorsname": {
              "type": "literal",
              "value": "Petri Lombardi whatever"
            },
            "label": {
              "type": "literal",
              "value": "AID_somthing_PetriLombardiSententiae"
            },
            "my_person": {
              "type": "uri",
              "value": "http://rdfh.ch/0046/BJssD4gURMiNEJDyrMpmsQ"
            }
          }

        ]
      }
    };

  // DATA for exporting from table
  renderedData: any;
  shown = 0;

  constructor(private dataService: DataService, private dialog: MatDialog) {
  }

  ngOnInit() {

    this.onGetData();

    // // GET the header variables used as columns
    // this.getColumns();
    //
    // // INSTANTIATE the datasource of the table
    // this.dataSource = new MatTableDataSource(this.resData.results.bindings);
    //
    // // SUBSCRIBE to the tabledata for exporting this rendered data
    // this.dataSource.connect().subscribe(data => this.renderedData = data);

    // // setting Filter predicate acc. to settings
    // this.dataSource.filterPredicate = (data, filter) => {
    //   // console.log("resetting filter predicate for Filter term " + filter);
    //   const dataStr = this.joinFilteredColumns(data);
    //   // applying case sensitivity/insensitivity from settings
    //   if (this.dataListSettings.filter.caseSensitive) {
    //     return dataStr.indexOf(filter) !== -1;
    //   } else {
    //     return dataStr.toLowerCase().indexOf(filter) !== -1;
    //   }
    // };

  }

  ngAfterViewInit(): void {

    // // Pagination of table data
    // this.dataSource.paginator = this.paginator;
    //
    // // AS the dataSource is nested MATSORT must sort the Table for subproperties (item.poperty.value)
    // // and not for properties (standard sort).
    // this.dataSource.sortingDataAccessor = (item, property) => {
    //   switch (property) {
    //     default:
    //       return item[property].value;
    //   }
    // };
    // // Table sorting
    // this.dataSource.sort = this.sort;
  }

  // FILTER THE datasource
  public doFilter(value: string) {
    if (this.dataListSettings.filter.caseSensitive) { this.dataSource.filter = value;
        // TODO: highlighting
        this.toHighlightByFilter = value;
      } else { this.dataSource.filter = value.toLowerCase();
        // TODO: highlighting
        this.toHighlightByFilter = value;
    }
  }
  // GET the data - either from running a query itself or by the input from another app/service (jsonResponse)
  private onGetData() {
    if (this.inputMode === 'query') {
      // console.log('getting data directly by query.')
      this.dataService.getData().subscribe(data => this.fuu = data);
    }
    if (this.inputMode === 'json'){
      this.resData = this.queryResponse;
    }
    // TODO: delete this else fallback once the binding/the inputs are implemented.
    else {
      console.log('fallback on input mode by settings. Mode: ' + this.dataListSettings.inputModeFallback)
      if (this.dataListSettings.inputModeFallback === 'query') {
        this.dataService.getData()
          //.subscribe(data => this.resData = data);
      }
      else {
        this.dataService.getData().subscribe(data => {
          console.log( data, this.resData2 );
          this.resData = data;
          // this.table.renderRows();
          // this.resData = this.resData2;
          // GET the header variables used as columns
          this.getColumns();

          // INSTANTIATE the datasource of the table
          this.dataSource = new MatTableDataSource(this.resData.results.bindings);

          // SUBSCRIBE to the tabledata for exporting this rendered data
          this.dataSource.connect().subscribe(data1 => this.renderedData = data1);

          // Pagination of table data
          this.dataSource.paginator = this.paginator;

          // AS the dataSource is nested MATSORT must sort the Table for subproperties (item.poperty.value)
          // and not for properties (standard sort).
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              default:
                return item[property].value;
            }
          };
          // Table sorting
          this.dataSource.sort = this.sort;
        });

      }
    }

  }
  // GETS columns - either from the settings or by reading our the JSON (manualColumndefinition = false)
  private getColumns(){
    if (this.dataListSettings.columns.manualColumnDefinition){
      this.displayedColumns = this.dataListSettings.columns.displayedColumns;
    } else if( this.resData ) {
      this.displayedColumns = this.resData.head.vars;
    }
  }

  // Returns for each column whether/which column should be sticky when scrolling horizontally (this.dataListSettings.columns.stickyColumn ? true : false)
  private isColumnSticky (column: number): boolean {
    return !!this.dataListSettings.columns.stickyColumn;
  }

  // TODO: maybe implement features from events by hostlistener ...
  // @HostListener('click', ['$event'])

  // onClick(event) {
  //  if (this.dataListSettings.actions.actions && this.dataListSettings.actions.actionMode === 'host') {
        // HERE THINGS CAN BE ADDED
  //      console.log('opening detail dialog with ' + event.target.firstChild.data);
  //      this.openDetailsDialog(event.target.firstChild.data)
  //    } // else {console.log('actions on cells disabled or no action defined')}
  //}

  // SIMPLE METHOD TO DO SOMETHING WITH THE clicked cell/object like passing it to somewhere
  onThisClick(val, object) {
    if (this.dataListSettings.actions.actions && this.dataListSettings.actions.actionMode === 'object') {
        if (this.dataListSettings.actions.actionType === 'dialog'){
          console.log('opening detail dialog with object with property value ' + val);
          this.openDetailsDialog(val)
        } else {
          console.log('actions disabled or no action defined')
      }
    }
  }

  // TODO: maybe outsource this
  public openDetailsDialog(msg) {
    this.dialog.open(DataListViewDetailsDialogComponent, {
      data: {
        message: msg, buttonText: {cancel: 'close'
        }
      },
    });
  }

  showValue( row: any, col: any ) {
    // if ( this.shown < 100 ) {
      if ( row[col] ) {
        // this.shown += 1;
        // console.log( row, col, row[col].value );
        return row[col].value;
      }
    // }
    // return row[col].value;
  }

  // JOINING all columns to be searched by filter (defined in the settings) together.
  // NOTE: as the datasource is nested we have to set filtered data from data to sth like data.[column].value
  // so the object property value is compared by filtering and not the object itself.
  //
  private joinFilteredColumns(data) {
    let dataStr = '';
    for (let col in this.dataListSettings.filter.filteredColumns) {
        dataStr = dataStr + data[this.dataListSettings.filter.filteredColumns[col]].value
    }
    return dataStr;
  }

  // TODO: adjust export to csv to the nested objects
  // EXPORT TO CSV
  //
  exportToCsv() {
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

/*
export class ExportData{

  var options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Your title',
    useBom: true,
    noDownload: true,
    headers: ["First Name", "Last Name", "ID"]
  };
*/

// new ngxCsv(data, title);
