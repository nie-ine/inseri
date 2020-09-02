import { Component, OnInit } from '@angular/core';
import {UsergroupService} from '../../../mongodb/usergroup/usergroup.service';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  userID: string;
  userGroups: Array<any> = [];
  constructor(
    private usergroupService: UsergroupService,
  ) { }

  ngOnInit() {
    this.userID = localStorage.getItem('userId');

  }
  getUserGroups() {
    console.log('get user groups');
    this.usergroupService.getAllUserGroups()
      .subscribe(
        usergroupresponse => {
          console.log(usergroupresponse);
          this.userGroups = (usergroupresponse as any).body.groups;
        },
        error => console.log(error)
      );
  }

}
