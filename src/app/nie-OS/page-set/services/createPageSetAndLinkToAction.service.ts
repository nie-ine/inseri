import { Injectable } from '@angular/core';
import {PageSetModel} from '../model/page-set.model';
import { HttpClient } from '@angular/common/http';
import {Action} from '../../../shared/nieOS/fake-backend/action/action';
import {ActionService} from '../../../shared/nieOS/fake-backend/action/action.service';
import {PageSetService} from '../model/page-set.service';

@Injectable()
export class CreatePageSetAndLinkToActionService {
  constructor(
    private http: HttpClient,
    private actionService: ActionService,
    private pageSetService: PageSetService
  ) {
  }
  createOrUpdate(
    pageSet: PageSetModel,
    action: Action
  ) {
    console.log('Create or update pageSet');
    console.log('Update Action and link hash of page set');
    console.log(action);
    console.log(pageSet);
    action.hasPageSet = pageSet.hash;
    this.actionService.update(action)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
    console.log('Create PageSet, afterwards comment in the check if action has page set');
    this.pageSetService.create(pageSet)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
