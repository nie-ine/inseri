import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PageService {
  private static API_BASE_URL_PAGE =  environment.node +  '/api/pages';
  private static API_BASE_URL_PAGE_SET = environment.node + '/api/pagesets';

  constructor(
    private http: HttpClient
  ) {}

  createPage(pageSetID: string, page: any, parentPageId?: string, subPage?: boolean): Observable<any> {
    if (subPage) {
      return this.http.post(`${PageService.API_BASE_URL_PAGE}/${parentPageId}/newSubPage`, page);
    } else {
      return this.http.post(`${PageService.API_BASE_URL_PAGE_SET}/${pageSetID}/pages`, page);
    }
  }

  getPage(pageId: string): Observable<any> {
    return this.http.get(`${PageService.API_BASE_URL_PAGE}/${pageId}`);
  }

  getAllPages(): Observable<any> {
    return this.http.get(`${PageService.API_BASE_URL_PAGE}`);
  }

  updatePage(page: any): Observable<any> {
    const openAppAsStringArray = [];
    for ( const openApp in page.openApps) {
      if ( page.openApps[openApp].type !== 'dataChooser' && page.openApps[openApp].type !== 'pageMenu' ) {
        console.log( page.openApps[openApp] );
        openAppAsStringArray[ openAppAsStringArray.length ] = JSON.stringify(page.openApps[openApp]);
      }
    }
    const mappingsAsStringArray = [];
    for (const mapping in page.appInputQueryMapping) {
      page.appInputQueryMapping[mapping][ 'app' ] = mapping;
      mappingsAsStringArray[ mappingsAsStringArray.length ] = JSON.stringify(page.appInputQueryMapping[mapping]);
    }
    page.appInputQueryMapping = mappingsAsStringArray;
    page.openApps = openAppAsStringArray;
    return this.http.put(`${PageService.API_BASE_URL_PAGE}/${page._id}`, page);
  }

  updatePageOfPageSet(pageSetID: string, page: any): Observable<any> {
    return this.http.put(`${PageService.API_BASE_URL_PAGE_SET}/${pageSetID}/pages/${page.id}`, page, {observe: 'response'});
  }

  deletePageOfPageSet(pageSetID: string, pageID: string): Observable<any> {
    return this.http.delete(`${PageService.API_BASE_URL_PAGE_SET}/${pageSetID}/pages/${pageID}`, {observe: 'response'});
  }

  duplicatePage( pageID: string, pageSetId: string ): Observable<any> {
    return this.http.get(`${PageService.API_BASE_URL_PAGE}/${pageID}/duplicate/${pageSetId}`);
  }

  linkExistingPage( pageID: string, pageSetId: string ): Observable<any> {
    return this.http.get(`${PageService.API_BASE_URL_PAGE}/${pageID}/link/${pageSetId}`);
  }

  getPublishedPages(): Observable<any> {
    return this.http.get(`${PageService.API_BASE_URL_PAGE}/published`);
  }

  publishAsTemplate( pageID: string ) {
    return this.http.get(`${PageService.API_BASE_URL_PAGE}/publishAsTemplate/${pageID}`);
  }

  undoPublishTemplate( pageID: string ) {
    return this.http.get(`${PageService.API_BASE_URL_PAGE}/undoPublishTemplate/${pageID}`);
  }

  addProfilePhotoForTemplate(pageID: any, templatePhoto: File) {
    const template = new FormData();
    template.append('file', templatePhoto, templatePhoto.name);
    template.append( 'host', environment.app);
    return this.http.post(`${PageService.API_BASE_URL_PAGE}/addProfileTemplate/${pageID}`,
      template);
  }

  getAllSubPages(pageId: string) {
    return this.http.get(`${PageService.API_BASE_URL_PAGE}/sub-pages/${pageId}`);
  }

  movePage(pageToMove: any, oldParentPage: any, newParentPage: any, pageSet: any) {
    return this.http.post(`${PageService.API_BASE_URL_PAGE}/movePage`,
      {pageToMove: pageToMove, oldParentPage: oldParentPage, newParentPage: newParentPage, pageSet: pageSet});
  }

  updateSubPage(page: any): Observable<any> {
    console.log(page);
    return this.http.put(`${PageService.API_BASE_URL_PAGE}/updateSubPages/${page.page._id}`,
      page.subPages,
      {observe: 'response'});
  }
}
