/**
 * This component is the material dialog that is opened when a user clickes
 * in the data manager on "map" to map an input a of an app b to a query c.
 * In this gui, you can map the whole json, which is the response of a query,
 * to an app input.
 * */

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {query} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {AbstractJsonService} from '../data-management/services/abstract-json.service';
import {PageService} from '../../user-action-engine/mongodb/page/page.service';
import {GeneralRequestService} from '../../query-engine/general/general-request.service';


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
  page: any;
  appInputQueryMapping: any;
  openAppsInThisPage: any;
  action: any;
  constructor(
    public dialogRef: MatDialogRef<QueryAppInputMapComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogInput: any,
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private pageService: PageService,
    private requestService: GeneralRequestService,
  ) {

    /**
     * This loop generates the chosenInputs - Variable and the paths variable.
     * */
    for ( const appInput in dialogInput.mapping[ dialogInput.app.hash ] ) {
      if ( this.dialogInput.mapping[ dialogInput.app.hash ][appInput][ 'query' ] === this.dialogInput.query._id ) {
        this.chosenInputs.push( appInput );
        this.paths[ appInput ] = this.dialogInput.mapping[ dialogInput.app.hash ][appInput][ 'path' ];
      }
    }
  }

  ngOnInit() {
    this.loadAbstractResponse();
  }

  close() {
    this.dialogRef.close( this.mapping );
  }

  loadAbstractResponse() {
    this.requestService.request(this.dialogInput.query._id)
      .subscribe((data) => {
        if (data.status === 200) {
          this.response = data.body;
          this.tree = data.body;
          this.abstractResponse = this.abstractJsonService.json2abstract( data.body );
        }
      });
  }

  changeTreeInput( tree: any ) {
    this.tree = tree;
  }

  updateQueryAppInputMaping( paths: any ) {
    this.paths = paths;
    console.log( paths );
  }

  save() {
    for ( const appInput in this.paths ) {
      this.dialogInput.page.appInputQueryMapping[ this.dialogInput.app.hash ][ appInput ][ 'path' ] = this.paths[ appInput ];
    }
    this.pageService.updatePage(this.dialogInput.page)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  mapWholeJsonToInput(input: string) {
    this.paths[ input ] = ['wholeJsonResponseAssignedToThisAppInput'];
  }

  addEmpyPathSegment(input: string, index: number) {
    console.log( input );
    this.paths[ input ].splice( index, 0, '' );
    console.log(this.paths[ input ]);
  }

  updatePath( input: string, index: number, pathString: string ) {
    this.paths[ input ][ index ] = pathString;
    console.log( this.paths[ input ] );
  }

  deleteSegment( input: string, index: number ) {
    this.paths[ input ].splice( index, 1 );
  }
}
