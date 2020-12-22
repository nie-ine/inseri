import {Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../../user-action-engine/mongodb/page/page.service';
import {SubPageOfPageModel} from '../../../user-action-engine/mongodb/page/subPageOfPage.model';
import {Page} from '../../mongodb/page/page.model';
import {MatMenu} from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-sub-page-list',
  templateUrl: './sub-page-list.component.html',
  exportAs: 'subPageList'
})
export class SubPageListComponent implements OnInit {
  @Input() pages: any;
  @Input() pageToMove: any;
  @ViewChild(MatMenu, { static: true }) menu;
  @Input() pageSet: any;
  @Input() allPages: SubPageOfPageModel[];
  // @Output() addNewPage = new EventEmitter();
  // @Input() pageAsDemo: boolean;
  @Input() preview: boolean;
  // @Input() loggedIn: boolean;
  // @Input() movePage: boolean;
  // @Input() parentPage: any;
  @Input() firstCall:boolean;
  @Input() actionIDInput: any;
  @Output() subPagesArray = new EventEmitter<SubPageOfPageModel[]>();
  private addSubPages: boolean;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger;
  constructor(public dialog: MatDialog,
              public router: Router,
              private pageService: PageService,
              private ren: Renderer2) {
  }

  ngOnInit() {
  }

  addPage( newParent: any) {
    if (newParent === this.pageToMove) {
      alert('You cannot move page to the same page');
      return;
    }
    let oldParent = null;
    for (let i = 0; i < this.allPages.length; i++) {
       if (this.allPages[i].page._id === this.pageToMove) {
         oldParent = null;
         break;
       } else if (this.allPages[i].subPages.length !== 0) {
         oldParent = this.getOldParent(this.allPages[i].subPages, this.allPages[i].page);
         if (oldParent !== null) {
           break;
         }
       }
    }
    this.pageService.movePage(this.pageToMove._id, oldParent, newParent, this.pageSet._id).subscribe((data) => {
      this.subPagesArray.emit((data as any).hierarchyOfPages);
    });
  }

  getOldParent(subPages: SubPageOfPageModel[], oldParent: any) {
    let tempOldParent = null;
      for (let i = 0; i < subPages.length; i++) {
        if (subPages[i].page._id === this.pageToMove._id) {
          return oldParent;
        }
        if (subPages[i].subPages.length !== 0) {
          // tempOldParent = subPages[i].page;
          tempOldParent = this.getOldParent(subPages[i].subPages, subPages[i].page);
          if (tempOldParent !== null) {
            return tempOldParent;
          }
        }
        // } else {
        //   tempOldParent = null;
        // }
      }
    return tempOldParent;
  }
}
