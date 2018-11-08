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

@Component({
  selector: 'app-page-set-landing-page',
  templateUrl: './page-set-landing-page.component.html',
  styleUrls: ['./page-set-landing-page.component.scss']
})
export class PageSetLandingPageComponent implements OnInit {
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
    private route: ActivatedRoute,
    private generateHashService: GenerateHashService,
    private actionService: ActionService,
    private pageSetService: PageSetService,
    private createPageSetAndLinkToActionService: CreatePageSetAndLinkToActionService,
    private createPageAndLinkToAction: CreatePageAndLinkToAction,
    private pageService: PageService,
    private mongoActionService: MongoActionService
  ) { }

  // saveOrUpdatePageSet() {
  //   console.log('Update Page Set');
  //   this.pageSetService.updatePageSet(this.pageSet.hash, this.pageSet)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

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
          // for ( const pageHash of this.action.hasPages ) {
          //   this.pageService.getById( pageHash )
          //     .subscribe(
          //       page => {
          //         this.pagesOfThisPageSet[
          //           this.pagesOfThisPageSet.length
          //           ] = page;
          //       },
          //       errorGetPage => {
          //         console.log(errorGetPage);
          //       }
          //     );
          // }
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

    // this.pageSetService.createPageSet(this.pageSet)
    //   .subscribe(result => {
    //     this.action.hasPageSet = result.id;
    //     this.mongoActionService.updateAction(this.action)
    //       .subscribe(() => {},
    //           error => console.log(error));
    //   });

    // Zum Verwerfen
    // this.createPageSetAndLinkToActionService.create(this.pageSet, this.action);
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
      data: { name: this.name, animal: this.animal }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.createPageAndLinkToAction
        .createPageAndLinkToAction(
          this.route.snapshot.queryParams.actionID,
          result
        );
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
      return 'page?actionID=' + this.actionID + '&page=' + page.hash;
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
