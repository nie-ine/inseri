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
  QueryList, Output, EventEmitter
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
  @Input() key = 'verseNumber';
  @ViewChildren('cmp') MyProp2: ElementRef;
  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>();
  zeilen: Array<any> = [];
  currentAnchor = 1;
  testArray = new Array(650);
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
    if ( this.currentAnchor !== this._route.snapshot.queryParams.verseNumber ) {
      this.currentAnchor = this._route.snapshot.queryParams.verseNumber;
      this.updateAllFassungsComponents(
        this._route.snapshot.queryParams.verseNumber
      );
    }
    this.cdr.detectChanges();
  }

  updateURL(
    index: number
  ) {
    this._router.navigate([], {
      queryParams: {
        ['verseNumber']: index
      },
      queryParamsHandling: 'merge'
    });
    this.reloadVariables.emit();
  }

  updateAllFassungsComponents( index: any ) {
    if ( (this.MyProp2 as any)._results[ index ] ) {
      (this.MyProp2 as any)._results[ index - 1 ].nativeElement.scrollIntoView({ block: "start" });
    }
  }
}
