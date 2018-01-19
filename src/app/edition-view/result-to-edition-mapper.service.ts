import {Injectable} from '@angular/core';
import {ResultToModelMapperService} from '../shared/result-to-model-mapper.service';
import {Edition} from './models/edition';
import {BasicModel} from '../shared/models/basic-model';

@Injectable()
export class ResultToEditionMapperService extends ResultToModelMapperService {

  constructor() {
    super();
  }

  parseResult(res: any): Edition {
    const model = new Edition();
    model.title = res; // TODO: Fill out and continue

    return model;
  }


}
