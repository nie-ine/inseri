import { Component, OnInit } from '@angular/core';
import {UsergroupService} from '../../user-action-engine/mongodb/usergroup/usergroup.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  userID: string;
  userGroups: Array<any> = [];
  private groupId: string;
  constructor(
    private usergroupService: UsergroupService,
    // private groupId: string,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.groupId = (this.route.snapshot.queryParams.usrGroupId) ? this.route.snapshot.queryParams.usrGroupId : '';
    console.log(this.groupId);
    //this.userID = localStorage.getItem('userId');
  }


}
