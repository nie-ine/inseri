import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractJsonService} from './abstract-json.service';
import {GenerateArrayFromLeafsService} from './generate-array-from-leafs.service';
import {GeneralRequestService} from '../../shared/general/general-request.service';
import {MongoPageService} from '../../shared/nieOS/mongodb/page/page.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateDataChoosersService {
  response: any;
  abstractJson: any;
  dataChooserEntries = [];
  y = -50;
  constructor(
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private generateArrayFromLeafs: GenerateArrayFromLeafsService,
    private requestService: GeneralRequestService,
    private pageService: MongoPageService
  ) { }

  generateDataChoosers( page: any, openAppsInThisPage: any ) {
    for ( const queryId of  page.queries ) {
      let queryTitle = '';
      this.pageService.getQuery(queryId)
        .subscribe((data) => {
          console.log( data );
          queryTitle = data.query.title;
        });
      this.requestService.request(queryId)
        .subscribe((data) => {
          if (data.status === 200) {
            console.log(data.body);
            this.response = data.body;
            this.abstractJson = this.abstractJsonService.json2abstract( data.body );
            this.dataChooserEntries = this.generateArrayFromLeafs.generateArrayFromLeafs(
              this.response,
              this.abstractJson,
              ['@graph', '@id']
            );
            // console.log(this.dataChooserEntries);
            this.y += 100;
            openAppsInThisPage.dataChooser.model.push( {
              x: 150,
              y: this.y,
              dataChooserEntries: this.dataChooserEntries,
              title: queryTitle
            } );
            return openAppsInThisPage;
          }
        });
    }
  }
}
