import {Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Router, ActivatedRoute} from '@angular/router';
import {ActionService } from '../../../shared/nieOS/fake-backend/action/action.service';
import {PageSetService} from '../model/page-set.service';
import {GenerateHashService} from '../../../shared/nieOS/other/generateHash.service';
import {UpdatePageSetComponent} from '../update-page-set/update-page-set.component';
import {CreatePageAndLinkToAction} from '../services/createPageAndLinkToAction.service';
import {CreatePageSetAndLinkToActionService} from '../services/createPageSetAndLinkToAction.service';
import {PageService} from '../../apps/page/page.service';

@Component({
  selector: 'app-page-set-landing-page',
  templateUrl: './page-set-landing-page.component.html',
  styleUrls: ['./page-set-landing-page.component.scss']
})
export class PageSetLandingPageComponent implements OnInit {

  animal: string;
  name: string;
  actionID: number;
  pageSet: any;
  action: any;
  model: any;
  pagesOfThisPageSet: any;

  constructor(
    public dialog: MatDialog,
    public dialogUpdatePageSet: MatDialog,
    private route: ActivatedRoute,
    private generateHashService: GenerateHashService,
    private actionService: ActionService,
    private createPageSetAndLinkToActionService: CreatePageSetAndLinkToActionService,
    private pageSetService: PageSetService,
    private createPageAndLinkToAction: CreatePageAndLinkToAction,
    private pageService: PageService
  ) { }

  saveOrUpdatePageSet() {
    console.log('Update Page Set');
    this.pageSetService.update(
      this.pageSet
    )
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  ngOnInit() {
    this.actionID = this.route.snapshot.queryParams.actionID;
    this.checkIfPageSetExists( this.actionID );
  }

  checkIfPageSetExists(actionID: number ) {
    this.actionService.getById( actionID )
      .subscribe(
        data => {
          this.action = data;
          if (this.action && this.action.hasPageSet ) {
            console.log('Instantiate Page Set');
            console.log(this.action);
            this.pagesOfThisPageSet = [];
            for ( const pageHash of this.action.hasPages ) {
              this.pageService.getById( pageHash )
                .subscribe(
                  page => {
                    this.pagesOfThisPageSet[
                      this.pagesOfThisPageSet.length
                      ] = page;
                    console.log( page );
                  },
                  errorGetPage => {
                    console.log(errorGetPage);
                  }
                );
            }
            this.pageSetService.getById( this.action.hasPageSet )
              .subscribe(
                pageSet => {
                  this.pageSet = pageSet;
                },
                error => {
                  console.log(error);
                });
          } else {
            this.pageSet = {};
            console.log('No page set for this action yet');
            this.pageSet.hash = this.generateHashService.generateHash();
            this.pageSet.title = 'Example pageSet';
            this.pageSet.linkToImage = 'https://c8.alamy.com/' +
              'comp/DX9AP3/' +
              'open-book-vintage-accessories-old-letters-pages-photo-frames-glasses-DX9AP3.jpg';
            this.pageSet.description = 'Dies als Beispiel für eine PageSet bei NIE-OS\n' +
              '    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\n' +
              '    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n' +
              '    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea\n' +
              '    takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\n' +
              '    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et\n' +
              '    dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo\n' +
              '    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem\n' +
              '    ipsum dolor sit amet.';
            console.log(this.pageSet);
            console.log(this.action);
            console.log('Save page set and then add page set - hash to action and update action.');
            this.createPageSetAndLinkToActionService.createOrUpdate(
              this.pageSet,
              this.action
            );
          }
        },
        error => {
          console.log(error);
        });
  }

  generateDescription() {
    if ( this.pageSet && this.pageSet.description ) {
      return this.pageSet.description;
    } else {
      return 'Description not found';
    }
  }

  generateTitle() {
    if ( this.pageSet && this.pageSet.title ) {
      return this.pageSet.title;
    } else {
      return 'Title not found';
    }
  }

  generateImage() {
    if ( this.pageSet && this.pageSet.linkToImage ) {
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
    const dialogRef = this.dialogUpdatePageSet.open(UpdatePageSetComponent, {
      width: '700px',
      data: {
        title: this.pageSet.title,
        description: this.pageSet.description,
        image: this.pageSet.linkToImage
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result !== undefined ) {
        this.pageSet.title = result.title;
        this.pageSet.description = result.description;
        this.pageSet.linkToImage = result.image;
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
