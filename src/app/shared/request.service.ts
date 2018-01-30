import {Injectable} from '@angular/core';
import {RequestTemplate} from './request-template';
import {Observable} from 'rxjs/Observable';
import {KnoraAuthService} from './knora-auth.service';


@Injectable()
export abstract class RequestService {

  abstract send(template: RequestTemplate): Observable<any>;

}

