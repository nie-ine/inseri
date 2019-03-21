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
            "value": "Novariensis; natus c. 1100; venit in Galliam c. 1136; breviter Remis moratus est, ubi docebat magister Lotulfus Novariensis; c. 1139 venit Parisios et commendatus a s. Bernardo morabatur in monasterio sancti Victoris; c. 1140–1159 docuit in scholis cathedralis Parisiensis; 1152 Romam profectus est; 1159 electus est episcopus Parisiensis, sed iam 1260 e vita migravit. Sent. I composuit probabiliter ante 1148; Sent. II–V probabiliter finivit hieme 1151/2.\nGregorianum 2 (1921) 387–392 et 15 (1934) 262–266 [F. Pelster; de tempore compositionis]; Scholastik 5 (1930) 569–573 [F. Pelster; de codice originali]; Rev. Hist. Eccl. 14 (1913) 511–536; 705–719 [J. de Ghellinck; de notis marginalibus]; 27 (1931) 792–830 et 30 (1934) [J. de Ghellinck; de vita]; Rech. Théol. anç. méd. 2 (1930) 80–99 [A. Landgraf; de critica textus]; Dict. Théol. Cath. XII,2 (1935) 1941–2019 [J. de Ghellinck]."
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
              "value": "Vide Antonius; Arnoldus Vesaliensis; Bandinus; Conradus OP; Dionysius Carthusiensis; Ps.Hugo de s. Caro; Jacobus de Lausanne; Dionysius Carthusianus; Ps. Hugo de s. Caro ; Jacobus de Lausanne; Odalricus Verdunensis; Simon Tornacensis; nr. 1070; 1190; 1342,1.\nA. Landgraf, Bearbeitungen von Werken des Petr. Lomb. Coll. Franc. 10, 321–337."
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
              "value": "Vide ARNOLDUS; FRANCISCUS TOTI DE PERUSIO; MATTHAEUS DE AQUASPARTA; MICHAEL AIGNANI DE BONONIA; ROBERTUS KILWARDBY; SIMON de TOURNAY; nr. 966."
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

    // MAT Pagination and sorting
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // FILTERING
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // METHOD for doing sth with the clicked cell.
  public dosomething(row_col, indexed_data) {
    console.log(row_col + ' ' + indexed_data.authorsname + ' / ' + indexed_data.my_person + ' --> Something should happen now with this.');
  }
}
