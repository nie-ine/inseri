import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {FolderService} from '../../../user-action-engine/mongodb/folder/folder.service';
import {FileModel} from '../../../user-action-engine/file/file.model';
import {FileService} from '../../../user-action-engine/file/file.service';
import {Subject, Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {
  // private static API_BASE_URL_FILES = environment.node + '/api/files';
  private filesUpdated = new Subject<FileModel[]>();
  showAddFolderForm = false;
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
  chosenPathArray = [];

  constructor(
    private http: HttpClient,
    private folderService: FolderService,
    public fileService: FileService,
    public route: ActivatedRoute
  ) { }

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

  updateChosenPath() {
    for (let i = this.chosenPathArray.length - 1; i > 0 ; i--) {
      if (this.chosenPathArray[i].id === this.mainFolder_id) {
        break;
      } else {
        this.chosenPathArray.pop();
      }
    }
    console.log(this.chosenPathArray);
  }
  onDelete(fileId: string, folderId: string) {
    this.fileService.deleteFile(fileId, folderId).subscribe(() => {
      console.log(this.files);
      const updatedFiles = this.files.filter(file => file.id !== fileId);
      this.files = updatedFiles;
      console.log(this.files);
      this.filesUpdated.next([...this.files]);
    });
  }
  // tslint:disable-next-line:max-line-length
  // this.form.setValue({'title': this.form.value.title,'description': this.form.value.description });// to set the value if we retrieve the doc from the db.
  onSaveFile() {
    /*if (this.form.invalid) {
      return;
    }*/
    // this.isLoading = true;
    if (this.mode === 'add') {
      this.addFile(this.form.value.file.name, this.form.value.description, this.form.value.file);
      console.log( 'On Save File: ' + this.form.value.file.name );
    } else {
      this.fileService.updateFile(this.fileId, this.form.value.title, this.form.value.description);
    }
    this.form.reset();
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({file: file});
    console.log( 'On File Selected : ' + file.name);
    this.form.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };
    // tslint:disable-next-line:comment-format
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
        console.log('subscribe data after add file ' + file.title + ' ' + file.description);
        this.files.push(file);
        this.filesUpdated.next([...this.files]);
        // this.router.navigate(['app-our-new-component']);
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
    this.showFiles(this.mainFolder_id);
  }

  showFiles(folderId: string) {
    if (folderId === '-1') {
      this.files = [];
    } else {
      console.log(folderId);
      this.fileService.getFiles(folderId)
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

  updateFolderTitle(folderId: string, title: string) {
    this.folderService.updateFolderTitle(folderId, title)
      .subscribe(
        response => {
          console.log( (response as any).updatedDocument);
        }, error => {
          console.log( error );
        }
      );
  }

  addPageSetsToFolder(folderId: string, pageSetId: string) {
    this.folderService.addPageSetsToFolder(folderId, pageSetId)
      .subscribe(
        response => {
          console.log( (response as any).updatedDocument);
        }, error => {
          console.log( error );
        }
      );
  }

  deletePageSetsFromFolder(folderId: string, pageSetId: string) {
    this.folderService.deletePageSetsFromFolder(folderId, pageSetId)
      .subscribe(
        response => {
          console.log( (response as any).updatedDocument);
        }, error => {
          console.log( error );
        }
      );
  }
  deleteFolder(folderId: string) {
    this.folderService.deleteFolder(folderId)
      .subscribe(
        response => {
          this.showFolders();
          console.log( (response as any).deletedGroup);
        }, error => {
          console.log( error );
        }
      );
  }
}
