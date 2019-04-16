import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-parzival-fassung',
  templateUrl: './parzival-fassung.component.html',
  styleUrls: ['./parzival-fassung.component.scss']
})
export class ParzivalFassungComponent implements OnChanges, AfterViewChecked {
  @Input() textJson: any;
  @ViewChild('myElem') MyProp: ElementRef;
  zeilen: Array<any> = [];
  sanitizedOnce = false;
  currentAnchor = 1;
  myElem = '#myElem';
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnChanges() {
    console.log( this.textJson );
    if ( this.textJson ) {
      this.zeilen = this.textJson.zeilen;
    }
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    if ( this.currentAnchor !== this._route.snapshot.queryParams.parzivalFassungAnchor ) {
      this.currentAnchor = this._route.snapshot.queryParams.parzivalFassungAnchor;
      this.updateAllFassungsComponents();
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
    this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  updateAllFassungsComponents() {
    console.log( 'Update All Fassungs Components' );
    this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

}
