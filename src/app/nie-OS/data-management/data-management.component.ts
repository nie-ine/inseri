import {Component, Inject, OnInit, ChangeDetectorRef, ViewChild, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { MatTable } from '@angular/material';
import { QueryEntryComponent } from '../query-entry/query-entry.component';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss']
})
export class DataManagementComponent {
  @Input() openApps: any;
  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns = [ 'query', 'color', 'delete' ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  value: string;
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
  constructor(
    public dialogRef: MatDialogRef<DataManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public openAppsInThisPage: any,
    public dialog: MatDialog
  ) {
    console.log( this.openAppsInThisPage );
    for( const appType in this.openAppsInThisPage ) {
      if ( this.openAppsInThisPage[ appType ].model.length !== 0 ) {
        console.log( this.openAppsInThisPage[ appType ] );
        for( const appOfSameType of this.openAppsInThisPage[ appType ].model ) {
          console.log( appOfSameType );
        }
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

  addQuery( name: string ) {
    console.log( this.queries );
    this.queries.push(
      { query: name,
        color: 'white',
        abstractResponse: undefined
      });
    this.table.renderRows();
  }

  close() {
    this.dialogRef.close();
  }

  openQueryEntry( query: any ) {
    const dialogRef = this.dialog.open(QueryEntryComponent, {
      width: '100%',
      height: '100%',
      data: { query }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log( 'Abstract tree from query entry' );
      console.log(result);
      this.updateQueryWithAbstractResponseStructure( result[ 1 ], result[ 0 ] );
    });
  }

  updateQueryWithAbstractResponseStructure(query: any, responseStructure: any) {
    let index = 0;
    for ( const savedQuery of this.queries ) {
      console.log( savedQuery );
      console.log( query.query );
      if ( savedQuery === query.query ) {
        this.queries[ index ].abstractResponse = responseStructure;
        this.table.renderRows();
      }
      index += 1;
    }
    console.log( this.queries );
  }
}

