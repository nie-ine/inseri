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
    this.displayedColumns = this.resData.head.vars; // WILL be given to

    // GET the inner results/bindings, i.e. the actual values to be displayed
    this.TableFilling = this.resData.results.bindings;
    // TODO: reduce the nested Tablefilling

    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);
  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public dosomething(row_col, indexed_data) {
    console.log(row_col + ' ' + indexed_data.name + ' / ' + indexed_data.my_person + ' --> Something should happen now with this.');
  }
}

// TODO: replace this with real data
const EXAMPLE_DATA = [
  {my_person:'12A1hhh', description: 'Blatt A1', authorsname: 'Augustus'},
  {my_person:'32gchjuzd', description: 'Blatt A3', authorsname: 'Caligula'},
  {my_person:'5443xfjhz', description: 'Blatt B4', authorsname: 'Caracalla'},
  {my_person:'z345hujdztj', description: 'Blatt A6, Blatt D5', authorsname: 'Claudius'},
  {my_person:'f4365dhg', description: 'Blatt C8, Blatt B4', authorsname: 'Domitian'},
  {my_person:'f436534gjn', description: 'Blatt G5, Blatt B4', authorsname: 'Hadrian'},
  {my_person:'487435gd', description: 'Blatt D32, Blatt S4', authorsname: 'Marc Aurel'},
  {my_person:'hgkcjmuzr', description: 'Blatt A66, Blatt A4', authorsname: 'Nero'},
  {my_person:'duz43534t', description: 'Blatt A66, Blatt A4', authorsname: 'Nerva'},
  {my_person:'ztd433iuz', description: 'Blatt B44, Blatt G34', authorsname: 'Otho'},
  {my_person:'fcj45hgkujhc', description: 'Blatt C88, Blatt BC4', authorsname: 'Titus'},
  {my_person:'k345zgcmh', description: 'Blatt A66, Blatt A4', authorsname: 'Vespasian'},
  {my_person:'ztu34543d7', description: 'Blatt C88, Blatt BC4', authorsname: 'Vitllius'}

];
