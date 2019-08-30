import {Component, OnInit, ViewChild} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-angular-handsometable',
  templateUrl: './angular-handsometable.component.html',
  styleUrls: ['./angular-handsometable.component.scss']
})
export class AngularHandsometableComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    {headerName: 'Make', field: 'make', sortable: true, filter: true, editable: true },
    {headerName: 'Model', field: 'model', sortable: true, filter: true, editable: true },
    {headerName: 'Price', field: 'price', sortable: true, filter: true, editable: true }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];
  constructor() { }

  ngOnInit() {

  }

  save() {
    console.log( 'Save', this.rowData );
  }

  addRow() {
    const row = { make: '', model: '', price: 0 }
    this.rowData.push(
      row
      );

    this.agGrid.api.updateRowData({
      add: [
        row
      ]
    });
  }

  addColumn() {

    const newColumDef = [
      {headerName: 'Make', field: 'make', sortable: true, filter: true, editable: true },
      {headerName: 'Model', field: 'model', sortable: true, filter: true, editable: true },
      {headerName: 'Price', field: 'price', sortable: true, filter: true, editable: true },
      {headerName: 'test', field: 'test', sortable: true, filter: true, editable: true }
    ];

    this.agGrid.api.setColumnDefs(
      newColumDef
    );
  }
}
