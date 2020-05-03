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
    return this.http.get<{ _id: string; title: string; description: string }>(
      `${FileService.API_BASE_URL_FILES}` + '/' + id
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



  addFile(title: string, description: string, uploadedFile: File, folderId: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    // const file: File = { id: null, title: title, description: description }; // we send an obj here in the body that will be auto converted to json, but json cannot include a file
    const fileData = new FormData(); // formData is a data format which allows us to combine txt values and blob
    fileData.append('title', title); // we append fields to it
    fileData.append('description', description);
    // tslint:disable-next-line:max-line-length
    fileData.append('file', uploadedFile, uploadedFile.name); // the property we added in the files routes, the title is the file name I provide to the backend, which is the title the user entered for the file
    console.log(' add file ' + title + description + uploadedFile.name);
    return this.http
      .post<{ message: string; file: FileModel }>(
        `${FileService.API_BASE_URL_FILES}` + '/' + folderId,
        fileData
      );
  }

  updateFile(id: string, title: string, description: string) {
    const file: FileModel = { id: id, title: title, description: description, urlPath: null };
    this.http
      .put(`${FileService.API_BASE_URL_FILES}` + '/' + id, file)
      .subscribe(response => {
        const updatedFiles = [...this.files];
        const oldFileIndex = updatedFiles.findIndex(p => p.id === file.id);
        updatedFiles[oldFileIndex] = file;
        this.files = updatedFiles;
        this.filesUpdated.next([...this.files]);
        this.router.navigate(['app-our-new-component']);
        // this.router.navigate(['/']);
      });
  }

  deleteFile(fileId: string, folderId: string): Observable<any> {
    return this.http
      .post(`${FileService.API_BASE_URL_FILES}` + '/deleteFiles/' + fileId + '&' + folderId, {});
  }
}

