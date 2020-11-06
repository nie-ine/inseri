import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatDialog, MatMenu} from '@angular/material';
import {DialogCreateNewPageComponent} from '../../../user-action-engine/page-set/page-set-landing-page/page-set-landing-page.component';
import {Router} from '@angular/router';
import {PageListDialogComponent} from '../page-list-dialog/page-list-dialog.component';
import {PageService} from '../../../user-action-engine/mongodb/page/page.service';
import {SubPageOfPageModel} from '../../../user-action-engine/mongodb/page/subPageOfPage.model';

/**
 * @title Nested menu
 */
@Component({
  selector: 'app-nested-menu',
  templateUrl: 'nested-menu.html',
  exportAs: 'nestedMenu'
})
export class NestedMenu {
  @Input() pages: any;
  @ViewChild(MatMenu) menu;
  @Input() pageSet: any;
  @Input() allPages: SubPageOfPageModel[];
  // @Output() addNewPage = new EventEmitter();
  @Input() pageAsDemo: boolean;
  @Input() preview: boolean;
  @Input() loggedIn: boolean;
  @Input() parentPage: any;
  @Input() actionIDInput: any;
  @Output() subPagesArray = new EventEmitter<SubPageOfPageModel[]>();
  // @Output() actionIDOutput = new EventEmitter<any>();
  private addSubPages: boolean;
  constructor(public dialog: MatDialog,
              public router: Router,
              private pageService: PageService) {
  }
  addNewPage(page) {
    console.log('action Id ', this.actionIDInput);
    console.log('add New Page from the nested menu');
    console.log(page._id);
    console.log(this.allPages);
    const dialogRef = this.dialog.open(DialogCreateNewPageComponent, {
      width: '700px',
      data: { pageset: this.pageSet,
        parentPageId: page._id}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log( result);
      // console.log('before any change');
      // console.log(this.allPages);
      this.searchInSubPages(this.allPages, result);
      console.log('after change');
      console.log(this.allPages);
     // this.allPages.push({page: null, subPages: []});
      this.subPagesArray.emit(this.allPages);
      // this.navigateToOtherView(result);
      // this.actionIDOutput.emit(this.actionIDInput);
    });
  }
  private updatePagesArray(result) {
    // if (result.parentPage === this.parentPage) {
    //   console.log('nested menu didnt update the all Pages obj');
    // } else {
      // for (let i = 0; i < this.allPages.length; i++) {

      // }
      console.log('nested menu update Pages array');
      console.log(this.allPages);
    // }
  }

  private searchInSubPages(subPages: SubPageOfPageModel[], page: any) {
    if (!subPages || subPages.length === 0) {
      return;
    }
   // console.log(subPages);
    for (let i = 0; i < subPages.length; i++) {
      console.log('current page = ', subPages[i].page._id);
      console.log('parent Page = ', this.parentPage._id);
      if (subPages[i].page._id === this.parentPage._id) {
        subPages[i].subPages.push({page: page.page, subPages: []});
        console.log('added 7alawa');
        console.log(subPages);
        return;
      } else {
        this.searchInSubPages(subPages[i].subPages, page);
      }
    }
  }
  // setActionId() {
  //   console.log('action Id Input is ', this.actionIDInput);
  //   this.actionIDOutput.emit(this.actionIDInput);
  // }

  // setActionIdAsOutput(actionId: any) {
  //   this.actionIDOutput = actionId;
  // }

  navigateToOtherView(pageId) {
    console.log(this.actionIDInput);
    this.router.navigate( [ 'page' ], {
      queryParams: {
        'actionID': this.actionIDInput,
        'page': pageId
      }, queryParamsHandling: "merge"
    } );
  }

  addDuplicatedPage() {
    const dialogRef = this.dialog.open(PageListDialogComponent, {
      width: '90%',
      height: '40%',
      data: {
        showDuplicateButton: true
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.pageService.duplicatePage( result, this.pageSet )
        .subscribe(
          data => {
            // this.alreadyLoaded = false;
            this.navigateToOtherView(result);
            // this.generateNavigation(this.actionID, true);
            // console.log( this.pagesOfThisActtion );
          }, error => console.log( error )
        );
    });
  }

  linkExistingPage() {
    const dialogRef = this.dialog.open(PageListDialogComponent, {
      width: '90%',
      height: '40%',
      data: {
        showDuplicateButton: true
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log( 'Link existing ' + result );
      this.pageService.linkExistingPage( result, this.pageSet )
        .subscribe(
          data => {
            // this.alreadyLoaded = false;
            // this.generateNavigation(this.actionID, true);
            this.navigateToOtherView(result);
          }, error => console.log( error )
        );
    });
  }


  addSubPagesEvent() {
    if (this.addSubPages) {
      this.addSubPages = false;
    } else {
      this.addSubPages = true;
    }
  }
}
