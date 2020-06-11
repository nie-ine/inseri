/**
 * This component generates the Data Browser / Data Chooser with which the user can browse through
 * the responses of the queries
 * */

import {
  Component,
  AfterViewChecked,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-data-chooser',
  templateUrl: './data-chooser.component.html'
})
export class DataChooserComponent implements AfterViewChecked {

  /**
   * This variable contains the currently open apps on the respective page
   * */
  @Input() openAppsInThisPage;

  /**
   * This Array contains the strings of the array of the first depth of
   * the respective json response
   * */
  @Input() dataChooserEntries = [];

  /**
   * This is the json response of the respective query
   * */
  @Input() response;

  /**
   * This is the query id of the respecrive query
   * */
  @Input() queryId;

  /**
   * This is the depth of the array residing as part of the json response of the query
   * */
  @Input() depth;

  /**
   * This string is unsed to describe the depth of the data chooser entry
   * */
  @Input() description = '';

  /**
   *
   * */

  @Input() pathWithArray;

  @Input() page: any;

  /**
   * This output emits the index chosen by the user
   * */
  @Output() sendIndexBack: EventEmitter<any> = new EventEmitter<any>();

  /**
   * this variable stores the index emitted by the data chooser
   * */
  index: number;

  /**
   * This boolean prevents the data chooser to emit an already emitted index
   * */
  alreadyEmitted = false;

  chosenEntry: string;

  currentPath: string;
  constructor(
    private _route: ActivatedRoute,
    public dialogSettings: MatDialog,
    private cdr: ChangeDetectorRef,
    private _router: Router
  ) {}

  ngAfterViewChecked() {
    if ( this.pathWithArray &&
      this.currentPath !== this._route.snapshot.queryParams[ this.queryId + this.pathWithArray.toString() ] ) {
      this.currentPath = this._route.snapshot.queryParams[ this.queryId + this.pathWithArray.toString() ];
      setTimeout(() => {
        console.log(  this._route.snapshot.queryParams[ this.queryId + this.pathWithArray.toString() ] );
        // console.log(this.pathWithArray);
        this.chooseResource( Number( this._route.snapshot.queryParams[ this.queryId + this.pathWithArray.toString() ] ) );
      }, 50);
    } else if ( !this.alreadyEmitted ) {
      this.alreadyEmitted = true;
      this.chooseResource( 0 );
    }
  }

  chooseResource(index: number) {
    if ( this.dataChooserEntries ) {
      this.chosenEntry = this.dataChooserEntries[ index ];
    }
    if ( this.pathWithArray && index !== 0 ) {
      this._router.navigate([], {
        queryParams: {
          [this.queryId + this.pathWithArray.toString() ]: index
        },
        queryParamsHandling: 'merge'
      });
    }
    if ( this.response ) {
      // console.log( 'send index back', this.queryId, this.pathWithArray );
      this.sendIndexBack.emit( {
        index: index,
        response: this.response,
        queryId: this.queryId,
        depth: this.depth,
        pathWithArray: this.pathWithArray,
        dataChooserEntries: this.dataChooserEntries
      } );
    }
  }

  moveBack() {
    this.index -= 1;
    this.chooseResource( this.index );
  }

  moveForward() {
    this.index += 1;
    this.chooseResource( this.index );
  }

  showChosenEnrty( entry: string) {
    if ( !this.index ) {
      return entry;
    }
    return this.dataChooserEntries[this.index];
  }

  resetDataChooserEntries() {
    this.index = undefined;
  }
}
