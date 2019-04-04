import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabChangeEvent } from '@angular/material';
import {HttpClient} from '@angular/common/http';
import { AbstractJsonService } from '../../query-app-interface/data-management/services/abstract-json.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KeyValueFormComponent } from './key-value-form/key-value-form.component';
import { GeneralRequestService } from '../general/general-request.service';
import { QueryService } from '../../user-action-engine/mongodb/query/query.service';

@Component({
  selector: 'app-query-entry',
  templateUrl: './query-entry.component.html',
  styleUrls: ['./query-entry.component.scss']
})
export class QueryEntryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editor') editor;

  @ViewChild('paramForm')
  private param: KeyValueFormComponent;

  @ViewChild('headerForm')
  private header: KeyValueFormComponent;

  response: any;
  tree: any;
  abstractJson: any;
  form: FormGroup;
  paths = [];
  chosenInputs = ['label'];
  error = false;
  activateJsonButton = false;

  constructor(
    public dialogRef: MatDialogRef<QueryEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private queryService: QueryService,
    private requestService: GeneralRequestService
  ) { }

  ngOnInit() {
      this.form = new FormGroup({
          title: new FormControl(this.data.query.title, [Validators.required]),
          description: new FormControl(this.data.query.description, []),
          serverURL: new FormControl(this.data.query.serverUrl, []),
          method: new FormControl(this.data.query.method ? this.data.query.method : 'GET', [Validators.required])
      });
  }

  ngOnDestroy() {

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
      this.data.query.title = this.form.get('title').value;
      this.data.query.description = this.form.get('description').value;
      this.data.query.serverUrl = this.form.get('serverURL').value;
      this.data.query.method = this.form.get('method').value;
      this.data.query.params = this.param.getValidParams();
      this.data.query.header = this.header.getValidParams();
      this.data.query.body = (this.editor) ? this.editor.text : '';

      if (this.data.pageID) {
        console.log('pageID is there');
        this.queryService.updateQueryOfPage(this.data.pageID, this.data.query._id, this.data.query)
          .subscribe((data) => {
            if (data.status === 200) {
            } else {
              console.log('Updating query failed');
            }
          }, error1 => console.log(error1));
      } else {
        console.log('pageID is not there', this.data.query._id);
        this.queryService.updateQuery(this.data.query._id, this.data.query)
          .subscribe((data) => {
            if (data.status === 200) {
            } else {
              console.log('Updating query failed');
            }
          }, error1 => console.log(error1));
      }
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

  initiateQuery() {
    const url = this.form.get('serverURL').value;
    const method = this.form.get('method').value;
    const header = this.header.getValidParams().length > 0 ? this.header.getValidParams()
      .reduce(((acc, param) => ({...acc, [param.key]:  param.value})), {}) : null;
    switch (method) {
      case 'GET':
        this.getRequest(url, this.param.getValidParams(), header);
        break;
      case 'POST':
        this.postRequest(url, this.param.getValidParams(), header, this.editor.text);
        break;
      case 'PUT':
        this.putRequest(url, this.param.getValidParams(), header, this.editor.text);
        break;
      case 'DELETE':
        this.deleteRequest(url, this.param.getValidParams(), header);
        break;
    }
  }

  getRequest(url: string, parameter: any, header: any) {
    this.requestService.get(url, parameter, header)
      .subscribe(data => {
          console.log(data);
          this.response = data.body;
          this.tree = data.body;
          this.abstractJson = this.abstractJsonService.json2abstract(data.body);
        this.error = false;
          console.log(this.abstractJson);
        }, error => {
          console.log( error );
        this.response = error;
        this.tree = error;
        this.error = true;
        }
      );
  }

  postRequest(url: string, parameter: any, header: any, body: string) {
    this.requestService.post(url, parameter, header, body)
      .subscribe(data => {
          console.log(data);
        this.response = data.body;
        this.tree = data.body;
        this.abstractJson = this.abstractJsonService.json2abstract(data.body);
        this.error = false;
        }, error => {
        this.response = error;
        this.tree = error;
        this.error = true;
      });
  }

  putRequest(url: string, parameter: any, header: any, body: string) {
    this.requestService.put(url, parameter, header, body)
      .subscribe(data => {
          console.log(data);
        // TODO: Mapping from Jan
        }, error => console.log(error)
      );
  }

  deleteRequest(url: string, parameter: any, header: any) {
    this.requestService.delete(url, parameter, header)
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

  updateQueryAppInputMaping( paths: any ) {
    console.log( paths );
    this.paths = paths;
  }

  generateNewJsonObject() {
    console.log( 'Generate new JSON object' );
    this.requestService.createJson()
      .subscribe(data => {
          console.log(data);
        }, error => console.log(error)
      );
  }

}
