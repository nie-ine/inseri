import {Component, Input, OnChanges} from '@angular/core';
import { DataService } from './resources.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './data-list-view.component.html',
  providers: [DataService]
})

export class DataListView implements OnChanges {
  @Input() queryResponse?: any;
  @Input() dataListSettings?: any;
  @Input() query?: any;
  resData: any;
  displayedColumns: any = [];
  tableData: Array<any> = [];

  constructor(private dataService: DataService) {
  }

  ngOnChanges() {
    this.getSettings(this.dataListSettings);
    this.onGetData();
  }

  generateTableData( response: any, depth: number ) {
    if (this.dataListSettings.columns.genericColumns) {
      let length = 0;
      for (const entry of response) {
        this.flattenObjects(entry, length);
        length += 1;
      }
      this.resData = this.tableData;
      console.log(this.resData);
    } else {
      let length = -1;
      for (const ResponseEntry of response) {
        length += 1;
        this.appendEntryToTabledata(ResponseEntry, 0, length);
      }
    }
  }

  appendEntryToTabledata( ResponseEntry: any, depth: number, length: number) {
    // recursive method for getting the actual values from nested jsons
    // and appending them to the tabledata. Allowed values are strings,
    // numbers, symbols and booleans.
      for ( const column of this.dataListSettings.columns.columnMapping ) {
        if ( typeof ResponseEntry[ column.path[ depth ]] === 'string' ||
             typeof ResponseEntry[ column.path[ depth ]] === 'number' ||
             typeof ResponseEntry[ column.path[ depth ]] === 'symbol' ||
             typeof ResponseEntry[ column.path[ depth ]] === 'boolean') {
          // console.log( ResponseEntry[ column.path[ depth ] ], column.name );
          this.append( ResponseEntry[ column.path[ depth ]], column.name, length );
        } else if (typeof ResponseEntry[ column.path[ depth ]] !== 'undefined') {
          this.appendEntryToTabledata( ResponseEntry[column.path[ depth ]] , depth + 1, length );
        }
      }
  }

  append( entry: string, name: string, length: number ) {
    // is appending the collected values to the tabledata
    if ( this.tableData[ length ] === undefined ) {
      this.tableData[ length ] = {};
    }
    this.tableData[ length ][ name ] = entry;
    if ( this.tableData.length === this.queryResponse.length ) {
      this.resData = this.tableData;
    }
  }


  flattenObjects(input, length, reference?, output?) {
    // FLATTENS the response completely and assigns the result to tableData.
    output = output || {};
    for (let key of Object.keys(input)) {
      const value = input[key];
      if (reference) {
        key = reference + '.' + key;
      }
      if (typeof value === 'object' && value !== null) {
        this.flattenObjects(value,  length, key, output);
      } else {
        output[key] = value;
        // renesting with name and types
        // output[key]['value'] = value;
        // if (reference['type'] || reference['whatever']) {
        //  output[key]['type'] = reference['type'];
        // }

      }
    }
    this.tableData[ length ] =  output;
  }

  generateDisplayedColumnsForKnora() {
    const cols = new Set();
    for (const obj of this.tableData) {
      for (const key of Object.getOwnPropertyNames(obj)) {
        cols.add(key);
      }
    }
    this.displayedColumns = cols;
  }

  getDisplayedColumns(headers?) {
    if (this.dataListSettings.columns.genericColumns) {
      if (this.dataListSettings.jsonType === 'sparql') {
        for (const entry of headers.head.vars) {
          this.displayedColumns.push(entry + '.type');
          this.displayedColumns.push(entry + '.value');
        }
        } else if (this.dataListSettings.jsonType === 'knora-extended') {
        this.generateDisplayedColumnsForKnora(); } else {
                            console.log('Wrong datalistSettings: this.dataListSettings.columns.genericColumns = ' +
                            this.dataListSettings.columns.genericColumns + ' but this.dataListSettings.jsonType "' +
                            this.dataListSettings.jsonType + '" is not applicable to a generic column definition ' +
                              'or not yet implemented)'); }
    } else {
      for (const column of this.dataListSettings.columns.columnMapping) {
         if (column.displayed === true) {
           this.displayedColumns.push(column.name);
         }
      }
      console.log('got displayed comlumns by definition in comlumnMapping: ' + this.displayedColumns);
    }
  }

  // GET the data - either from running a query itself or by the input from another app/service (jsonResponse)
  private onGetData() {
    if (this.dataListSettings && this.dataListSettings.inputMode === 'query') {
      console.log('getting data by running a SPARQL query passed by input.');
      this.dataService.getData().subscribe(data => {
        const responseData: any = data;
        this.generateTableData(responseData.results.bindings, 0);
        this.getDisplayedColumns(responseData);
      });
    } else if (this.dataListSettings && this.dataListSettings.inputMode === 'queryResponse') {
      console.log('getting data by a queryResonse input.');
      if ( this.queryResponse && this.dataListSettings) {
        this.generateTableData(this.queryResponse, 0);
        this.getDisplayedColumns();
      } else {
        console.log('no data by input available yet. Please choose data input·');
      }
    } else {
        console.log('missing or wrong settings definition for data source.');
      }

  }

  getSettings(input?) {
    if ((input === undefined || input === null || Object.keys(input).length === 0)) {
      console.log('Input for settings is undefined/null or contains no data. looading default settings.');
      this.dataListSettings = {
      "inputMode": "queryResponse",
      "jsonType": "knora-extended",
      "columns": {
        "genericColumns": true,
        "columnMapping" : [
            {
              name: 'Poem title',
              path: [ 'kuno-raeber:poemHasTitle', 'knora-api:valueAsString' ],
              displayed: true,
              filtered: true
            },
            {
              name: 'ID',
              path: [ '@id' ],
              displayed: false,
              filtered: true
            },
            { name: 'created_at',
              path: ['knora-api:creationDate' , '@value'],
              displayed: true,
              filtered: false
            }],
        "stickyColumn": 0,
        "nestedDatasource": false
      },
      "filter": {
        "showFilter": true,
        "caseSensitive": true
      },
      "paginator": {
        "paginate": true,
        "pageIndex": "0",
        "pageSize": "5",
        "pageSizeOptions": [5, 10, 25, 50, 100, 250]
      },
      "export": {
        "showExport": true
      },
      "sort": {
        "disallowSorting": false
      },
      "styles": {
        "cellStyle": {
          "cursor": "pointer"
        }
      },
      "actions": {
        "actions": true,
        "_comment": {
          "cursorstyle": "use custom css properties",
          "intLink": "opens another app",
          "extLink": "opens another webpage"
        },
        "actionMode": "object",
        "actionType": "dialog",
        "actionRange": "cell",
        "baseUrl": "http://localhost:4200/page?actionID=5c8a6300b4438759d237b246",
        "urlParams": {
          "label": "label.value",
          "highlight": "authorsname.value"
        }
      }
    };
    }
  }
}
