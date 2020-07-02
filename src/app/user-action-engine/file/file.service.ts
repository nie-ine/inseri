import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { FileModel } from './file.model';
import {environment} from '../../../environments/environment';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private static API_BASE_URL_FILES = environment.node + '/api/files';
  private files: FileModel[] = [];
  private filesUpdated = new Subject<FileModel[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getFiles(folderId: string): Observable<any> {
    return this.http
      .get<{ message: string; files: any }>(`${FileService.API_BASE_URL_FILES}` + '/files/' + folderId)
      .pipe(
        map(fileData => {
          return fileData.files.map(file => {
            return {
              title: file.title,
              description: file.description,
              id: file._id,
              urlPath: file.urlPath
            };
          });
        })
      );

     /* .subscribe(transformedFiles => {
        this.files = transformedFiles;
        this.filesUpdated.next([...this.files]);
      });*/
  }

  getFileUpdateListener() {
    return this.filesUpdated.asObservable();
  }

  getFile(id: string) {
    return this.http.get<{ _id: string; title: string; description: string, content: string, urlPath: string }>(
      `${FileService.API_BASE_URL_FILES}` + '/' + id
    );
  }

  getFileByUrl(url: string) {
    return this.http.get<{ _id: string; title: string; description: string, content: string, urlPath: string }>(
      `${FileService.API_BASE_URL_FILES}` + '/getFileByUrl/' + encodeURIComponent(url)
    );
  }

  /*addFiles(uploadedFiles: File[]) {
    const fileData = new FormData(); // formData is a data format which allows us to combine txt values and blob
    for (let i = 0; i < uploadedFiles.length; i++) {
      fileData.append('files[]', uploadedFiles[i]);
    }
    return this.http.post(
      `${FileService.API_BASE_URL_FILES} + '/files'}`,
      {files: fileData}, {observe: 'response'});
        // console.log('subscribe data' + file.title + ' ' + file.description);
        //this.files.push(uploadedFiles);
        this.filesUpdated.next([...this.files]);
        // this.router.navigate(['app-our-new-component']);
  }*/

  addFile(title: string, description: string, folderId: string, uploadedFile?: File, content?: string): Observable<any> {
    let newFile = false;
    // tslint:disable-next-line:max-line-length
    // const file: File = { id: null, title: title, description: description }; // we send an obj here in the body that will be auto converted to json, but json cannot include a file
    const fileData = new FormData(); // formData is a data format which allows us to combine txt values and blob
    fileData.append('title', title); // we append fields to it
    fileData.append('description', description);

    // tslint:disable-next-line:max-line-length
    // the property we added in the files routes, the title is the file name I provide to the backend, which is the title the user entered for the file
    if (content) {
      fileData.append('content', content);
      newFile = true;
    } else {
      fileData.append('file', uploadedFile, uploadedFile.name);
      console.log(' add file ' + title + description + uploadedFile.name);
    }
    return this.http
      .post<{ message: string; file: FileModel }>(
        `${FileService.API_BASE_URL_FILES}` + '/singleFileUpload/' + folderId + '/' + newFile, // false mean it is not a new file
        fileData
        // {fileData: {fileData}, newFile: false, content: content}
      );
  }
  addFiles(description: string, files:  File[], folderId: string): Observable<any> {
    console.log('from FileService.addFiles:');
    console.log(files);
    const fileData = new FormData();
    fileData.append('description', description);
    Array.from(files).forEach(file => fileData.append('file', file, file.name));
    console.log(fileData);
    return this.http
      .post<{ message: string; file: FileModel[] }>(
        `${FileService.API_BASE_URL_FILES}` + '/files/' + folderId,
        fileData
      );
  }
  updateFile(id: string, title: string, description: string, content: string, urlPath: string): Observable<any> {
    console.log(id, title, description, content, urlPath);
    return this.http
      .post(`${FileService.API_BASE_URL_FILES}` + '/' + id, {title: title, description: description, content: content, urlPath: urlPath});
  }

  deleteFile(fileId: string, folderId: string): Observable<any> {
    return this.http
      .post(`${FileService.API_BASE_URL_FILES}` + '/deleteFiles/' + fileId + '&' + folderId, {});
  }
  downloadProject(actionId: string): Observable<any> {
    console.log(actionId);
    return this.http.get(`${FileService.API_BASE_URL_FILES}` + '/downloadProject/' + actionId);
  }
  addZipFileToSrvr(file: File): Observable<any> {
    const fileData = new FormData();
    fileData.append('zip', file, file.name);
    return this.http
      .post<{ message: string; fileUrlPath: string; fileName: string }>(
        `${FileService.API_BASE_URL_FILES}` + '/uploadZipFile/',
        fileData
      );
  }
  reloadFiles(): Observable<any> {
    return this.http
      .get(`${FileService.API_BASE_URL_FILES}` + '/restoreFiles/' );
  }
}

