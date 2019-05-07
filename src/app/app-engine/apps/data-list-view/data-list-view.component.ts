import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './resources.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './data-list-view.component.html',
  providers: [DataService]
})

export class DataListView implements OnInit {
  @Input() queryResponse: any;
  //
  // Inputmode:  "json" --> queryResponse will be displayed;
  // Inputmode "query": A passed query will be run by the app itself and the answer will be displayed;
  @Input() inputMode: string;

  resData: any;

  // TODO: Store/load SETTINGS on/from MongoDB:
  dataListSettings = {
    "inputModeFallback":  "query",
    "columns":{
      "manualColumnDefinition": true,
      "displayedColumns": ["indexed_thing", "label", "occurence"],
      "stickyColumn": 0,
      },
    "filter": {   "showFilter": true,
      "filteredColumns": ["indexed_thing", "label"],
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

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    console.log(this.queryResponse)
    this.onGetData();
  }

  // GET the data - either from running a query itself or by the input from another app/service (jsonResponse)
  private onGetData() {
    if (this.inputMode === 'query') {
      console.log('getting data directly by query.')
      this.dataService.getData().subscribe(data => this.resData = data);
    }
    if (this.inputMode === 'json') {
      console.log('getting data by input.')
      this.resData = this.queryResponse;
    }
    // TODO: delete this else fallback once the binding/the inputs are implemented.
    else {
      console.log('fallback on input mode by settings. Mode: ' + this.dataListSettings.inputModeFallback)
      if (this.dataListSettings.inputModeFallback === 'query') {
        this.dataService.getData().subscribe(data => {
          this.resData = data;
        });
      }
      else {
        console.log('missing or wrong settings definition for data source.');
      }
    }
  }


}
