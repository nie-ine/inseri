import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
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
  @Input() json: any;
  serivceId = 'jsonEnvironment';
  constructor(
  ) {
  }

  ngOnChanges() {
    if ( this.hash && this.json ) {
      localStorage.setItem( this.serivceId, JSON.stringify({ hash: this.hash, json: this.json } ) );
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jsonEnvironmentInstances = JSON.parse( localStorage.getItem( this.serivceId ) );
    const jsonEnvironmentSet = new Set();
    for ( const service in jsonEnvironmentInstances ) {
      jsonEnvironmentSet.add( jsonEnvironmentInstances[ 'hash' ] );
    }
    console.log( jsonEnvironmentInstances[ 'json' ]);
    return Observable.of(null).mergeMap(() => {
      if ( jsonEnvironmentSet.has( request.url ) ) {

        const body = jsonEnvironmentInstances;

        return Observable.of(new HttpResponse({ status: 200, body: body }));
      } else {
        return next.handle(request);
      }
    })
      .materialize()
      .delay(500)
      .dematerialize();
  }
}
