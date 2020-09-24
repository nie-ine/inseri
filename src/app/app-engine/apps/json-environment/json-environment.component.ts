import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';
import {GenerateHashService} from '../../../user-action-engine/other/generateHash.service';
import {MicroserviceService} from '../../../user-action-engine/mongodb/microservice/microservice.service';
import {FileService} from '../../../user-action-engine/file/file.service';

@Component({
  selector: 'app-json-environment',
  templateUrl: './json-environment.component.html',
  styleUrls: ['./json-environment.component.scss']
})
export class JsonEnvironmentComponent implements OnChanges, HttpInterceptor {

  @Input() hash: string;
  @Input() assignedJson: any;
  @Input() pythonFile: any;
  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('editor') editor;
  serivceId = 'jsonEnvironment';
  display = JSON.parse( localStorage.getItem( this.serivceId ) );
  output: any;
  constructor(
    private http: HttpClient,
    private microserviceService: MicroserviceService,
    public fileService: FileService
  ) {
  }

  ngOnChanges( changes: SimpleChanges ) {
    console.log( 'changes', this.hash, this.assignedJson, this.pythonFile );
    if ( this.hash && this.pythonFile ) {
      this.display = { hash: this.hash, json: this.assignedJson };
      if ( this.pythonFile.search( 'http' ) !== -1 ) {
        this.http.get( this.pythonFile, { responseType: 'text' } )
          .subscribe(
            data => {
              this.editor.text = data;
              this.submitToMicroservice();
            }, error => {
              console.log( error );
            }
          );
      } else {
        this.editor.text = this.pythonFile;
        this.submitToMicroservice();
      }
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jsonEnvironmentInstances = JSON.parse( localStorage.getItem( this.serivceId ) );
    const jsonEnvironmentSet = new Set();

    for ( const service in jsonEnvironmentInstances ) {
      jsonEnvironmentSet.add( jsonEnvironmentInstances[ 'hash' ] );
    }

    return Observable.of(null).mergeMap(() => {
      if ( jsonEnvironmentSet.has( request.url ) ) {
        // console.log( 'interceptor is triggered' );
        const body = jsonEnvironmentInstances;
        // localStorage.removeItem( this.serivceId );
        return Observable.of(new HttpResponse({ status: 200, body: JSON.parse( localStorage.getItem( this.serivceId ) ).output } ));
      } else {
        return next.handle(request);
      }
    })
      .materialize()
      .dematerialize();
  }

  submitToMicroservice() {
    console.log( 'Submit to Microservice', this.display, this.editor.text );
    const body = {
      datafile: 'yourData.json',
      data: JSON.stringify(this.display),
      codefile: 'yourCode.py',
      code: this.editor.text
    };
    this.microserviceService.postToMicroservice( this.serivceId, body)
      .subscribe(
        data => {
          console.log( data );
          this.output = { [this.serivceId + ' output']: data.body.output } ;
          const currentLocalStorage = JSON.parse( localStorage.getItem( this.serivceId ) );
          const localStorageBefore = JSON.parse( localStorage.getItem( this.serivceId ))[ 'json' ] ;
          localStorage.setItem(
            this.serivceId,
            JSON.stringify(
              { hash: this.hash,
                json: this.assignedJson,
                pythonCode: this.editor.text,
                output: this.output
              }));
          const localStorageAfter = JSON.parse( localStorage.getItem( this.serivceId ) )[ 'json' ];
          if ( JSON.stringify( localStorageBefore ) !== JSON.stringify( localStorageAfter ) ) {
            this.reloadVariables.emit();
          }
        }
        , error => {
          console.log( error );
          this.output = { [this.serivceId + ' output']: error.error.output } ;
        }
      );
  }

  savePythonFile() {
    console.log( JSON.parse(localStorage.getItem( this.serivceId )).pythonCode );
    this.fileService.getFileByUrl( this.pythonFile )
      .subscribe(response => {
        console.log( response );
        const file = (response as any).file;
        this.fileService.updateFile(
          file._id,
          file.title,
          file.description,
          this.editor.text,
          this.pythonFile)
          .subscribe(savedFile => {
            console.log( savedFile );
          }, error1 => console.log( error1 )
          );
      }, error => console.log( error )
      );
  }

  updateCodeInLocalStorage() {
    localStorage.setItem(
      this.serivceId,
      JSON.stringify({ hash: this.hash, json: this.assignedJson, pythonCode: this.editor.text } ));
  }

}
 // NOqTY
