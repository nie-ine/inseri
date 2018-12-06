import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {query} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {AbstractJsonService} from '../data-management/abstract-json.service';


@Component({
  selector: 'app-query-app-input-map',
  templateUrl: './query-app-input-map.component.html',
  styleUrls: ['./query-app-input-map.component.scss']
})
export class QueryAppInputMapComponent {
  response: any;
  tree: any;
  abstractResponse: any;
  chosenInputs: Array<any> = [];
  mapping: any;
  mappingUsedByPage: any = {};
  constructor(
    public dialogRef: MatDialogRef<QueryAppInputMapComponent>,
    @Inject(MAT_DIALOG_DATA) public input: any,
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService
  ) {
    if ( !this.input ) {
      this.input = JSON.parse(localStorage.getItem('mapInputs'));
      console.log( this.input );
    }
    for ( const appInput in input.mapping[ input.app.hash ] ) {
      this.chosenInputs.push( appInput );
    }
    console.log( this.input );
  }

  saveInputToLocalstorage() {
    console.log( 'Save input to localstorage' );
    localStorage.setItem( 'mapInputs', JSON.stringify(this.input) );
  }

  close() {
    this.dialogRef.close( this.mapping );
  }

  loadAbstractResponse() {
    // console.log( 'Load tree input' );
    this.http.get( 'http://knora2.nie-ine.ch/v2/ontologies/' +
      'allentities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F004D%2Fkuno-raeber%2Fv2' +
      '?email=root%40example.com&password=test' )
      .subscribe(
        data => {
          // console.log( data );
          this.response = data;
          this.tree = data;
          this.abstractResponse = this.abstractJsonService.json2abstract( data );
          // console.log( this.abstractResponse );
        }, error => {
          console.log( error );
        }
      );
  }

  updateQueryAppInputMaping( mapping: any ) {
    console.log(this.input);
    console.log('inputVariables:', this.input.mapping[this.input.app.hash]);
    console.log(mapping);
    this.mapping = mapping;
    if ( !this.mappingUsedByPage[ this.input ] ) {
      this.mappingUsedByPage[ this.input.query.query ] = {};
    }
    this.mappingUsedByPage[ this.input.query.query ].abstractResponse = this.input.abstractReponse;
    console.log( this.mappingUsedByPage );
  }
}
