import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {query} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {AbstractJsonService} from '../data-management/services/abstract-json.service';
import {PageService} from '../../user-action-engine/mongodb/page/page.service';
import {GeneralRequestService} from '../../query-engine/general/general-request.service';
import {ActivatedRoute} from '@angular/router';
import {OpenAppsModel} from '../../user-action-engine/mongodb/page/open-apps.model';
import {ActionService} from '../../user-action-engine/mongodb/action/action.service';


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
    @Inject(MAT_DIALOG_DATA) public input: any,
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private pageService: PageService,
    private requestService: GeneralRequestService,
  ) {
    for ( const appInput in input.mapping[ input.app.hash ] ) {
      console.log( this.input.mapping[ input.app.hash ][appInput] );
      if ( this.input.mapping[ input.app.hash ][appInput][ 'query' ] === this.input.query._id ) {
        this.chosenInputs.push( appInput );
        this.paths[ appInput ] = this.input.mapping[ input.app.hash ][appInput][ 'path' ];
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
    console.log( this.input.query._id );
    this.requestService.request(this.input.query._id)
      .subscribe((data) => {
        if (data.status === 200) {
          console.log(data.body);
          this.response = data.body;
          this.tree = data.body;
          this.abstractResponse = this.abstractJsonService.json2abstract( data.body );
        }
      });
  }

  changeTreeInput( tree: any ) {
    // console.log( 'Change tree', tree );
    this.tree = tree;
  }

  updateQueryAppInputMaping( paths: any ) {
    // console.log( paths );
    this.paths = paths;
  }

  save() {
    console.log( this.paths, this.input.page.appInputQueryMapping[ this.input.app.hash ], this.input );
    for ( const appInput in this.paths ) {
      console.log( this.input.page.appInputQueryMapping, this.input.app.hash );
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

  mapWholeJsonToInput(input: string) {
    this.paths[ input ] = ['wholeJsonResponseAssignedToThisAppInput'];
    console.log( 'Map whole json to input' );
    console.log( this.paths, this.input.page.appInputQueryMapping[ this.input.app.hash ], this.input );
  }
}
