import {
  Component,
  OnInit,
  Inject,
  AfterViewChecked,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField} from '@angular/material';
import {type} from 'os';

@Component({
  selector: 'app-data-chooser',
  templateUrl: './data-chooser.component.html'
})
export class DataChooserComponent implements AfterViewChecked {
  @Input() openAppsInThisPage;
  @Input() dataChooserEntries = [];
  @Input() response;
  @Input() queryId;
  @Input() depth;
  @Input() description = '';
  @Output() sendAppTypesBackToNIEOS: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendIndexBack: EventEmitter<any> = new EventEmitter<any>();
  @Input() appInputQueryMapping;
  gravSearchString: string;
  dataChooserString: string;
  gravSearchResponse: Array<any>;
  chosenPropertyArray: Array<any>;
  dataChooserSettingsOutput: any;
  responseTest: any;
  index: number;
  alreadyEmitted = false;
  constructor(
    public dialogSettings: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {
    // console.log( this.dataChooserEntries );
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    if ( this.dataChooserEntries [ 0 ] === 'showData' && !this.alreadyEmitted ) {
      this.alreadyEmitted = true;
      this.chooseResource( 0 );
    }
    if ( typeof this.dataChooserEntries [ 0 ] === 'object'  && !this.alreadyEmitted ) {
      console.log( 'Emit first value' );
      this.alreadyEmitted = true;
      this.chooseResource( 0 );
    }
  }
  chooseResource(index: number) {
    this.index = index;
    this.sendIndexBack.emit( {
      index: index,
      response: this.response,
      queryId: this.queryId,
      depth: this.depth
    } );
  }

  moveBack() {
    // console.log('move back');
    this.index -= 1;
    this.chooseResource( this.index );
  }

  moveForward() {
    // console.log('move forward');
    this.index += 1;
    this.chooseResource( this.index );
  }

  showChosenEnrty( entry: string) {
    // console.log( entry, this.index );
    if( !this.index ) {
      return entry;
    }
    return this.dataChooserEntries[this.index];
  }

  resetDataChooserEntries() {
    this.index = undefined;
  }
}
