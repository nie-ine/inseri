import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';
import {GenerateHashService} from '../../../user-action-engine/other/generateHash.service';

@Component({
  selector: 'app-json-environment',
  templateUrl: './json-environment.component.html',
  styleUrls: ['./json-environment.component.scss']
})
export class JsonEnvironmentComponent implements OnChanges, HttpInterceptor {

  @Input() hash: string;
  @Input() assignedJson: any;
  @Input() pythonFile: any;
  @ViewChild('editor') editor;
  serivceId = 'jsonEnvironment';
  display = JSON.parse( localStorage.getItem( this.serivceId ) );
  constructor(
    private http: HttpClient
  ) {
  }

  ngOnChanges( changes: SimpleChanges ) {
    console.log( 'changes', this.hash, this.assignedJson, this.pythonFile );
    if ( this.hash && this.assignedJson ) {
      localStorage.setItem( this.serivceId, JSON.stringify({ hash: this.hash, json: this.assignedJson } ) );
    }
    if ( this.pythonFile && this.pythonFile.search( 'http' ) !== -1 ) {
      this.http.get( this.pythonFile, { responseType: 'text' } )
        .subscribe(
          data => {
            console.log( data );
            this.editor.text = data;
          }, error => {
            console.log( error );
          }
        );
    }
    else {
      this.editor.text = this.pythonFile;
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jsonEnvironmentInstances = JSON.parse( localStorage.getItem( this.serivceId ) );
    const jsonEnvironmentSet = new Set();

    for ( const service in jsonEnvironmentInstances ) {
      jsonEnvironmentSet.add( jsonEnvironmentInstances[ 'hash' ] );
    }

    // console.log( jsonEnvironmentInstances[ 'json' ]);

    return Observable.of(null).mergeMap(() => {
      if ( jsonEnvironmentSet.has( request.url ) ) {
        console.log( 'interceptor is triggered' );
        const body = jsonEnvironmentInstances;
        // localStorage.removeItem( this.serivceId );
        return Observable.of(new HttpResponse({ status: 200, body: body }));
      } else {
        return next.handle(request);
      }
    })
      .materialize()
      .dematerialize();
  }
}
