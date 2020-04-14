import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {FolderService} from '../../../user-action-engine/mongodb/folder/folder.service';
import {PageService} from '../../../user-action-engine/mongodb/page/page.service';
import {FileModel} from '../../../user-action-engine/file/file.model';
import {FileService} from '../../../user-action-engine/file/file.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ActionService} from '../../../user-action-engine/mongodb/action/action.service';
import {PageSetService} from '../../../user-action-engine/mongodb/pageset/page-set.service';
import {MatTableDataSource} from '@angular/material';
import {QueryService} from '../../../user-action-engine/mongodb/query/query.service';


@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private folderService: FolderService,
    private actionService: ActionService,
    private queriesService: QueryService,
    private pageSetService: PageSetService,
    private pageService: PageService,
    public fileService: FileService,
    public route: ActivatedRoute
  ) { }
  // private static API_BASE_URL_FILES = environment.node + '/api/files';
  private filesUpdated = new Subject<FileModel[]>();
  addFolderForm = false;
  updateFolderTitleForm = false;
  pageSetForm = false;
  folder: string;
  foldersArray: Array<string>;
  mainFolder_id = '-1';
  subFolder_id: string;
  file: FileModel;
  filePreview: string;
  private  fileId: string;
  files: FileModel[] = [];
  private fileSub: Subscription;
  showUploadedFiles = false;
  form: FormGroup;
  private mode = 'add';
  isLoading = false;
  breadCrumbArray = [];
  pageSetsTitles: string[] = [];
  allPageSetsOfUser = [];
  allPagesOfUser = [];
  pages: any;
   addedPageSets = [];
   allQueriesOfUser = [];
   addedQueries = [];
  ngOnInit() {
    this.showFolders();
    this.fileSub = this.fileService.getFileUpdateListener()
      .subscribe((files: FileModel[]) => {
        this.showUploadedFiles = false;
        this.files = files;
      });
    this.form = new FormGroup({
      'title': new FormControl(null), // {validators: [Validators.required]}), // Validators.minLength(3)
      'description': new FormControl(null), // {validators: [Validators.required]}),
      'file': new FormControl(null), // {validators: [Validators.required]})// , asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('fileId')) {
        this.mode = 'edit';
        this.fileId = paramMap.get('fileId');
        this.isLoading = true;
        this.fileService.getFile(this.fileId).subscribe(fileData => {
          this.isLoading = false;
          this.file = {id: fileData._id, title: fileData.title, description: fileData.description, urlPath: null};
          this.form.setValue({'title': this.file.title, 'description': this.file.description});
          console.log( 'ngOnInit: ' + this.file.title );
        });
      } else {
        this.mode = 'add';
        this.fileId = null;
      }
    });
  }

  showForm(form: string) {
    switch (form) {
      case 'AddFolder':
        this.addFolderForm = true;
        break;
      case 'UpdateFolderTitle':
        this.updateFolderTitleForm = true;
        break;
      case 'PageSet':
        this.pageSetForm = true;
        break;
      default:
        this.addFolderForm = false;
        this.updateFolderTitleForm = false;
        this.pageSetForm = false;
    }
  }
  deleteFromBreadCrumb() {
    for (let i = this.breadCrumbArray.length - 1; i >= 0 ; i--) {
      if (this.breadCrumbArray[i].id === this.mainFolder_id) {
        break;
      } else {
        this.breadCrumbArray.pop();
      }
    }
  }
  addToBreadCrumb(title: string) {
    this.breadCrumbArray.push({ id: this.mainFolder_id, title: title } );
  }
  updateBreadCrumb( title: string) {
    const index = this.breadCrumbArray.findIndex((obj => obj.id === this.mainFolder_id));
    this.breadCrumbArray[index].title = title;
}
  deleteFile(fileId: string) {
    this.fileService.deleteFile(fileId, this.mainFolder_id).subscribe(() => {
      console.log(this.files);
      const updatedFiles = this.files.filter(file => file.id !== fileId);
      this.files = updatedFiles;
      console.log(this.files);
      this.filesUpdated.next([...this.files]);
    });
  }
  onSaveFile() {
    if (this.mode === 'add') {
      this.addFile(this.form.value.file.name, this.form.value.description, this.form.value.file);
    } else {
      this.fileService.updateFile(this.fileId, this.form.value.title, this.form.value.description);
    }
    this.form.reset();
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({file: file});
    this.form.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.onSaveFile();
  }

  uploadFileToFolder( fileId: string) {
    this.folderService.uploadFileToFolder(this.mainFolder_id, fileId)
      .subscribe(response => {
          console.log( (response as any).body.updatedDocument._id);
        }, error => {
          console.log( error );
        }
      );
  }

  addFile(title: string, description: string, uploadedFile: File ) {
    this.fileService.addFile(title, description, uploadedFile, this.mainFolder_id)
      .subscribe(responseData => {
        const file: FileModel = {
          id: responseData.file.id,
          title: title,
          description: description,
          urlPath: responseData.file.urlPath
        };
        this.uploadFileToFolder(file.id);
        this.files.push(file);
        this.filesUpdated.next([...this.files]);
      });
  }

  showFolders () {
    this.folderService.showFolders(this.mainFolder_id)
      .subscribe(
        response => {
          console.log( (response as any).folders); // an array of subPages details'
          this.foldersArray = (response as any).folders;
        }, error => {
          console.log( error );
        }
      );
    this.files = [];
    this.addedPageSets = [];
    this.addedQueries = [];
    this.showFiles();
    this.showPageSetsForFolder();
    this.showQueriesForFolder();
  }

  showFiles() {
    if (this.mainFolder_id === '-1') {
      this.files = [];
    } else {
      console.log(this.mainFolder_id);
      this.fileService.getFiles(this.mainFolder_id)
        .subscribe(transformedFiles => {
          console.log('transformed files: ' || transformedFiles);
          this.files = transformedFiles;
          this.filesUpdated.next([...this.files]);
        });
    }
    console.log(this.files);
  }

  createNewFolder(title: string) {
    // alert(title );
    if (this.mainFolder_id === '-1') {
      this.folderService.createNewFolder(title)
        .subscribe(
          response => {
            console.log( ' Create New Folder Response ' + (response as any).body.folder);
            this.showFolders();
            // this.mainFolder_id = (response as any).body.folder._id;
          }, error => {
            console.log( error );
          }
        );
    } else {
      this.folderService.createSubFolder(title, this.mainFolder_id)
        .subscribe(
          response => {
            this.showFolders();
            // this.mainFolder_id = (response as any).body.folder._id;
          }, error => {
            console.log( error );
          }
        );
    }
  }

  updateFolderTitle( title: string) {
    this.folderService.updateFolderTitle(this.mainFolder_id, title)
      .subscribe(
        response => {
          console.log( (response as any).updatedDocument);
        }, error => {
          console.log( error );
        }
      );
  }

  addPageSetToFolder( pageSet: {id: string, title: string}) {
    console.log(pageSet.id, pageSet.title);
    const updatedPageSets = this.addedPageSets.filter(v_pageSet => v_pageSet.id !== pageSet.id);
    this.addedPageSets = updatedPageSets;
    this.addedPageSets.push(pageSet);
    // console.log(this.addedPageSets);
    this.folderService.addPageSetsToFolder(this.mainFolder_id, pageSet )
      .subscribe(
        response => {
          console.log( (response as any).updatedDocument);
        }, error => {
          console.log( error );
        }
      );
  }

  deletePageSetsFromFolder( pageSet: {id: string, title: string}) {
    console.log('pageSet Id : ' + pageSet.id);
    this.folderService.deletePageSetsFromFolder(this.mainFolder_id, pageSet)
      .subscribe(
        () => {
          console.log(this.addedPageSets);
          const updatedPageSets = this.addedPageSets.filter(v_pageSet => v_pageSet.id !== pageSet.id);
          this.addedPageSets = updatedPageSets;
          console.log(this.addedPageSets);
        }, error => {
          console.log( error );
        }
      );
  }
  deleteFolder() {
    this.folderService.deleteFolder(this.mainFolder_id)
      .subscribe(
        response => {
          this.showFolders();
          console.log( (response as any).deletedGroup);
        }, error => {
          console.log( error );
        }
      );
    this.breadCrumbArray.pop();
    if (this.breadCrumbArray.length === 0) {
      this.mainFolder_id = '-1';
    } else {
      this.mainFolder_id = this.breadCrumbArray[this.breadCrumbArray.length - 1].id;
    }
    this.showFolders();
  }

  getAllPageSetForUser() {
    this.actionService.getAllActionsOfUser( localStorage.getItem('userId') )
      .subscribe(
        data => {
          // console.log( data );
          for ( const action of data.actions ) {
            if ( action.hasPageSet !== null ) {
              this.pageSetService.getPageSet( action.hasPageSet )
                .subscribe(
                  pageSets => {
                    console.log(pageSets.pageset);
                    console.log(pageSets.pageset._id, action.title);
                    this.allPageSetsOfUser.push({id: pageSets.pageset._id, title: action.title});
                   /* if ( pageSets.pageset.hasPages ) {
                      this.goThroughPageIdArray( pageSets.pageset.hasPages, action );
                    }*/
                  }, error1 => console.log( error1 )
                );
            }
          }
        }, error => console.log( error )
      );
  }
  /*goThroughPageIdArray( hasPages: Array<any>, action: any ) {
    // console.log( action );
    for ( const pageId of hasPages ) {
      this.pageService.getPage( pageId )
        .subscribe(
          pageResponse => {
            // console.log( pageResponse );
            const page = pageResponse.page;
            page.actionTitle = action.title;
            page.actionId = action._id;
            this.allPagesOfUser.push( pageResponse.page );
            this.pages = new MatTableDataSource( this.allPagesOfUser.slice().reverse());
          }, error => console.log( error )
        );
    }
  }*/

  showPageSetsForFolder() {
    if (this.mainFolder_id === '-1') {
      this.addedPageSets = [];
    } else {
      console.log(this.mainFolder_id);
      this.folderService.getPageSets(this.mainFolder_id)
        .subscribe(response => {
            console.log( response); // an array of subPages details'
            this.addedPageSets = [...response];
          console.log(this.addedPageSets);
          }, error => {
            console.log( error );
          }
        );
    }
  }
  getAllQueriesForUser() {
    this.queriesService.getAllQueriesOfUser(localStorage.getItem('userId')).subscribe(
      (response) => {
        this.allQueriesOfUser = response.queries;
        console.log(this.allQueriesOfUser);
      },
      err => {
        console.log(err);
      }
    );
  }
  addQueryToFolder(query: {id: string, title: string}) {
    console.log(this.addedQueries);
    this.folderService.addQueryToFolder(this.mainFolder_id, query)
      .subscribe(
        response => {
          console.log( (response as any).updatedDocument);
          const updatedQueries = this.addedQueries.filter(v_query => v_query.id !== query.id);
          this.addedQueries = updatedQueries;
          this.addedQueries.push(query);
        }, error => {
          console.log( error );
        }
      );
  }
  showQueriesForFolder() {
     if (this.mainFolder_id === '-1') {
      this.addedQueries = [];
     } else {
       console.log(this.mainFolder_id);
       this.folderService.getQueries(this.mainFolder_id)
         .subscribe(response => {
             console.log(response);
             this.addedQueries = [...response];
             console.log(this.addedQueries);
           }, error => {
             console.log(error);
           }
         );
     }
    }
  deleteQueryFromFolder( query: {id: string, title: string}) {
  this.folderService.deleteQueryFromFolder(this.mainFolder_id, query)
      .subscribe(
        () => {
          const updatedQueries = this.addedQueries.filter(v_query => v_query.id !== query.id);
          this.addedQueries = updatedQueries;
          console.log(this.addedQueries);
        }, error => {
          console.log( error );
        }
      );
}
}
