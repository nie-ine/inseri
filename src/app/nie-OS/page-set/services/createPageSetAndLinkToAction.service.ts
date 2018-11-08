import { Injectable } from '@angular/core';
import {PageSetModel} from '../model/page-set.model';
import { HttpClient } from '@angular/common/http';
import { MongoActionService } from '../../../shared/nieOS/mongodb/action/action.service';
import { Action } from '../../../shared/nieOS/mongodb/action/action.model';

@Injectable()
export class CreatePageSetAndLinkToActionService {
  constructor(
    private http: HttpClient,
    private actionService: MongoActionService,
  ) {}

  create(
    pageSet: PageSetModel,
    action: Action
  ) {
    console.log('Create or update pageSet');
    console.log('Update Action and link hash of page set');
    console.log(action, pageSet);
    action.hasPageSet = pageSet.id;

    // this.actionService.createAction(action)
    //   .subscribe(
    //     data1 => {
    //       console.log(data1);
    //       this.actionService.createPageSet(pageSet).subscribe(
    //         data2 => {
    //           console.log(data2);
    //         },
    //         error => {
    //           console.log(error);
    //         });
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }
}
