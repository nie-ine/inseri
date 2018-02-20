import {Injectable} from '@angular/core';
import {ResultToModelMapperService} from '../shared/result-to-model-mapper.service';
import {Text} from './models/text';

@Injectable()
export class ResultToTextMapperService extends ResultToModelMapperService {

  constructor() {
    super();
  }

  parseResult(res: any): Text {
    const model = new Text();
    model.title = res; // TODO: Fill out and continue

    return model;
  }


}
