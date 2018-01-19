import {Injectable} from '@angular/core';
import {BasicModel} from './models/basic-model';

@Injectable()
export abstract class ResultToModelMapperService {

  abstract parseResult(res: any): BasicModel;

}
