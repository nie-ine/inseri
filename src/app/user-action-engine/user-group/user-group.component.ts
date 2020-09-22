import {UsergroupService} from '../mongodb/usergroup/usergroup.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionService} from '../mongodb/action/action.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {AuthService} from '../mongodb/auth/auth.service';
import {environment} from '../../../environments/environment';
import Stardog from 'stardog';
import consistency = Stardog.db.reasoning.consistency;

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  userID: string;
  userGroup: any;
  groupId: string;
  actions: any[] = [];
  userGroupTitle: string;
  private userAdmin: boolean;
  pages: any;
  usersForm: boolean;
  userEMail: string;
  users: any;
  private adminUsers: any;
  private emailForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  environment = environment.app;
  private actionId: any;

  constructor(
    private userGroupService: UsergroupService,
    private actionService: ActionService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl(this.userEMail, [Validators.pattern(/^.+@.+\.\w+$/)]),
    });
    this.userID = localStorage.getItem('userId');
    this.usersForm = false;
    this.groupId = (this.route.snapshot.queryParams.usrGroupId) ? this.route.snapshot.queryParams.usrGroupId : '';
    this.updateVariables();
  }

  updateVariables() {
    this.actions = [];
    this.userGroupService.showUserGroupDetails(this.groupId)
      .subscribe((result: any) => {
        // console.log(result);
        this.userGroupTitle = result.body.userGroup.title;
        if (result.body.actions || result.body.userGroup) {
          this.userGroup = result.body.userGroup;
          this.users = this.userGroup.users;
          // console.log(this.users);
          this.dataSource = new MatTableDataSource(this.users);
          this.adminUsers = this.userGroup.adminsUsers; // list of the admin users id
          this.userAdmin = result.body.userAdmin; // true if the user is one of the admin users
          if (result.body.userGroup.hasActions.length !== 0 || !result.body.userGroup.hasAction ) {
            result.body.userGroup.hasActions.forEach( (action: any) => {
              this.actions.push(action.actionId);
            });
          }

          if (result.body.actions && result.body.actions.length !== 0) {
            result.body.actions.forEach((action: any) => {
              if (this.searchObjIdInArray(action._id, this.actions) === -1) {
                this.actions.push(action);
              }
            });
          }

          // console.log(this.actions);
          const temp = this.actions.map((obj) => ({...obj, ['color']: 'black', ['pages']: []}));
          this.actions = temp;
          result.body.userGroup.hasActions.forEach(actionInUserGroup => {
            const indexOfAction = this.searchObjIdInArray(actionInUserGroup.actionId._id, this.actions);
            if (indexOfAction !== -1) {
              this.actions[indexOfAction].color = 'green'; // found in my list as well, update the pages.
              this.actions[indexOfAction].pages = [];
              // console.log(actionInUserGroup.hasPages);
              this.actions[indexOfAction].hasPageSet.hasPages.forEach(pageInAction => {
                if (this.searchObjIdInArray(pageInAction._id, actionInUserGroup.hasPages) !== -1) {
                  this.actions[indexOfAction].pages.push({page: pageInAction, toAdd: false});
                } else {
                  this.actions[indexOfAction].pages.push({page: pageInAction, toAdd: true});
                }
              });
            } else {
              this.actions.push({actionId: actionInUserGroup});
              this.actions[this.actions.length - 1].color = 'black';
              this.actions[this.actions.length - 1].pages = [];
              actionInUserGroup.hasPages.forEach(page => {
                this.actions[this.actions.length - 1].pages.push({page: page, toAdd: false});
              });
            }
            // console.log(this.actions);
          });
        }
      });
  }

  addProjectToUserGroup(action: any) {
    const pagesId = [];
    if (action.color === 'green') { // the project is one of  the user group projects
      alert('The project is already in the userGroup, you can add/remove its pages');
      return;
    }
      action.hasPageSet.hasPages.forEach(page => {
        pagesId.push(page._id);
      });
    this.userGroupService.addProjectToUserGroup(action._id, pagesId, this.groupId).subscribe(results => {
      this.updateVariables();
    });
  }

  removeProjectFromUserGroup(action: any) {
    // console.log(action._id, this.groupId);
    this.userGroupService.deleteProjectFromUserGroup(action._id, this.groupId).subscribe(results => {
      this.updateVariables();
      // console.log(results);
    });
  }

  addPageToProject(page: any) {
    const index = this.searchObjIdInArray(this.actionId, this.actions);
    if ( this.actions[index].color === 'black') {
      console.log('project is not shared yet.');
      this.userGroupService.addProjectToUserGroup(this.actionId, [page.page._id], this.groupId).subscribe(results => {
        this.updateVariables();
      });
    } else {
      this.userGroupService.addPageToProject(this.actionId, this.groupId, page.page._id).subscribe(results => {
        console.log('project is shared and we only add a page to it.');
        this.updateVariables();
      });
    }

  }

  removePageFromProject(page: any) {
    const index = this.searchObjIdInArray(this.actionId, this.actions);
    console.log(this.actions[index]);
    let counter = 0;
    this.actions[index].pages.forEach( page => {
      if (page.toAdd) {
        counter++;
      }
    });
    if (counter === 1) {
      this.removeProjectFromUserGroup(this.actions[index]);
    } else {
      this.userGroupService.removePageFromProject(this.actionId, this.groupId, page.page._id).subscribe(results => {
        this.updateVariables();
      });
    }

  }

  showForm(form: string) {
    switch (form) {
      case 'user':
        this.usersForm = true;
        break;
      default:
        this.usersForm = false;
    }
  }


  addUserToUserGroup(userEMail: string, admin: boolean ) {
    this.authService.getUserByEmail(userEMail).subscribe(results => {
      if (!results.user) {
        alert('User not found');
        return;
      }
      this.userGroupService.assignUserToGroup(this.groupId, results.user._id, admin).subscribe(addUser => {
        this.emailForm.reset();
        this.updateUsers(results.user._id, admin, true, null, results.user.email, results.user.usrProfileFilePath);
      }, err => {
        // console.log(err);
      });
    }, error => {
      // console.log(error);
    });
  }

  getPages(_id: any) {
    const indexOfAction = this.searchObjIdInArray(_id, this.actions);
    this.actionId = _id;
    this.pages = this.actions[indexOfAction].pages;
    if (this.pages.length === 0) {
      this.actions[indexOfAction].hasPageSet.hasPages.forEach( page => {
        this.pages.push({page: page, toAdd: true});
        });
    }
    // console.log(this.pages);
  }

  private searchObjIdInArray(ObjId: any, arrayOfObjects: Array<any>, refObj?: string) {
    // console.log(arrayOfObjects);
   // console.log(ObjId);
    for (let i = 0; i < arrayOfObjects.length; i++) {
      if (arrayOfObjects[i]._id === ObjId) {
        return i;
      }
    }
    return -1;
  }

  deleteUser(userId: any, admin: boolean, removeCompletly: boolean) {
      this.userGroupService.deleteUser(this.groupId, userId, admin).subscribe(deletedUser => {
       this.updateUsers(userId, admin, false, removeCompletly);
      }, err => {
        // console.log(err);
      });
    }

  private updateUsers(id: any, admin: boolean, addOrDelete: boolean, removeCompletly?: boolean, userEMail?: string, usrProfileFilePath?: string) {
    if (addOrDelete) {
      if (admin) {
        this.adminUsers.push({_id: id});
      } else {
        this.users.push({_id: id, usrProfileFilePath: usrProfileFilePath, email: userEMail, password: ''});
        // console.log(this.users);
      }
    } else {
      if ( removeCompletly) {
        let index = this.searchObjIdInArray(id, this.adminUsers);
        if (index !== -1) {
          this.adminUsers.splice(index, 1);
        }
        index = this.searchObjIdInArray(id, this.users);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      } else if ( admin) {
        const index = this.searchObjIdInArray(id, this.adminUsers);
        if (index !== -1) {
          this.adminUsers.splice(index, 1);
        }
      } else {
        const index = this.searchObjIdInArray(id, this.users);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      }
    }
    this.dataSource = new MatTableDataSource(this.users);
  }

  goToDashboard() {
    this.router.navigate(['dashboard'], {});
  }
}
