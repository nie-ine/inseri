import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractJsonService} from './abstract-json.service';
import {GenerateArrayFromLeafsService} from './generate-array-from-leafs.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateDataChoosersService {
  response: any;
  abstractJson: any;
  dataChooserEntries = [];
  constructor(
    private http: HttpClient,
    private abstractJsonService: AbstractJsonService,
    private generateArrayFromLeafs: GenerateArrayFromLeafsService
  ) { }

  generateDataChoosers( page: any, openAppsInThisPage: any ) {
    console.log( 'generate data choosers', page, openAppsInThisPage);
    // das query app input mapping ist in der page gespeichert
    // ich benutze folgende dummy daten:
    const appHash = 'wOcWJ';
    const appType = 'textlistViewers';
    const input = 'textlist';
    const displayedInDataChooser = 'shortname';
    const displayedInTextListViewer = 'longname';

    // 1. Perform query saved in page to get actual data and abstract json
    this.http.get( 'http://0.0.0.0:3333/admin/projects?email=root%40example.com&password=test' )
      .subscribe(
        data => {
          // console.log( data );
          this.response = data;
          this.abstractJson = this.abstractJsonService.json2abstract( data );
          console.log( this.abstractJson );
          // generate Arrays for data chooser
          this.dataChooserEntries = this.generateArrayFromLeafs.generateArrayFromLeafs(
            this.response,
            this.abstractJson,
            displayedInDataChooser
          );
          console.log(this.dataChooserEntries);
          // All of the information ( data for the apps and data choosers )
          // is stored in openAppsInThisPage
          openAppsInThisPage.dataChooser.model.push( {
            x: 116,
            y: 123,
            dataChooserEntries: this.dataChooserEntries
          } );
          console.log( openAppsInThisPage );
          return openAppsInThisPage;
        }, error => {
          console.log( error );
        }
      );
  }
}
