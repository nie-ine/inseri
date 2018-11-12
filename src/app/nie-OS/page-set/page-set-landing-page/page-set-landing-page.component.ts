import {Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Router, ActivatedRoute} from '@angular/router';
import {ActionService } from '../../../shared/nieOS/fake-backend/action/action.service';
import {GenerateHashService} from '../../../shared/nieOS/other/generateHash.service';
import {UpdatePageSetComponent} from '../update-page-set/update-page-set.component';
import {CreatePageAndLinkToAction} from '../services/createPageAndLinkToAction.service';
import {CreatePageSetAndLinkToActionService} from '../services/createPageSetAndLinkToAction.service';
import {PageService} from '../../apps/page/page.service';
import {MongoActionService} from '../../../shared/nieOS/mongodb/action/action.service';
import { PageSetModel } from '../model/page-set.model';
import { PageSetService } from '../model/page-set.service';
import { Action } from '../../../shared/nieOS/mongodb/action/action.model';
import {MongoPageService} from '../../../shared/nieOS/mongodb/page/page.service';
import {HttpClient} from '@angular/common/http';
import { EditPageComponent } from "../edit-page/edit-page.component";
import { Page } from "../../../shared/nieOS/mongodb/page/page.model";

@Component({
  selector: 'app-page-set-landing-page',
  templateUrl: './page-set-landing-page.component.html',
  styleUrls: ['./page-set-landing-page.component.scss']
})
export class PageSetLandingPageComponent implements OnInit {
  private static API_BASE_URL = 'http://localhost:3000/api/page';
  animal: string;
  name: string;
  actionID: string;
  pageSet: PageSetModel;
  action: Action;
  model: any;
  pagesOfThisPageSet: any;

  constructor(
    public dialog: MatDialog,
    public dialogUpdatePageSet: MatDialog,
    public dialogEditPage: MatDialog,
    private route: ActivatedRoute,
    private generateHashService: GenerateHashService,
    private actionService: ActionService,
    private pageSetService: PageSetService,
    private createPageSetAndLinkToActionService: CreatePageSetAndLinkToActionService,
    private pageService: PageService,
    private mongoActionService: MongoActionService,
    private mongoPageService: MongoPageService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.actionID = this.route.snapshot.queryParams.actionID;
    if (this.actionID) {
      this.checkIfPageSetExists(this.actionID);
    }
  }

  checkIfPageSetExists(actionID: string ) {
    this.mongoActionService.getAction(actionID)
      .subscribe(data => {
        console.log(data);
        this.action = data.action;
        console.log('point b', this.action);
        if (this.action && this.action.hasPageSet ) {
          console.log('Instantiate Page Set');
          this.pagesOfThisPageSet = [];
          console.log(this.action);
          this.updatePagesOfThisPageSet( this.action );
          this.pageSetService.getPageSet(this.action.hasPageSet)
            .subscribe(
              pageSet => {
                console.log('c', pageSet);
                this.pageSet = pageSet.pageset;
              },
              error => {
                console.log(error);
              });
        } else {
          console.log('bart');
          this.initializeTemplatePageSet();
        }
      }, error => {
        console.log(error);
        this.templatePageSet();
      });
  }

  updatePagesOfThisPageSet(action: any) {
    const help = [];
    for ( const id of action.hasPages ) {
      this.mongoPageService.getPage( id )
        .subscribe(
          response => {
            // console.log(response);
            help[
              help.length
              ] = (response as any).page;
          },
          errorGetPage => {
            console.log(errorGetPage);
          }
        );
    }
    this.pagesOfThisPageSet = help;
    console.log( this.pagesOfThisPageSet );
  }

  initializeTemplatePageSet() {
    this.templatePageSet();
    console.log(this.pageSet, this.action);
    console.log('Save page set and then add page set - hash to action and update action.');

    this.pageSetService.createPageSet(this.pageSet)
      .subscribe(dbPageSet => {
        this.mongoActionService.getAction(this.actionID)
          .subscribe(dbAction => {
            console.log('b', dbPageSet);
            dbAction.action.hasPageSet = dbPageSet.pageset._id;
            this.mongoActionService.updateAction(dbAction.action).subscribe(result => {
              this.action = result.action;
              console.log("here", result);
            });
          });
      });
  }

  templatePageSet() {
    this.pageSet = new PageSetModel();
    console.log('No page set for this action yet');
    this.pageSet.id = this.generateHashService.generateHash();
    this.pageSet.title = 'Example pageSet';
    this.pageSet.linkToImage = 'https://c8.alamy.com/' +
      'comp/DX9AP3/' +
      'open-book-vintage-accessories-old-letters-pages-photo-frames-glasses-DX9AP3.jpg';
    this.pageSet.description = 'Dies als Beispiel für eine PageSet bei NIE-OS';
  }

  generateDescription() {
    if (this.pageSet && this.pageSet.description) {
      return this.pageSet.description;
    } else {
      return 'Description not found';
    }
  }

  generateTitle() {
    if (this.pageSet && this.pageSet.title) {
      return this.pageSet.title;
    } else {
      return 'Title not found';
    }
  }

  generateImage() {
    if (this.pageSet && this.pageSet.linkToImage) {
      return this.pageSet.linkToImage;
    } else {
      return 'Image not found';
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateNewPageComponent, {
      width: '700px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.createPageAndUpdateAction( result, this.route.snapshot.queryParams.actionID );
    });
  }

  createPageAndUpdateAction( page: any, actionId: string ) {
    let action: any = {};
    let pageInResponse: any = {};
    console.log('Create Page and Link to Action');
    console.log( 'Page:', page, 'ActionId:', actionId );
    this.mongoActionService.getAction(actionId)
      .subscribe(response => {
        console.log(response);
        action = (response as any).action;
        this.http.post(`${PageSetLandingPageComponent.API_BASE_URL}`, page)
          .subscribe(response1 => {
            console.log(response1);
            pageInResponse = (response1 as any).page;
            action.hasPages.push( pageInResponse._id );
            this.mongoActionService.updateAction( action )
              .subscribe(response3 => {
                console.log(response3);
                this.updatePagesOfThisPageSet(response3.action);
              }, error3 => {
                console.log(error3);
              });
          }, error => {
            console.log(error);
          });
      }, error => {
        console.log( error );
      });
  }

  openUpdatePageSetDialog() {
    console.log('e', this.action);
    const dialogRef = this.dialogUpdatePageSet.open(UpdatePageSetComponent, {
      width: '700px',
      data: {
        id: this.action.hasPageSet,
        title: this.pageSet.title,
        description: this.pageSet.description,
        linkToImage: this.pageSet.linkToImage
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('d', result);
      if ( result !== undefined ) {
        this.pageSet.title = result.title;
        this.pageSet.description = result.description;
        this.pageSet.linkToImage = result.linkToImage;
      }
    });
  }

  generateURL(page: any) {
    if ( page ) {
      return 'page?actionID=' + this.actionID + '&page=' + page._id;
    }
  }

  generatePageTitle (page: any) {
    if ( page ) {
      return page.title;
    }
  }

  generatePageDescription (page: any ) {
    if ( page ) {
      return page.description;
    }
  }

  editPage(page: Page) {
    const dialogRef = this.dialogEditPage.open(EditPageComponent, {
      width: '1700px',
      data: page,
      hasBackdrop: false
    });
  }
}

@Component({
  selector: 'dialog-create-new-page',
  templateUrl: './dialog-create-new-page.html',
})
export class DialogCreateNewPageComponent {
  model: any = {};
  loading = false;
  actionID: number;
  pageSet: any;
  action: any;
  chooseNewAction: string;

  constructor(public dialogRef: MatDialogRef<DialogCreateNewPageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private actionService: ActionService,
              private route: ActivatedRoute) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  register() {
    this.loading = true;
    console.log(this.model);
  }
}
