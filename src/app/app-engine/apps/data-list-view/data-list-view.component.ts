import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { DataService } from './resources.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './data-list-view.component.html',
  providers: [DataService]
})

export class DataListView implements OnChanges {
  @Input() queryResponse: any;
  // @Input() query: any;
  @Input() dataListSettings: any;

  resData: any;
  // TODO: Store/load SETTINGS on/from MongoDB:
  // dataListSettings = {
  //   "inputMode":  "query",
  //   "jsonType": "knora-extended",
  //   "columns":{
  //     "manualColumnDefinition": true,
  //     "displayedColumns": ["indexed_thing", "label"],
  //     "stickyColumn": 0,
  //     },
  //   "filter": {   "showFilter": true,
  //     "filteredColumns": ["indexed_thing", "label"],
  //     "caseSensitive" : false},
  //   "paginator":{ "pageIndex": "0",
  //     "pageSize": "5",
  //     "pageSizeOptions": [5, 10, 25, 50, 100, 250]},
  //   "export": {   "showExport": true},
  //   "sort":{      "disallowSorting": false},
  //   "styles": {
  //     "cellStyle": {"cursor" : "pointer"},
  //   },
  //   "actions":{
  //     "actions": true,
  //     "_comment": { "cursorstyle": "use custom css properties",
  //                   "intLink":"opens another app",
  //                   "extLink": "opens another webpage"},
  //     "actionMode": "object",
  //     "actionType": "dialog",
  //     "actionRange": "cell",
  //     "baseUrl": "http://localhost:4200/page?actionID=5c8a6300b4438759d237b246",
  //     "urlParams": {  "label" : "label.value",
  //       "highlight" : "authorsname.value"}
  //   }
  // };

  // will be part of the settigs
  columnMapping = {
    columns: [
      {
        name: 'ourIndex',
        path: [ '@id' ]
      },
      {
        name: 'ourLabel',
        path: [ '@type' ]
      }]
  };

  tableData: Array<any> = [];

  constructor(private dataService: DataService) {
  }

  ngOnChanges() {
    // this.onGetData();
    console.log( this.queryResponse );
    this.generateTableData(
      this.queryResponse,
      0
    );
  }

  generateTableData( response: any, depth: number ) {
    let length = -1;
    for ( const entry of this.queryResponse ) {
      length += 1;
      this.appendEntryToTabledata( entry, 0, length );
    }
  }

  appendEntryToTabledata( entry: any, depth: number, length: number ) {
    for ( const column of this.columnMapping.columns ) {
      if ( typeof entry[ column.path[ depth ] ] === 'string' ) {
        // console.log( entry[ column.path[ depth ] ], columnName );
        this.append( entry[ column.path[ depth ] ], column.name, length );
      } else {
        this.appendEntryToTabledata( entry[ column.path[ depth ] ] , depth + 1, length );
      }
    }
  }

  append( entry: string, name: string, length: number ) {
    console.log( entry, name );
    if ( this.tableData[ length ] === undefined ) {
      this.tableData[ length ] = {};
    }
    this.tableData[length ][ name ] = entry;
    if ( this.tableData.length === this.queryResponse.length ) {
      this.resData = this.tableData;
      console.log( this.resData );
    }
  }

  // GET the data - either from running a query itself or by the input from another app/service (jsonResponse)
  private onGetData() {
    if (this.dataListSettings && this.dataListSettings.inputMode === 'query') {
      console.log('getting data by running a SPARQL query passed by input.');
      this.dataService.getData().subscribe(data => {
        this.resData = data;
      });
    } else if (this.dataListSettings && this.dataListSettings.inputMode === 'queryResponse') {
      console.log('getting data by a queryResonse input.', this.queryResponse);
      this.resData = this.queryResponse;
    } else {
        console.log('missing or wrong settings definition for data source.');
      }
    }
}
