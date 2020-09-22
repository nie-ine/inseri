import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {QueryService} from '../../../user-action-engine/mongodb/query/query.service';
import {PageService} from '../../../user-action-engine/mongodb/page/page.service';
import {ActionService} from '../../../user-action-engine/mongodb/action/action.service';
import {PageSetService} from '../../../user-action-engine/mongodb/pageset/page-set.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-list-dialog',
  templateUrl: './page-list-dialog.component.html',
  styleUrls: ['./page-list-dialog.component.scss']
})
export class PageListDialogComponent implements OnInit {
  pages: any;
  value: any;
  displayedColumns = ['goToPage', 'actionTitle', 'title', 'description', 'duplicate'];
  allPageIdsOfUser = [];
  allPagesOfUser = [];
  publishedPages: any;
  publishedPagesLength = 0;
  allPagesLength = 0;
  imagePreview: string;

  constructor(
    public dialogRef: MatDialogRef<PageListDialogComponent>,
    private queryService: QueryService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pageService: PageService,
    private actionService: ActionService,
    private pageSetService: PageSetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pageService.getPublishedPages()
      .subscribe(
        data => {
          this.publishedPages = new MatTableDataSource(( data as any ).pages.slice().reverse());
          this.publishedPagesLength = ( data as any ).pages.length;
        }, error => console.log( error )
      );
    if ( !this.data.showDuplicateButton ) {
      this.displayedColumns = ['goToPage', 'actionTitle', 'title', 'description'];
    }
    this.actionService.getAllActionsOfUser( localStorage.getItem('userId') )
      .subscribe(
        data => {
          // console.log( data );
          for ( const action of data.actions ) {
            if ( action.hasPageSet !== null ) {
              this.pageSetService.getPageSet( action.hasPageSet )
                .subscribe(
                  pageSets => {
                    if ( pageSets.pageset.hasPages ) {
                      this.goThroughPageIdArray( pageSets.pageset.hasPages, action );
                    }
                  }, error1 => console.log( error1 )
                );
            }
          }
        }, error => console.log( error )
      );
    this.updateTable();
  }

  goThroughPageIdArray( hasPages: Array<any>, action: any ) {
    // console.log( action );
    for ( const pageId of hasPages ) {
      this.pageService.getPage( pageId )
        .subscribe(
          pageResponse => {
            // console.log( pageResponse );
            const page = pageResponse.page;
            page.actionTitle = action.title;
            page.actionId = action._id;
            this.allPagesOfUser.push( pageResponse.page );
            // this.updateTable();
          }, error => console.log( error )
        );
      }
    }

  updateTable() {
    setTimeout(() => {
      this.pages = new MatTableDataSource( this.allPagesOfUser.slice().reverse());
    }, 5000);
  }

  close() {
    this.dialogRef.close();
  }

  applyFilter(filterValue: string) {
    console.log( filterValue );
    this.pages.filter = filterValue.trim().toLowerCase();
  }

  slice(description: string): string {
    if (description) {
      return description.length > 120 ? (description.slice(0, 120)).concat('...') : description;
    } else {
      return '[no description]';
    }
  }

  continueAction( page: any ) {
    this.router.navigate( [ '/page' ],
      {
        queryParams: {
          'actionID': page.actionId,
          'page': page._id
        },
      });
    this.close();
  }

}
