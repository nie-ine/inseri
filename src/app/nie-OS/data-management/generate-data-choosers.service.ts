import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateDataChoosersService {

  constructor() { }

  generateDataChoosers( page: any, openAppsInThisPage: any ) {
    console.log( 'generate data choosers', page, openAppsInThisPage);

    // 1. Perform query saved in page to get actual data

    // All of the information ( data for the apps and data choosers )
    // is stored in openAppsInThisPage
    return openAppsInThisPage;
  }
}
