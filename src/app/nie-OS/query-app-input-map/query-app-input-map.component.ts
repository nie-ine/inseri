import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {query} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {AbstractJsonService} from '../data-management/abstract-json.service';
import {MongoPageService} from '../../shared/nieOS/mongodb/page/page.service';


@Component({
  selector: 'app-query-app-input-map',
  templateUrl: './query-app-input-map.component.html',
  styleUrls: ['./query-app-input-map.component.scss']
})
export class QueryAppInputMapComponent implements OnInit {
  response: any;
  tree: any;
  abstractResponse: any;
  chosenInputs: Array<any> = [];
  mapping: any;
  paths: Array<any> = [];
  mappingUsedByPage: any = {};
  constructor(
    public dialogRef: MatDialogRef<QueryAppInputMapComponent>,
    @Inject(MAT_DIALOG_DATA) public input: any,
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private pageService: MongoPageService
  ) {
    // if ( !this.input ) {
    //   this.input = JSON.parse(localStorage.getItem('mapInputs'));
    //   console.log( this.input );
    // }
    for ( const appInput in input.mapping[ input.app.hash ] ) {
      console.log( this.input.mapping[ input.app.hash ][appInput] );
      if ( this.input.mapping[ input.app.hash ][appInput][ 'query' ] === this.input.query._id ) {
        this.chosenInputs.push( appInput );
        this.paths[ appInput ] = this.input.mapping[ input.app.hash ][appInput][ 'path' ];
      }
    }
    console.log( this.paths );
  }

  ngOnInit() {
    this.loadAbstractResponse();
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

  updateQueryAppInputMaping( paths: any ) {
    console.log( paths );
    this.paths = paths;
  }

  save() {
    for ( const appInput in this.paths ) {
      this.input.page.appInputQueryMapping[ this.input.app.hash ][ appInput ][ 'path' ] = this.paths[ appInput ];
    }
    console.log(this.input.page);
    this.pageService.updatePage(this.input.page)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
