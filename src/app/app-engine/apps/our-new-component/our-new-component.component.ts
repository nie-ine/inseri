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
}

