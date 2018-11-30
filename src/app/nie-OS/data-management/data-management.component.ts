import {Component, Inject, OnInit, ChangeDetectorRef, ViewChild, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { MatTable } from '@angular/material';
import { QueryEntryComponent } from '../query-entry/query-entry.component';
import { QueryAppInputMapComponent } from '../query-app-input-map/query-app-input-map.component';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss']
})
export class DataManagementComponent {
  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns = ['query', 'delete'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  value: string;
  openApps: Array<any> = [];
  appInputQueryMapping = [];
  queries = [
    {
      query: "eggs",
      color: "white",
      abstractResponse: undefined
    },
    {
      query: "cheese",
      color: "yellow",
      abstractResponse: undefined
    },
    {
      query: "broccoli",
      color: "green",
      abstractResponse: undefined
    }
  ];
  inputs = [
    {
      'inputName': 'textlist'
    },
    {
      'inputName': 'title'
    },
    {
      'inputName': 'description'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<DataManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public openAppsInThisPage: any,
    public dialog: MatDialog
  ) {
    // console.log( this.openAppsInThisPage );
    for (const appType in this.openAppsInThisPage) {
      if (this.openAppsInThisPage[appType].model.length !== 0) {
        // console.log( this.openAppsInThisPage[ appType ] );
        for (const appOfSameType of this.openAppsInThisPage[appType].model) {
          this.openApps.push(appOfSameType);
          // console.log( appOfSameType );
          for (const query in this.queries) {
            // console.log( this.queries[ query ] );
            this.queries[query][appOfSameType.hash] = appOfSameType.hash;
          }
          this.columnsToDisplay.push(appOfSameType.hash);
          console.log(this.queries);
        }
        if (this.table) {
          this.table.renderRows();
        }
      }
      if (this.table) {
        this.table.renderRows();
      }
    }
  }

  delete(row: any): void {
    const index = this.queries.indexOf(row, 0);
    if (index > -1) {
      this.queries.splice(index, 1);
    }
    this.table.renderRows();
  }

  addQuery(name: string) {
    console.log(this.queries);
    this.queries.push(
      {
        query: name,
        color: 'white',
        abstractResponse: undefined
      });
    this.table.renderRows();
  }

  close() {
    this.dialogRef.close();
  }

  openQueryEntry(query: any) {
    const dialogRef = this.dialog.open(QueryEntryComponent, {
      width: '100%',
      height: '100%',
      data: {query}
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Abstract tree from query entry');
      console.log(result);
      this.updateQueryWithAbstractResponseStructure(result[1], result[0]);
    });
  }

  updateQueryWithAbstractResponseStructure(query: any, responseStructure: any) {
    let index = 0;
    for (const savedQuery of this.queries) {
      console.log(savedQuery);
      console.log(query.query);
      if (savedQuery === query.query) {
        this.queries[index].abstractResponse = responseStructure;
        this.table.renderRows();
      }
      index += 1;
    }
    console.log(this.queries);
  }

  assignInputToQuery(input: string, app: string, query: string) {
    if (!this.appInputQueryMapping[app]) {
      this.appInputQueryMapping[app] = {};
    }
    this.appInputQueryMapping[app][input] = query;
    console.log(this.appInputQueryMapping);
  }

  checkIfChosen(input: string, app: string, query: string) {
    if (this.appInputQueryMapping[app] && this.appInputQueryMapping[app][input] === query) {
      // console.log( 'true' );
      return true;
    } else {
      // console.log( 'false' );
      return false;
    }
  }

  checkIfRowIsChosen(app: string, query: string) {
    for (const input in this.appInputQueryMapping[app]) {
      if (this.appInputQueryMapping[app][input] === query) {
        return true;
      }
    }
  }

  unSelectChip( input: string, app: string, query: string ) {
    this.appInputQueryMapping[app][input] = undefined;
  }

  openQueryAppInputMapDialog( app: string, query: any ) {
    console.log( 'openQueryAppInputMapDialog' );
    const dialogRef = this.dialog.open(QueryAppInputMapComponent, {
      width: '100%',
      height: '100%',
      data: {
        mapping: this.appInputQueryMapping,
        app: app,
        query: query,
        openApps: this.openAppsInThisPage,
        abstractResponse: query.abstractResponse
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('\n\nHier weiter: update appInputQueryMapping\n\n');
      console.log(result);
    });
  }
}

