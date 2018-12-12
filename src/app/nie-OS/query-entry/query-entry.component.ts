import {AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabChangeEvent } from '@angular/material';
import {HttpClient} from '@angular/common/http';
import { AbstractJsonService } from '../data-management/abstract-json.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MongoPageService} from '../../shared/nieOS/mongodb/page/page.service';
import { KeyValueFormComponent } from './key-value-form/key-value-form.component';

@Component({
  selector: 'app-query-entry',
  templateUrl: './query-entry.component.html',
  styleUrls: ['./query-entry.component.scss']
})
export class QueryEntryComponent implements OnInit, AfterViewInit {
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
          serverURL: new FormControl(this.data.query.serverUrl, []),
          method: new FormControl(this.data.query.method ? this.data.query.method : 'GET', [Validators.required])
      });
  }

  ngAfterViewInit() {
    this.setBodyInEditor();
  }

  setBodyInEditor() {
    if ((this.form.get('method').value === 'POST') || (this.form.get('method').value === 'PUT')) {
      this.editor.text = this.data.query.body;
    }
  }

  save() {
      this.data.query.serverUrl = this.form.get('serverURL').value;
      this.data.query.method = this.form.get('method').value;
      this.data.query.params = this.param.getValidParams();
      this.data.query.header = this.header.getValidParams();
      this.data.query.body = (this.editor) ? this.editor.text : '';

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

  onTabChange(e: MatTabChangeEvent) {
    if (e.index === 2) {
      this.setBodyInEditor();
    }
  }

  sendQuery() {
    const url = this.form.get('serverURL').value;
    const method = this.form.get('method').value;
    const parameter = this.param.getValidParams().length > 0 ? this.param.getValidParams().reduce(((acc, param) => ({...acc, [param.key]:  param.value})), {}) : null;
    const header = this.header.getValidParams().length > 0 ? this.header.getValidParams().reduce(((acc, param) => ({...acc, [param.key]:  param.value})), {}) : null;

    switch (method) {
      case 'GET':
        this.getRequest(url, parameter, header);
        break;
      case 'POST':
        this.postRequest(url, parameter, header, this.editor.text);
        break;
      case 'PUT':
        this.putRequest(url, parameter, header, this.editor.text);
        break;
      case 'DELETE':
        this.deleteRequest(url, parameter, header);
        break;
    }
  }

  getRequest(url: string, parameter: any, header: any) {
    console.log('GET Request', url, parameter, header);
    this.http.get(url, {params : parameter, headers: header})
      .subscribe(data => {
          console.log(data);
          this.response = data;
          this.tree = data;
          this.abstractJson = this.abstractJsonService.json2abstract( data );
          console.log( this.abstractJson );
        }, error => {
          console.log( error );
        }
      );
  }

  postRequest(url: string, parameter: any, header: any, body: string) {
    console.log('POST Request', url, parameter, header, body);
    this.http.post(url, body, {params: parameter, headers: header})
      .subscribe(data => {
          console.log(data);
          // TODO: Mapping from Jan
        }, error => console.log(error));
  }

  putRequest(url: string, parameter: any, header: any, body: string) {
    console.log('PUT Request', url, parameter, header, body);
    this.http.put(url, body, {params: parameter, headers: header})
      .subscribe(data => {
          console.log(data);
        // TODO: Mapping from Jan
        }, error => console.log(error)
      );
  }

  deleteRequest(url: string, parameter: any, header: any) {
    console.log('DELETE Request', url, parameter, header);
    this.http.delete(url, {params: parameter, headers: header})
      .subscribe(data => {
          console.log(data);
        // TODO: Mapping from Jan
        }, error => console.log(error)
      );
  }

  changeTreeInput( tree: any ) {
    console.log( 'Change tree', tree );
    this.tree = tree;
  }

}
