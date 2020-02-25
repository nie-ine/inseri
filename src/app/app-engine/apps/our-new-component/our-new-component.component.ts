import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {error} from 'util';
@Component({
  selector: 'app-our-new-component',
  templateUrl: './our-new-component.component.html',
  styleUrls: ['./our-new-component.component.scss']
})
export class OurNewComponentComponent implements OnInit {
  userGroups: Array<any>;
  constructor(
    private http: HttpClient
  ) { }
  ourFirstVariable: string;
  secondVariable: string;
  name: string;
  description: string;
  newGroupMemberEmail: string;
  member: string;
  pageId: string;
  subPageId: string;

  ngOnInit() {
    this.ourFirstVariable = 'Hello, this is our first classwide variable';
    this.secondVariable = this.ourFirstVariable + ' and sth added to the first string';
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
          console.log( (response as any).result);
        }, error => {
          console.log( error );
        }
      );
  }
  showSubPageDetails(subPage: string) {
    this.http.get('http://localhost:3000/api/sub-page/New/' + subPage,
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
  showAllSubPages(pageId: string) {
    this.http.get('http://localhost:3000/api/sub-page/sub-pages/' + pageId,
    )
      .subscribe(
        response => {
          console.log( response );
        }, error => {
          console.log( error );
        }
      );
  }
  deleteSubPage(subPageId: string) {
    this.http.post('http://localhost:3000/api/sub-page/' + subPageId,
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

}

