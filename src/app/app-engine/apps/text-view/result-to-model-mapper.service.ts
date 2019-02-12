import {Injectable} from '@angular/core';
import {BasicModel} from '../models/basic-model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export abstract class ResultToModelMapperService {

  abstract parseResult(res: Observable<any>): BasicModel;

}
