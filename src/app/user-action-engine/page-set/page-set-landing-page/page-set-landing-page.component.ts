import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTreeNestedDataSource} from '@angular/material';
import {Router, ActivatedRoute} from '@angular/router';
import {EditPageSetComponent} from '../edit-page-set/edit-page-set.component';
import {ActionService} from '../../mongodb/action/action.service';
import { Action } from '../../mongodb/action/action.model';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { Page } from '../../../../../backend/models/page.js'; // '../../mongodb/page/page.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeletePageComponent } from '../delete-page/delete-page.component';
import { PageService } from '../../mongodb/page/page.service';
import { DuplicatePageComponent } from '../duplicate-page/duplicate-page.component';
import {PageSetService} from '../../mongodb/pageset/page-set.service';
import {AuthService} from '../../mongodb/auth/auth.service';
import {SubPageOfPageModel} from '../../mongodb/page/subPageOfPage.model';
import {NestedTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-page-set-landing-page',
  templateUrl: './page-set-landing-page.component.html',
  styleUrls: ['./page-set-landing-page.component.scss']
})
export class PageSetLandingPageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogUpdatePageSet: MatDialog,
    public dialogEditPage: MatDialog,
    public dialogDuplicatePage: MatDialog,
    private route: ActivatedRoute,
    private actionService: ActionService,
    private pageSetService: PageSetService,
    private router: Router,
    private authService: AuthService
  ) {}
  name: string;
  actionID: string;
  pageSet: any;
  action: any;
  pagesOfThisPageSet: any;
  isLoading: boolean;
  dataSource = new MatTreeNestedDataSource<SubPageOfPageModel>();
  treeControl = new NestedTreeControl<SubPageOfPageModel>(node => node.subPages);
  /**
   * Describes if user is logged in
   * */
  loggedIn = true;

  /**
   * this variable indicates if page is shown in the preview - mode which indicates how the page would look published.
   * */
  preview = false;
  subPagesOfPage: SubPageOfPageModel[] = [];
  private pageToMove: any;

  hasChild = (_: number, node: SubPageOfPageModel) => !!node.subPages && node.subPages.length > 0;

  ngOnInit() {
    this.isLoading = true;
    this.actionID = this.route.snapshot.queryParams.actionID;
    if (this.actionID) {
      this.checkIfPageSetExists(this.actionID);
    }
    if ( !this.authService.getIsAuth() ) {
      this.preview = true;
      this.loggedIn = false;
    }
    console.log( this.preview );
  }

  checkIfPageSetExists(actionID: string) {
    this.subPagesOfPage = [];
    this.actionService.getAction(actionID)
      .subscribe(data => {
        if ((data.status === 200) && (data.body.action.type === 'page-set')) {
          this.action = data.body.action;
          this.pageSet = this.action.hasPageSet;
          this.pagesOfThisPageSet = this.action.hasPageSet.hasPages;
          this.subPagesOfPage = data.body.hierarchyOfPages;
          this.dataSource.data = this.subPagesOfPage;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          // Fehlermeldung: Action not found
        }
      }, error => {
        console.log(error);
        this.isLoading = false;
        // Fehlermeldung
      });
  }

  goToDashBoard() {
    this.router.navigate(['/dashboard']);
  }

  generateDescription() {
    if (this.pageSet && this.pageSet.description) {
      return this.pageSet.description;
    }
  }

  generateTitle() {
    if (this.pageSet && this.pageSet.title) {
      return this.pageSet.title;
    }
  }

  generateImage() {
    if (this.pageSet && this.pageSet.linkToImage) {
      return this.pageSet.linkToImage;
    }
  }

  addPage() {
    const dialogRef = this.dialog.open(DialogCreateNewPageComponent, {
      width: '700px',
      data: { pageset: this.pageSet }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.checkIfPageSetExists(this.actionID);
    });
  }

  duplicatePage(selectedPage: Page) {
    console.log(selectedPage);
    const dialogRef = this.dialogDuplicatePage.open(DuplicatePageComponent, {
      width: '700px',
      data: {
        page: selectedPage
      }
    });
  }

  editPageSet() {
    const dialogRef = this.dialogUpdatePageSet.open(EditPageSetComponent, {
      width: '700px',
      data: {
        id: this.action.hasPageSet['_id'],
        title: this.pageSet.title,
        description: this.pageSet.description,
        linkToImage: this.pageSet.linkToImage,
        pageSet: this.pageSet
      }
    });
    dialogRef.afterClosed().subscribe(result => {
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

  editPage(page: Page) {
    const dialogRef = this.dialogEditPage.open(EditPageComponent, {
      width: '600px',
      data: {
        page: page,
        pageSetID: this.pageSet['_id']
      },
      hasBackdrop: false
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        this.checkIfPageSetExists(this.actionID);
      });
  }

  deletePage(page: Page) {
    const dialogRef = this.dialogEditPage.open(DeletePageComponent, {
      width: '600px',
      data: {
        page: page,
        pageSetID: this.pageSet['_id']
      },
      hasBackdrop: false
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        this.checkIfPageSetExists(this.actionID);
      });
  }

  switchPages(currentPosition: number, newPosition: number) {
    const currentPage = this.pagesOfThisPageSet[ currentPosition ];
    this.pagesOfThisPageSet[ currentPosition ] = this.pagesOfThisPageSet[ newPosition ];
    this.pagesOfThisPageSet[ newPosition ] = currentPage;
    const pageIdArray = [];
    let i = 0;
    for ( const page of this.pagesOfThisPageSet ) {
      pageIdArray[ i ] = page._id;
      i++;
    }
    this.pageSetService.getPageSet( this.action.hasPageSet._id )
      .subscribe(
        data => {
          const pageSet = data.pageset;
          pageSet.hasPages = pageIdArray;
          pageSet.id = pageSet._id;
          this.pageSetService.updatePageSet( pageSet )
            .subscribe(
              data1 => {
                console.log( data1 );
              }, error2 => {
                console.log( error2 );
              }
            );
        }, error1 => {
          console.log( error1 );
        }
      );
  }

  goToPage( page: any ) {
    console.log( page );
    this.router.navigate(['/page'],
      { queryParams:
          {
            actionID: this.actionID,
            page: page._id
          }
      });
  }

  updatePagesArray(newSubPagesOfPage: SubPageOfPageModel[]) {
    this.subPagesOfPage = newSubPagesOfPage;
    this.dataSource.data = this.subPagesOfPage;
  }

  openMovePageMenu(page: any, menu: Event) {
    this.pageToMove = page;
    console.log(page);
    menu.stopPropagation();
  }
}


@Component({
  selector: 'dialog-create-new-page',
  templateUrl: './dialog-create-new-page.html',
  styleUrls: ['./dialog-create-new-page.scss']
})
export class DialogCreateNewPageComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  pageSetID: any;
  parentPageId: any;
  // subPage: FormControl;
  newPage: Page = {
    id: undefined,
    title: '',
    description: '',
    hash: ''
  };


  constructor(public dialogRef: MatDialogRef<DialogCreateNewPageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private route: ActivatedRoute,
              private pageService: PageService) {
    this.pageSetID = data.pageset._id;
    // this.subPage = new FormControl('false');
    this.parentPageId = data.parentPageId;
  }

  setSubpageValue( value: string ) {
    console.log( value );
  }

  ngOnInit() {
    this.isLoading = false;
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      // subPageCtrl: this.subPage,
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.isLoading = true;
    this.newPage.title = this.form.get('title').value;
    this.newPage.description = this.form.get('description').value;
    // const subPageVal = this.form.get('subPageCtrl').value;
    // console.log(subPageVal);


    if (this.parentPageId) {
      this.pageService.createPage(null, this.newPage, this.parentPageId, true)
        .subscribe((result) => {
          this.isLoading = false;
          // console.log(result);
          // //if (result.status === 201) {
          //   //this.pageId.emit(result.body.subpage._id);
          //   console.log('I am here in the add new subPage');
          //   console.log(result);
          //   console.log(result.subpage._id);
            this.dialogRef.close({page: result.subpage, parentPage: this.parentPageId});
          // } else {
          //   console.log('Dialog closed with no creation');
          //   this.dialogRef.close();
          // }
        }, error => {
          this.isLoading = false;
        });
    } else {
      this.pageService.createPage(this.pageSetID, this.newPage)
        .subscribe((result) => {
          this.isLoading = false;
          // if (result.status === 201) {
          //   console.log('I am here in the add new Page of a subPage');
          //   console.log(result);
          //   console.log(result.page._id);
            this.dialogRef.close({page: result.page, parentPage: null});
          // } else {
          //   console.log('Dialog closed with no creation');
          //   this.dialogRef.close();
          // }
        }, error => {
          this.isLoading = false;
        });
    }


  }

}
