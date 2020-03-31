import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {
  showAddFolderForm = false;
  folder: string;
  foldersArray: Array<string>;
  mainFolder_id: string;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.showFolders( '-1' );
  }

  showFolders (mainFolderId: string) {
    this.http.get('http://localhost:3000/api/folder/' + mainFolderId,
    )
      .subscribe(
        response => {
          console.log( (response as any).folders); // an array of subPages details'
          this.foldersArray = (response as any).folders;
        }, error => {
          console.log( error );
        }
      );
  }

  createNewFolder(title: string) {
    alert(title );
    this.http.post('http://localhost:3000/api/folder/' + '-1',
      {title: title}
      , )
      .subscribe(
        response => {
          this.showFolders( '-1' );
          console.log( (response as any).query);
        }, error => {
          console.log( error );
        }
      );
  }

  updateFolderTitle(folderId: string, title: string) {
    alert(folderId + title);
    this.http.post('http://localhost:3000/api/folder/update/title/' + folderId,
      {title: title}
      , )
      .subscribe(
        response => {
          console.log( (response as any).updatedDocument);
        }, error => {
          console.log( error );
        }
      );
  }
  addPageSetsToFolder(folderId: string, pageSetId: string) {
    this.http.post('http://localhost:3000/api/folder/update/addPageSet/' + folderId + '&' + pageSetId,
      {}
      , )
      .subscribe(
        response => {
          console.log( (response as any).updatedDocument);
        }, error => {
          console.log( error );
        }
      );
  }
  deletePageSetsFromFolder(folderId: string, pageSetId: string) {
    this.http.post('http://localhost:3000/api/folder/update/removePageSet/' + folderId + '&' + pageSetId,
      {}
      , )
      .subscribe(
        response => {
          console.log( (response as any).updatedDocument);
        }, error => {
          console.log( error );
        }
      );
  }
  deleteFolder(folderId: string) {
    this.http.post('http://localhost:3000/api/folder/delete/' + folderId ,
      {}
      , )
      .subscribe(
        response => {
          console.log( (response as any).deletedGroup);
        }, error => {
          console.log( error );
        }
      );
  }

  createSubFolder(title: string, mainFolderId: string) {
    alert(title + mainFolderId);
    this.mainFolder_id = mainFolderId;
    this.http.post('http://localhost:3000/api/folder/' + this.mainFolder_id,
      {title: title}
      , )
      .subscribe(
        response => {
          console.log( (response as any).query);
        }, error => {
          console.log( error );
        }
      );
  }

}
