import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {query} from '@angular/animations';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-query-app-input-map',
  templateUrl: './query-app-input-map.component.html',
  styleUrls: ['./query-app-input-map.component.scss']
})
export class QueryAppInputMapComponent {

  constructor(
    public dialogRef: MatDialogRef<QueryAppInputMapComponent>,
    @Inject(MAT_DIALOG_DATA) public input: any) {
    console.log(input);
    if( !this.input ) {
      this.input = JSON.parse(localStorage.getItem('mapInputs'));
    }
  }

  saveInputToLocalstorage() {
    console.log( 'Save input to localstorage' );
    localStorage.setItem( 'mapInputs', JSON.stringify(this.input) );
  }

  close() {
    this.dialogRef.close();
  }

  loadAbstractResponse() {
    console.log( 'Load tree input' );
  }

}
