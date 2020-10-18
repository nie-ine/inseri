import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-crispr',
  templateUrl: './crispr.component.html',
  styleUrls: ['./crispr.component.scss']
})
export class CrisprComponent {
  fileToUpload: any;
  form = new FormData();
  showSubmitButton = false;
  pathToFile: SafeResourceUrl;
  fileHasChanged = false;
  selectedBaseEditor = 'ABEmax';
  selectedPredictionType = 'mean';
  submittedBaseEditor: string;
  submittedPredictionType: string;
  sequencesArray: Array<any> = [];
  sequencesForm = new FormControl();
  csvContainsTooManyLines = false;
  displayedColumns: string[] = ['select', 'sequences', 'positions'];
  dataSource: any;
  selectedAction = 'download';
  waitingForResponse = false;
  selectedSequences: Array<string> = [];
  errorMessage: string;
  sessionHash: string;
  public selection = new SelectionModel<any>(true, []);
  progressBarValue = 0;
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  onFileChange(files: FileList): void {

    this.errorMessage = undefined;
    this.sessionHash = undefined;
    this.selectedAction = 'download';

    if ( files.item(0) ) {
      this.fileToUpload = files.item(0);
      console.log( this.fileToUpload );
      this.showSubmitButton = true;
      this.fileHasChanged = true;

      let reader = new FileReader();
      reader.readAsText(files.item(0));

      reader.onload = () => {

        const csvRecordsArray = (<string>reader.result).split(/\r\n|\n/);

        if ( csvRecordsArray.length > 20001 ) {
          this.csvContainsTooManyLines = true;
        }

        this.sequencesArray = [];

        for ( const sequence of csvRecordsArray ) {
          this.sequencesArray.push( {
            sequence: sequence.split( ',')[ 0 ],
            positions: sequence.split( ',')[ 1 ]
          } );
        }

        this.sequencesArray.shift();

        console.log( this.sequencesArray );

        this.dataSource = new MatTableDataSource(this.sequencesArray);

      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    }

    this.form.append('data', this.fileToUpload, 'data' );
  }

  onFileChange2(files: FileList): void {
    console.log( 'second file chosen' );
  }

  updateProgressBar() {
    if ( this.waitingForResponse ) {
      setTimeout(() => {
        this.progressBarValue += ( 1 / this.sequencesArray.length ) * 2000;
        this.updateProgressBar();
      }, 500);
    }
  }

  submitFile( sequence?: string ) {

    this.errorMessage = undefined;

    this.selectedSequences = [ sequence ];

    if ( this.selectedAction === 'download' ) {
      this.sessionHash = this.generateHash();
    }

    this.form.set( 'selectedBaseEditor', this.selectedBaseEditor );
    this.form.set( 'selectedPredictionType', this.selectedPredictionType );
    this.form.set( 'selectedSequences', this.selectedAction === 'plot' ? this.selectedSequences.toString() : undefined );
    this.form.set( 'selectedAction', this.selectedAction );
    this.form.set( 'sessionHash', this.sessionHash );

    this.submittedBaseEditor = this.selectedBaseEditor;
    this.submittedPredictionType = this.selectedPredictionType;

    this.waitingForResponse = true;

    this.updateProgressBar();

    this.http.post('http://localhost:4321', this.form, { responseType: 'blob' })
      .subscribe((val) => {
        if ( this.selectedAction === 'plot' ) {
          const blob = new Blob([ val as any ], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          this.pathToFile = this.sanitizer.bypassSecurityTrustResourceUrl( url );
          this.fileHasChanged = false;
          this.waitingForResponse = false;
        } else if ( this.selectedAction === 'download' ) {
          saveAs(val, 'predictions_' + this.selectedBaseEditor + '_' + this.selectedPredictionType +  '.zip');
          this.waitingForResponse = false;
        }
    }, error => {
        this.errorMessage = error.message;
        this.waitingForResponse = false;
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if ( this.dataSource ) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log( filterValue );
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateSelection() {
    setTimeout(() => {
      this.selectedSequences = [];
      for ( const row of this.dataSource.data ) {
        if ( this.selection.isSelected(row) ) {
          this.selectedSequences.push( row.sequence );
        }
      }
      // console.log( this.selectedSequences );
    }, 100);

  }

  generateHash(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 20; i++) {
      text += possible.charAt(
        Math.floor(Math.random() * possible.length )
      );
    }
    return text;
  }

}
