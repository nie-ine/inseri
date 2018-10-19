import { Injectable } from '@angular/core';
import { Edition } from '../model/edition.model';
import { HttpClient } from '@angular/common/http';
import {Action} from '../../../shared/nieOS/fake-backend/action/action';
import {ActionService} from '../../../shared/nieOS/fake-backend/action/action.service';
import {EditionService} from '../model/edition.service';

@Injectable()
export class CreateEditionAndLinkToActionService {
  constructor(
    private http: HttpClient,
    private actionService: ActionService,
    private editionService: EditionService
  ) {
  }
  createOrUpdate(
    edition: Edition,
    action: Action
  ) {
    console.log('Create or update edition');
    console.log('Update Action and link hash of edition');
    console.log(action);
    console.log(edition);
    action.hasEdition = edition.hash;
    this.actionService.update(action)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
    console.log('Create Edition, afterwards comment in the check if action has edition');
    this.editionService.create(edition)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
