import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'data-list-view',
  templateUrl: './data-list-view.component.html',
})
export class DataListView implements OnInit {
  @Input() queryResponse: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  displayedColumns = {}
  TableFilling = [];

  resData =
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

  ngOnInit() {
    // FIRST we get the header variables used as columns
    this.displayedColumns = this.resData.head.vars;
    // GET the inner results/bindings, i.e. the actual values to be displayed
    this.TableFilling = this.resData.results.bindings;
    // INSTANTIATE the datasource of the table
    this.dataSource = new MatTableDataSource(this.TableFilling);
  }

  ngAfterViewInit(): void {

    // Pagination of table data
    this.dataSource.paginator = this.paginator;

    // AS the dataSource is nested MATSORT must sort the Table for subproperties (item.poperty.value) and not for properties (standard sort).
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        default: return item[property].value;
      }
    };
    this.dataSource.sort = this.sort;
  }

  // TODO: AS the dataSource is nested the FILTER must filter the dataSource by the subproperties ".value" (item.poperty.value) and not by properties
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // METHOD for doing sth with the clicked cell.
  public dosomething(row_col, indexed_data) {
    console.log(row_col + ' ' + indexed_data.authorsname + ' / ' + indexed_data.my_person + ' --> Something should happen now with this.');
  }
}
