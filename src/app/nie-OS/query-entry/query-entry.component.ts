import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {query} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import { AbstractJsonService } from '../data-management/abstract-json.service'

@Component({
  selector: 'app-query-entry',
  templateUrl: './query-entry.component.html',
  styleUrls: ['./query-entry.component.scss']
})
export class QueryEntryComponent {
  @ViewChild('editor') editor;
  server = 'http://0.0.0.0:3333/';
  firstStep = 'admin/projects?email=root%40example.com&password=test';
  response: any;
  tree: any;
  abstractJson: any;
  constructor(
    public dialogRef: MatDialogRef<QueryEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public inputQuery: any,
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService
  ) {
  }

  close() {
    const output = [
      this.abstractJson,
      this.inputQuery
    ]
    this.dialogRef.close(
      output
    );
  }

  sendQuery() {
    // console.log( 'Send query' );
    const queryToBeSend = this.server + this.firstStep;
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
