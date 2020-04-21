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

  addPageSetsToFolder(folderId: string, pageSet: {id: string, title: string, actionId: string} ): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${FolderService.API_BASE_URL_FOLDER}` + '/update/addPageSet/' + folderId,
      {pageSet: pageSet} , {observe: 'response'});
  }

  addQueryToFolder(folderId: string, query: {id: string, title: string} ): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${FolderService.API_BASE_URL_FOLDER}` + '/update/addQuery/' + folderId + '&' + query.id,
      {queryTitle: query.title} , {observe: 'response'});
  }
  deletePageSetsFromFolder(folderId: string, pageSet: {id: string, title: string, actionId: string}): Observable<any> {
    return this.http.post(`${FolderService.API_BASE_URL_FOLDER}` + '/update/removePageSet/' + folderId,
      {pageSet: pageSet} , {observe: 'response'});
  }

  deleteQueryFromFolder(folderId: string, query: {id: string, title: string}): Observable<any> {
    return this.http.post(`${FolderService.API_BASE_URL_FOLDER}` + '/update/removeQuery/' + folderId + '&' + query.id,
      {queryTitle: query.title} , {observe: 'response'});
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
            id: pageSet._id,
            title: pageSet.title,
            actionId: pageSet.actionId
          };
        });
      })
    );
  }
  getQueries(mainFolder_id: string): Observable<any> {
    return this.http.get<{ message: string; queries: any }>(
        `${FolderService.API_BASE_URL_FOLDER}` + '/getQueries/' + mainFolder_id)
      .pipe(
        map(response => {
          return response.queries.map(query => {
            return {
              id: query._id,
              title: query.title
            };
          });
        })
      );
  }
}
