import {Injectable} from '@angular/core';
import {PageSetModel} from '../model/page-set.model';
import {HttpClient} from '@angular/common/http';
import {Action} from '../../../shared/nieOS/fake-backend/action/action';
import {ActionService} from '../../../shared/nieOS/fake-backend/action/action.service';
import {PageSetService} from '../model/page-set.service';
import {GenerateHashService} from '../../../shared/nieOS/other/generateHash.service';
import {PageService} from '../../apps/page/page.service';

@Injectable()
export class CreatePageAndLinkToAction {
  action: any;
  page: any;
  constructor(
    private http: HttpClient,
    private actionService: ActionService,
    private pageSetService: PageSetService,
    private generateHashService: GenerateHashService,
    private pageService: PageService
  ) {
  }

  createPageAndLinkToAction(
    actionID: number,
    pageFormEntries: any
  ) {
    console.log(pageFormEntries);
    this.page = {};
    this.page.description = pageFormEntries.description;
    this.page.title = pageFormEntries.title;
    this.page.hash = this.generateHashService.generateHash();
    this.pageService.create( this.page )
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
            ] = this.page.hash;
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
