import { Injectable } from '@angular/core';
import { Edition } from '../model/edition.model';
import { HttpClient } from '@angular/common/http';
import {Action} from '../../../shared/models/action';
import {ActionService} from '../../../shared/action.service';
import {EditionService} from '../model/edition.service';
import {GenerateHashService} from'../../../shared/generateHash.service';

@Injectable()
export class CreateViewAndLinkToAction {
  action: any;
  constructor(
    private http: HttpClient,
    private actionService: ActionService,
    private editionService: EditionService,
    private generateHashService: GenerateHashService
  ) {
  }
  createViewAndLinkToAction(
    actionID: number
  ) {
    console.log('Create new View, then append hash to action and updated action');
    console.log(actionID);
    this.actionService.getById( actionID )
      .subscribe(
        action => {
          this.action = action;
          this.action.hasViews[
            this.action.hasViews.length
            ] = this.generateHashService.generateHash();
          console.log(this.action);
          console.log('Get Title and description from input form');
        },
        error => {
          console.log(error);
        });
  }
}
