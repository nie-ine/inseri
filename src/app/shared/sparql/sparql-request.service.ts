import {Injectable} from '@angular/core';
import {RequestService} from '../knora/request.service';
import {RequestTemplate} from '../knora/request-template';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SparqlRequestService extends RequestService {

  send(template: RequestTemplate): Observable<any> {
    return undefined;
  }

}
