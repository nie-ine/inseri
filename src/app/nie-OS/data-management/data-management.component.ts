import {Component, Inject, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { MatTable } from '@angular/material';
import { QueryEntryComponent } from '../query-entry/query-entry.component';

export interface PeriodicElement {
  query: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss']
})
export class DataManagementComponent {
  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns = [ 'query', 'color', 'delete' ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  value: string;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Input 1'},
    {value: 'pizza-1', viewValue: 'Input 2'},
    {value: 'tacos-2', viewValue: 'Input 3'}
  ];
  exampleJson = {
    "glossary": {
      "title": "example glossary",
      "GlossDiv": {
        "title": "S",
        "GlossList": {
          "GlossEntry": {
            "ID": "SGML",
            "SortAs": "SGML",
            "GlossTerm": "Standard Generalized Markup Language",
            "Acronym": "SGML",
            "Abbrev": "ISO 8879:1986",
            "GlossDef": {
              "para": "A meta-markup language, used to create markup languages such as DocBook.",
              "GlossSeeAlso": ["GML", "XML"]
            },
            "GlossSee": "markup"
          }
        }
      }
    }
  }


  dataSource = data;
  constructor(
    public dialogRef: MatDialogRef<DataManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: any,
    public dialog: MatDialog
  ) { }



  delete(row: any): void {
    const index = this.dataSource.indexOf(row, 0);
    if (index > -1) {
      this.dataSource.splice(index, 1);
    }
    this.table.renderRows();
  }

  addQuery( name: string ) {
    console.log( this.dataSource );
    this.dataSource.push( { query: name, color: 'white'} );
    this.table.renderRows();
  }

  close() {
    this.dialogRef.close();
  }

  openQueryEntry( query: any ) {
    // console.log( query );
    const dialogRef = this.dialog.open(QueryEntryComponent, {
      width: '100%',
      height: '100%',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

}

const data = [
  {
    query: "eggs",
    color: "white"
  },
  {
    query: "cheese",
    color: "yellow"
  },
  {
    query: "broccoli",
    color: "green"
  }
];

