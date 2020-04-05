import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {error} from 'util';
import {mimeType} from './mimeType.validator';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FileModel} from '../../../user-action-engine/file/file.model';
import {FileService} from '../../../user-action-engine/file/file.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-our-new-component',
  templateUrl: './our-new-component.component.html',
  styleUrls: ['./our-new-component.component.scss']
})
export class OurNewComponentComponent implements OnInit {
  userGroups: Array<any>;

  ourFirstVariable: string;
  secondVariable: string;
  name: string;
  description: string;
  newGroupMemberEmail: string;
  member: string;
  pageId: string;
  subPageId: string;
  subPages: Array<any>;
  pages: Array<any>;
  pageSets: Array<any>;
  pageSetId: string;
  userGroupParams: false;
  subPageParams: false;
  sharePageSetParams: true;
  sharePageParams: true;
  groupId: string;
  folder: string;
  foldersArray: Array<string>;
  showAddFolderForm = false;
  mainFolder_id: string;


  form: FormGroup;
  filePreview: string;
  file: FileModel;
  isLoading = false;
  private mode = 'add';
  private  fileId: string;
  files: FileModel[] = [];
  private fileSub: Subscription;
  showUploadedFiles = false;
  folderId: string;

  constructor(
    private http: HttpClient,
    public fileService: FileService,
    public route: ActivatedRoute
  ) { }

  /*onMultipleFileSelected( event: Event) {
      const filesArray = (event.target as HTMLInputElement).files;
      this.form.patchValue({file: file});
      //console.log( 'On File Selected : ' + file.name);
      this.form.get('file').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result as string;
      };
      // tslint:disable-next-line:comment-format
      reader.readAsDataURL(file);
  }*/
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
  }
  ngOnInit() {
    // this.fileService.getFiles();
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


    this.showFolders( '-1' );
    this.ourFirstVariable = 'Hello, this is our first classwide variable';
    this.secondVariable = this.ourFirstVariable + ' and sth added to the first string';
  }

  onDelete(fileId: string) {
    this.fileService.deleteFile(fileId);
  }
  // tslint:disable-next-line:max-line-length
    // this.form.setValue({'title': this.form.value.title,'description': this.form.value.description });// to set the value if we retrieve the doc from the db.
  onSaveFile() {
    /*if (this.form.invalid) {
      return;
    }*/
    // this.isLoading = true;
    if (this.mode === 'add') {
      this.fileService.addFile(this.form.value.file.name, this.form.value.description, this.form.value.file, this.folderId);
      console.log( 'On Save File: ' + this.form.value.file.name );
    } else {
      this.fileService.updateFile(this.fileId, this.form.value.title, this.form.value.description);
    }
    this.form.reset();
 }
  createNewUserGroup() {
    this.http.post(
      'http://localhost:3000/api/userGroups',
      {
        title: this.name,
        description: this.description
      },  )
      .subscribe(
        response => {
          console.log( response );
        }, error => {
          console.log( error );
        }
      );
  }
  listUserGroups() {
    // console.log( "list user groups" );
    this.http.get('http://localhost:3000/api/userGroups' )
      .subscribe(
        response => {
          console.log( response );
          this.userGroups = (response as any).groups;
        }, error => {
          console.log( error );
        }
      );
  }

  listGroupMembers( group: any) {
    console.log( group );
    this.http.get(
      'http://localhost:3000/api/userGroups/' + group.title + '/listGroupMembers'
    )
      .subscribe(
        response => {
          console.log(response);
        }, error => {
          console.log( error);
        }
      );
  }
  removeGroup(groupTitle: string) {
    console.log(' remove group');
    this.http.post('http://localhost:3000/api/userGroups/' + groupTitle ,
      {title: groupTitle},
      )
      .subscribe(
        response => {
          console.log(response);
        }, error => {
          console.log(error);
        }
      );
  }
  assignUserToGroup( group: any, email: string ) {
    console.log( 'assign user to group: ', group );
    this.http.post(
      'http://localhost:3000/api/userGroups/addMember',
      {
        groupId: group._id,
        memberToAdd: email
      },  )
      .subscribe(
        response => {
          console.log( response );
        }, error => {
          console.log( error );
        }
      );
  }
  removeUserFromGroup( group: any, email: any) {
    this.http.post(
      'http://localhost:3000/api/userGroups/removeMember',
      {
        groupId: group._id,
        memberToRemove: email
      },  )
      .subscribe(
        response => {
          console.log( response );
        }, error => {
          console.log( error );
        }
      );
  }
  removeMeFromGroup(group: any ) {
    /*console.log('Remove me from group');
    console.log(group);
    alert(group.title);*/
    this.http.post(
      'http://localhost:3000/api/userGroups/removeCurrentUserFromGroup/' + group._id,
      {title: group.title}
      ,  )
      .subscribe(
        response => {
          console.log( response );
        }, error => {
          console.log( error );
        }
      );
  }
  assignNewOwner(group: any, email: string) {
    this.http.post(
      'http://localhost:3000/api/userGroups/assignNewOwner/' + group._id + '&' + email,
    {title: group.title}
  ,  )
  .subscribe(
      response => {
        console.log( response );
      }, error => {
        console.log( error );
      }
    );
  }
  updateUserGroupDetails(groupId: string, title: string, description: string) {
    /*alert(title);
    alert(description);
    console.log(groupId, title, description);*/
    this.http.post('http://localhost:3000/api/userGroups/updateUserGroup/' + title + '&' + description,
      {
        groupId: groupId/*,
        title: title,
        description: description*/
      }, )
      .subscribe(
        response => {
          console.log( (response as any).result);
        }, error => {
          console.log( error );
        }
      );
  }
  showUserGroupDetails(groupId: string) {

    this.http.get('http://localhost:3000/api/userGroups/showUserGroupDetails/' + groupId,
       )
      .subscribe(
        response => {
          console.log( response );
          this.name = (response as any).result.title;
          this.description = (response as any).result.description;
        }, error => {
          console.log( error );
        }
      );
  }
  createNewSubPage(pageId: string, title: string, description: string) {
    this.http.post('http://localhost:3000/api/sub-page/New/' + pageId,
      {
        title: title,
        description: description
      }, )
      .subscribe(
        response => {
          console.log( (response as any).result[0]);
        }, error => {
          console.log( error );
        }
      );
  }
  showSubPageDetails(subPage: string) {
    this.http.get('http://localhost:3000/api/sub-page/' + subPage,
    )
      .subscribe(
        response => {
          console.log( response );
          this.name = (response as any).subPage[0].title;
          this.description = (response as any).subPage[0].description;
        }, error => {
          console.log( error );
        }
      );
  }
  showAllSubPages(pageId: string) {
    this.http.get('http://localhost:3000/api/sub-page/sub-pages/' + pageId,
    )
      .subscribe(
        response => {
          console.log( (response as any).subPages); // an array of subPages details'
        }, error => {
          console.log( error );
        }
      );
  }
  deleteSubPage(subPageId: string, pageId: string) {
    this.http.post('http://localhost:3000/api/sub-page/' + subPageId + '&' + pageId,
      {subPageId: subPageId }
      , )
      .subscribe(
        response => {
          console.log( (response as any).result);
        }, error => {
          console.log( error );
        }
      );
  }
  updateSubPageDetails(subPageId: string) {
    this.http.post('http://localhost:3000/api/sub-page/update/' + subPageId,
      {subPageId: subPageId,
      title: this.name,
      description: this.description}
      , )
      .subscribe(
        response => {
          console.log( (response as any).result);
        }, error => {
          console.log( error );
        }
      );
  }

  sharePageSet(pageSetId: string, groupId: string) {
    this.http.post('http://localhost:3000/api/userGroups/sharePageSet/' + pageSetId + '&' + groupId,
      {pageSetId: pageSetId}
      , )
      .subscribe(
        response => {
          console.log( (response as any).result);
        }, error => {
          console.log( error );
        }
      );
  }
  sharePage(pageId: string, groupId: string) {
    this.http.post('http://localhost:3000/api/userGroups/sharePage/' + pageId + '&' + groupId,
      {pageId: pageId}
      , )
      .subscribe(
        response => {
          console.log( (response as any).result);
        }, error => {
          console.log( error );
        }
      );
  }
  showPageSets(groupId: string) {
    this.http.get('http://localhost:3000/api/userGroups/showPageSets/' + groupId,
    )
      .subscribe(
        response => {
          console.log( (response as any).PageSets); // an array of subPages details'
          this.pageSets = (response as any).PageSets.hasPageSets;
        }, error => {
          console.log( error );
        }
      );
  }
  showPages(groupId: string) {
    this.http.get('http://localhost:3000/api/userGroups/showPages/' + groupId,
    )
      .subscribe(
        response => {
          console.log( (response as any).Pages); // an array of subPages details'
          this.pages = (response as any).Pages.hasPages;
        }, error => {
          console.log( error );
        }
      );
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

