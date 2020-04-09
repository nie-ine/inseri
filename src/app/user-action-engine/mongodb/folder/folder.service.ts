import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private static API_BASE_URL_FOLDER = environment.node + '/api/folder';
  constructor(private http: HttpClient) { }

  showFolders(mainFolderId: string): Observable<any> {
    return this.http.get(
      `${FolderService.API_BASE_URL_FOLDER}` + '/' + mainFolderId,
      {});
  }

  createNewFolder(title: string): Observable<any> {
    return this.http.post(`${FolderService.API_BASE_URL_FOLDER}` + '/-1' ,
      {title: title}, {observe: 'response'});
  }

  updateFolderTitle(folderId: string, title: string): Observable<any> {
    return this.http.post(`${FolderService.API_BASE_URL_FOLDER}` + '/update/title/' + folderId,
      {title: title}, {observe: 'response'});
  }

  addPageSetsToFolder(folderId: string, pageSetId: string, pageSetTitle: string ): Observable<any> {
    return this.http.post(`${FolderService.API_BASE_URL_FOLDER}` + '/update/addPageSet/' + folderId + '&' + pageSetId + '&' + pageSetTitle,
      {} , {observe: 'response'});
  }

  deletePageSetsFromFolder(folderId: string, pageSet: {id: string, title: string}): Observable<any> {
    return this.http.post(`${FolderService.API_BASE_URL_FOLDER}` + '/update/removePageSet/' + folderId + '&' + pageSet.id,
      {pageSetTitle: pageSet.title} , {observe: 'response'});
  }

  deleteFolder(folderId: string): Observable<any> {
    return this.http.post(`${FolderService.API_BASE_URL_FOLDER}` + '/delete/' + folderId,
      {}, {observe: 'response'});
  }

  createSubFolder(title: string, mainFolderId: string): Observable<any>  {
    return this.http.post(`${FolderService.API_BASE_URL_FOLDER}` + '/' + mainFolderId,
      {title: title}, {observe: 'response'});
  }

  uploadFileToFolder(folderId: string, fileId: string): Observable<any> {
    return this.http.post(`${FolderService.API_BASE_URL_FOLDER}` + '/update/uploadFile/' + folderId + '&' + fileId,
      {}, {observe: 'response'});
  }

  getPageSets(mainFolder_id: string): Observable<any> {
    return this.http
      .get<{ message: string; pageSets: any }>(
      `${FolderService.API_BASE_URL_FOLDER}` + '/getPageSets/' + mainFolder_id)
      .pipe(
      map(response => {
        return response.pageSets.map(pageSet => {
          return {
            id: pageSet.id,
            title: pageSet.title
          };
        });
      })
    );
  }
}
