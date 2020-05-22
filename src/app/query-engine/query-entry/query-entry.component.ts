/**
 * This component is the GUI to enter queries by the user
 * */

import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabChangeEvent } from '@angular/material';
import {HttpClient} from '@angular/common/http';
import { AbstractJsonService } from '../../query-app-interface/data-management/services/abstract-json.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KeyValueFormComponent } from './key-value-form/key-value-form.component';
import { GeneralRequestService } from '../general/general-request.service';
import { QueryService } from '../../user-action-engine/mongodb/query/query.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-query-entry',
  templateUrl: './query-entry.component.html',
  styleUrls: ['./query-entry.component.scss']
})
export class QueryEntryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editor') editor;
  @ViewChild('editor2') editor2;

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
  jsonObjectHasArrived = false;
  jsonId: string;
  jsonObject: any;

  constructor(
    public dialogRef: MatDialogRef<QueryEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private queryService: QueryService,
    private requestService: GeneralRequestService
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.queryService.getQuery(this.data.query._id || this.data.query.id)
      .subscribe(
        data => {
          console.log(data);
          this.data.query = data.query;
          this.form = new FormGroup({
            title: new FormControl(this.data.query.title, [Validators.required]),
            description: new FormControl(this.data.query.description, []),
            serverURL: new FormControl(this.data.query.serverUrl, []),
            method: new FormControl(this.data.query.method ? this.data.query.method : 'GET', [Validators.required])
          });
          if (this.data.query.method === 'JSON') {
            this.activateJsonButton = true;
            setTimeout(() => {
              this.initiateQuery();
            }, 1000);
          }
        }
      ), error => console.log(error);
  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {
    this.setBodyInEditor();
  }

  setBodyInEditor() {
    if ( this.form ) {
      if ((this.form.get('method').value === 'POST') || (this.form.get('method').value === 'PUT')) {
        this.editor.text = this.data.query.body;
      }
    }
  }

  save() {
    this.data.query.title = this.form.get('title').value;
    this.data.query.description = this.form.get('description').value;
    this.data.query.serverUrl = this.form.get('serverURL').value;
    this.data.query.method = this.form.get('method').value;
    if (this.param) {
      this.data.query.params = this.param.getValidParams();
    }
    if (this.header) {
      this.data.query.header = this.header.getValidParams();
    }
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
      console.log('pageID is not there', this.data);
      if ( !this.data.query._id ) {
        this.data.query._id = this.data.query.id;
      }
      this.queryService.updateQuery(this.data.query._id, this.data.query)
        .subscribe((data) => {
          if (data.status === 200) {
            console.log( 'query saved', data );
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

  closeWithoutSaving() {
    this.dialogRef.close();
  }

  onTabChange(e: MatTabChangeEvent) {
    if (e.index === 2) {
      this.setBodyInEditor();
    }
  }

  initiateQuery() {
    // console.log( 'Initiate Query' );
    const url = this.form.get('serverURL').value;
    const method = this.form.get('method').value;
    let header, param2;
    header = this.header.getValidParams().length > 0 ? this.header.getValidParams()
      .reduce(((acc, param) => ({...acc, [param.key]: param.value})), {}) : null;
    param2 = this.param.getValidParams();
    switch (method) {
      case 'GET':
        this.getRequest(url, param2, header);
        break;
      case 'POST':
        this.postRequest(url, param2, header, this.editor.text);
        break;
      case 'PUT':
        this.putRequest(url, param2, header, this.editor.text);
        break;
      case 'DELETE':
        this.deleteRequest(url, param2, header);
        break;
      case 'JSON':
        this.getRequest(url, param2, header);
        break;
    }
  }

  getRequest(url: string, parameter: any, header: any) {
    // console.log( 'Get Request' );
    this.requestService.get(url, parameter, header)
      .subscribe(data => {
          console.log(data);
          this.response = data.body;
          this.tree = data.body;
          if (this.activateJsonButton) {
            this.editor2.text = JSON.stringify((data.body as any).result, null, 2);
            this.jsonId = (data.body as any).result._id;
            this.jsonObjectHasArrived = true;
          }
          this.abstractJson = this.abstractJsonService.json2abstract(data.body);
          this.error = false;
          console.log(this.abstractJson);
        }, error => {
          console.log(error);
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

  changeTreeInput(tree: any) {
    console.log('Change tree', tree);
    this.tree = tree;
  }

  updateQueryAppInputMaping(paths: any) {
    console.log(paths);
    this.paths = paths;
  }

  generateNewJsonObject() {
    this.activateJsonButton = true;
    if ( !this.data.query.serverUrl ) {
      console.log('Generate new JSON object');
      this.requestService.createJson()
        .subscribe(data => {
            console.log(data);
            this.editor2.text = JSON.stringify((data as any).result, null, 2);
            this.jsonObjectHasArrived = true;
            this.jsonId = (data as any).result._id;
            this.form = new FormGroup({
              title: new FormControl(this.data.query.title, [Validators.required]),
              description: new FormControl(this.data.query.description, []),
              serverURL: new FormControl(environment.node + '/api/myOwnJson/getJson/' + String((data as any).result._id), []),
              method: new FormControl('JSON', [Validators.required])
            });
          }, error => console.log(error)
        );
    }
  }

  updateJsonObject() {
    console.log( 'UpdateJson' );
    this.requestService.updateJson(
      this.jsonId,
      JSON.parse(
        this.editor2.text
      )
    )
      .subscribe(data => {
      console.log(data);
      }, error => console.log(error)
    );
  }

  saveAndClose() {
    this.save();
    this.close();
  }

}
