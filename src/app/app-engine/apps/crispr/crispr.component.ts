import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';


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
  displayedColumns: string[] = ['select', 'position'];
  dataSource: any;
  selectedAction: string;
  public selection = new SelectionModel<any>(true, []);
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  onFileChange(files: FileList): void {

    if ( files.item(0) ) {
      this.fileToUpload = files.item(0);
      this.showSubmitButton = true;
      this.fileHasChanged = true;

      let reader = new FileReader();
      reader.readAsText(files.item(0));

      reader.onload = () => {

        const csvRecordsArray = (<string>reader.result).split(/\r\n|\n/);

        if ( csvRecordsArray.length > 20001 ) {
          this.csvContainsTooManyLines = true;
        }

        for ( const sequence of csvRecordsArray ) {
          this.sequencesArray.push( {
            sequence: sequence.split( ',')[ 0 ]
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

  submitFile() {
    console.log( this.sequencesForm.value );
    console.log( this.selection );

    const selectedSequences = [];

    console.log( this.dataSource );

    for ( const row of this.dataSource.data ) {
      if ( this.selection.isSelected(row) ) {
        selectedSequences.push( row.sequence );
      }
    }

    console.log( selectedSequences );

    this.form.set( 'selectedBaseEditor', this.selectedBaseEditor );
    this.form.set( 'selectedPredictionType', this.selectedPredictionType );
    this.form.set( 'selectedSequences', selectedSequences.toString() );

    this.submittedBaseEditor = this.selectedBaseEditor;
    this.submittedPredictionType = this.selectedPredictionType;

    this.http.post('http://localhost:4321', this.form, { responseType: 'blob' })
      .subscribe((val) => {
        const blob = new Blob([ val as any ], { type: 'application/pdf' });
        console.log( blob );
        const url = URL.createObjectURL(blob);
        this.pathToFile = this.sanitizer.bypassSecurityTrustResourceUrl( url );
        this.fileHasChanged = false;
    }, error => console.log( error ));
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
  checkboxLabel(row?: PeriodicElement): string {
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

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
