import { Injectable } from '@angular/core';
import { Edition } from '../model/edition.model';
import { HttpClient } from '@angular/common/http';
import {Action} from '../../../shared/nieOS/fake-backend/action/action';
import {ActionService} from '../../../shared/nieOS/fake-backend/action/action.service';
import {EditionService} from '../model/edition.service';
import {GenerateHashService} from '../../../shared/nieOS/other/generateHash.service';
import {ViewService} from "../../apps/view/view.service";

@Injectable()
export class CreateViewAndLinkToAction {
  action: any;
  view: any;
  constructor(
    private http: HttpClient,
    private actionService: ActionService,
    private editionService: EditionService,
    private generateHashService: GenerateHashService,
    private viewService: ViewService
  ) {
  }
  createViewAndLinkToAction(
    actionID: number,
    viewFormEntries: any
  ) {
    console.log(viewFormEntries);
    this.view = {};
    this.view.description = viewFormEntries.description;
    this.view.title = viewFormEntries.title;
    this.view.hash = this.generateHashService.generateHash();
    this.viewService.create( this.view )
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
    this.actionService.getById( actionID )
      .subscribe(
        action => {
          this.action = action;
          this.action.hasViews[
            this.action.hasViews.length
            ] = this.view.hash;
          console.log(this.action);
          this.actionService.update( this.action )
            .subscribe( updatedAction => {
              console.log(updatedAction);
            },
              error2 => {
              console.log(error2);
              });
        },
        error => {
          console.log(error);
        });
  }
}
