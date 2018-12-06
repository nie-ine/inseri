import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import { AbstractJsonService } from '../data-management/abstract-json.service';

@Component({
  selector: 'app-query-entry',
  templateUrl: './query-entry.component.html',
  styleUrls: ['./query-entry.component.scss']
})
export class QueryEntryComponent implements OnInit {
  @ViewChild('editor') editor;
  server = 'http://knora2.nie-ine.ch/v2/ontologies/' +
    'allentities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F004D%2Fkuno-raeber%2Fv2' +
    '?email=root%40example.com&password=test';
  response: any;
  tree: any;
  abstractJson: any;
  dummy = {'menu': {
      'id': 'file',
      'value': 'File',
      'popup': {
        'menuitem': [
          {'value': 'New', 'onclick': 'CreateNewDoc()'},
          {'value': 'Open', 'onclick': 'OpenDoc()'},
          {'value': 'Close', 'onclick': 'CloseDoc()'}
        ]
      }
    }};

  constructor(
    public dialogRef: MatDialogRef<QueryEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public inputQuery: any,
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService
  ) { }

  ngOnInit() {
  }

  close() {
    const output = [
      this.abstractJson,
      this.inputQuery
    ];
    this.dialogRef.close(
      output
    );
  }

  sendQuery() {
    // console.log( 'Send query' );
    const queryToBeSend = this.server;
    // console.log( queryToBeSend );
    this.http.get( queryToBeSend )
      .subscribe(
        data => {
          // console.log( data );
          this.response = data;
          this.tree = data;
          this.abstractJson = this.abstractJsonService.json2abstract( data );
          console.log( this.abstractJson );
        }, error => {
          console.log( error );
        }
      );
  }

  changeTreeInput( tree: any ) {
    console.log( 'Change tree', tree );
    this.tree = tree;
  }

}
