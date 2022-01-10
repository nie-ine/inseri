import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsergroupService {

  private static API_BASE_URL_USERGROUP = environment.node + '/api/usergroups';

  constructor(private http: HttpClient) {
  }

  createGroup(title: string, description: string): Observable<any> {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP}`,
      {title: title, description: description}, {observe: 'response'});
  }

  getAllUserGroups() {
    return this.http.get(
      `${UsergroupService.API_BASE_URL_USERGROUP}`, {observe: 'response'});
  }


  assignUserToGroup(groupId: any, id: string, admin: boolean): Observable<any> {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/addMember'}`,
      {groupId: groupId, memberToAdd: id, admin: admin}, {observe: 'response'});
  }

  deleteGroup(groupId: string) {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP  + '/deleteGroup'}`,
      {id: groupId}, {observe: 'response'});
  }

  updateUserGroupDetails(groupId: string, title: string, description: string) {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/updateUserGroup/' + title + '&' + description}`,
      {groupId: groupId}, {observe: 'response'});
  }
  showUserGroupDetails(groupId: string) {
    return this.http.get(`${UsergroupService.API_BASE_URL_USERGROUP + '/showUserGroupDetails/' + groupId }`,
      {observe: 'response'}
      );
  }

  addProjectToUserGroup(_id: string, hasPages: [string] | Array<string>, groupId: string) {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/addProjectToUserGroup/' + groupId}`,
      {actionId: _id, hasPages: hasPages}, {observe: 'response'});
  }

  deleteUser(groupId: string, userId: any, admin: boolean) {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/removeMember'}`,
      {groupId: groupId, memberToRemove: userId, admin: admin}, {observe: 'response'});
  }

  deleteProjectFromUserGroup(actionId: any, groupId: any) {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/removeProject'}`,
      {groupId: groupId, actionId: actionId }, {observe: 'response'});
  }

  addPageToProject(actionId: any, groupId: string, pageId:  any) {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/addPageToProject'}`,
      {actionId: actionId, groupId: groupId, pageId:  pageId },
      {observe: 'response'});
  }

  removePageFromProject(actionId: any, groupId: string, pageId: any) {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/removePageFromProject'}`,
      {actionId: actionId, groupId: groupId, pageId:  pageId },
      {observe: 'response'});
  }
}
