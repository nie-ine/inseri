import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractJsonService} from './abstract-json.service';
import {GenerateArrayFromLeafsService} from './generate-array-from-leafs.service';
import {GeneralRequestService} from '../../shared/general/general-request.service';
import { QueryService } from '../../shared/nieOS/mongodb/query/query.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateDataChoosersService {
  response: any;
  dataChooserEntries = [];
  y = -50;
  constructor(
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private generateArrayFromLeafs: GenerateArrayFromLeafsService,
    private requestService: GeneralRequestService,
    private queryService: QueryService
  ) { }

  generateDataChoosers( page: any, openAppsInThisPage: any, reset: boolean ) {
    if ( reset ) {
      this.y = -50;
    }
    for ( const queryId of  page.queries ) {
      let queryTitle = '';
      let pathArray = [];
      this.queryService.getQuery(queryId)
        .subscribe((data) => {
          // console.log( data );
          queryTitle = data.query.title;
          pathArray = data.query.path;
        });
      this.requestService.request(queryId)
        .subscribe((data) => {
          if (data.status === 200) {
            console.log(data.body);
            this.response = data.body;
            this.y += 100;
            openAppsInThisPage.dataChooser.model.push( {
              x: 150,
              y: this.y,
              dataChooserEntries: this.generateArrayFromLeafs.generateArrayFromLeafs(
                this.response,
                pathArray
              ),
              title: queryTitle,
              response: data.body,
              queryId: queryId
            } );
            return openAppsInThisPage;
          }
        });
    }
  }
}
