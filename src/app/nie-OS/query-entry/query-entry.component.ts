import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import { AbstractJsonService } from '../data-management/abstract-json.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MongoPageService} from '../../shared/nieOS/mongodb/page/page.service';
import { KeyValueFormComponent } from './key-value-form/key-value-form.component';

@Component({
  selector: 'app-query-entry',
  templateUrl: './query-entry.component.html',
  styleUrls: ['./query-entry.component.scss']
})
export class QueryEntryComponent implements OnInit {
  @ViewChild('editor') editor;

  @ViewChild('paramForm')
  private param: KeyValueFormComponent;

  @ViewChild('headerForm')
  private header: KeyValueFormComponent;

  response: any;
  tree: any;
  abstractJson: any;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<QueryEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private pageService: MongoPageService
  ) { }

  ngOnInit() {
      this.form = new FormGroup({
          serverURL: new FormControl(this.data.query.serverUrl, [])
      });
      this.editor.text = this.data.query.body;
  }

  save() {
      this.data.query.serverUrl = this.form.get('serverURL').value;
      this.data.query.params = this.param.getValidParams();
      this.data.query.header = this.header.getValidParams();
      this.data.query.body = this.editor.text;
      this.pageService.updateQuery(this.data.pageID, this.data.query._id, this.data.query)
          .subscribe((data) => {
            if (data.status === 200) {
                this.close();
            } else {
                console.log('Updating query failed');
                this.close();
            }
          });
  }

  close() {
    const output = [
      this.abstractJson,
      this.data.query
    ];
    this.dialogRef.close(
      output
    );
  }

  sendQuery() {
    // console.log( 'Send query' );
    const queryToBeSend = this.form.get('serverURL').value;
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
