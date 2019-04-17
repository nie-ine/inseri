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
    // console.log( 'OnChanges' );
    this.updateAllFassungsComponents(
        this._route.snapshot.queryParams.parzivalFassungAnchor
      );
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
      (this.MyProp2 as any)._results[ index ].nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}
