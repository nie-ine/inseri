import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-parzival-fassung',
  templateUrl: './parzival-fassung.component.html',
  styleUrls: ['./parzival-fassung.component.scss']
})
export class ParzivalFassungComponent implements OnChanges, AfterViewChecked {
  @Input() textJson: any;
  @ViewChildren('cmp') MyProp2: ElementRef;
  zeilen: Array<any> = [];
  currentAnchor = 1;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnChanges() {
    console.log( this.textJson );
    if ( this.textJson === undefined ) {
      this.textJson = {
        "spaltenTitel": "*D",
        "zeilen": [
          {
            "zeilenNummer": 1,
            "anchorName": "*D",
            "woerter": [
              {
                "wort": "2.26",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "swelhiu"
              },
              {
                "wort": "mîn râten merken",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "wil"
              }
            ]
          },
          {
            "zeilenNummer": 2,
            "anchorName": "*D",
            "woerter": [
              {
                "wort": "2.27",
                "style": {
                  "font-weight": "bold"
                },
                "annotation": [
                  {
                    "start": 3,
                    "end": 4,
                    "type": "link",
                    "options": {
                      "ref": "http://www.parzival.unibe.ch/parzdb/parzival.php?page=fassungen&dreissiger=3#"
                    }
                  }
                ]
              },
              {
                "wort": "diu sol"
              },
              {
                "wort": "wizzen, war si kêre",
                "annotation": [
                  {
                    "start": 3,
                    "end": 3,
                    "style": [
                      "italic"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "zeilenNummer": 3,
            "anchorName": "*D",
            "woerter": [
              {
                "wort": "2.28",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "swelhiu"
              },
              {
                "wort": "mîn râten merken",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "wil"
              }
            ]
          },
          {
            "zeilenNummer": 4,
            "anchorName": "*D",
            "woerter": [
              {
                "wort": "2.29",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "swelhiu"
              },
              {
                "wort": "mîn râten merken",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "wil"
              }
            ]
          },
          {
            "zeilenNummer": 5,
            "anchorName": "*D",
            "woerter": [
              {
                "wort": "2.30",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "swelhiu"
              },
              {
                "wort": "mîn râten merken",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "wil"
              }
            ]
          },
          {
            "zeilenNummer": 6,
            "anchorName": "*D",
            "woerter": [
              {
                "wort": "2.31",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "swelhiu"
              },
              {
                "wort": "mîn râten merken",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "wil"
              }
            ]
          },
          {
            "zeilenNummer": 7,
            "anchorName": "*D",
            "woerter": [
              {
                "wort": "2.32",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "swelhiu"
              },
              {
                "wort": "mîn râten merken",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "wil"
              }
            ]
          },
          {
            "zeilenNummer": 8,
            "anchorName": "*D",
            "woerter": [
              {
                "wort": "2.33",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "swelhiu"
              },
              {
                "wort": "mîn râten merken",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "wil"
              }
            ]
          },
          {
            "zeilenNummer": 9,
            "anchorName": "*D",
            "woerter": [
              {
                "wort": "2.34",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "swelhiu"
              },
              {
                "wort": "mîn râten merken",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "wil"
              }
            ]
          },
          {
            "zeilenNummer": 10,
            "anchorName": "*D",
            "woerter": [
              {
                "wort": "2.35",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "swelhiu"
              },
              {
                "wort": "mîn râten merken",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "wil"
              }
            ]
          },
          {
            "zeilenNummer": 11,
            "anchorName": "*D",
            "woerter": [
              {
                "wort": "2.36",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "swelhiu"
              },
              {
                "wort": "mîn râten merken",
                "style": {
                  "font-weight": "bold"
                }
              },
              {
                "wort": "wil"
              }
            ]
          }
        ]
      };
    }
    if ( this.textJson ) {
      this.zeilen = this.textJson.zeilen;
    }
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    // console.log( 'OnChanges' );
    if ( this.currentAnchor !== this._route.snapshot.queryParams.parzivalFassungAnchor ) {
      this.currentAnchor = this._route.snapshot.queryParams.parzivalFassungAnchor;
      this.updateAllFassungsComponents(
        this._route.snapshot.queryParams.parzivalFassungAnchor
      );
    }
    this.cdr.detectChanges();
  }

  updateURL(
    zeile: any
  ) {
    this._router.navigate([], {
      queryParams: {
        parzivalFassungAnchor: zeile.zeilenNummer
      },
      queryParamsHandling: 'merge'
    });
  }

  updateAllFassungsComponents( index: any ) {
    if ( (this.MyProp2 as any)._results[ index ] ) {
      (this.MyProp2 as any)._results[ index - 1 ].nativeElement.scrollIntoView({ block: "start" });
    }
  }
}
