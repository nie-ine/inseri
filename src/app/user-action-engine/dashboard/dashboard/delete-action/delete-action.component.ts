import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActionService } from '../../../mongodb/action/action.service';
import { PageSetService } from '../../../mongodb/pageset/page-set.service';
import { PageService } from '../../../mongodb/page/page.service';

@Component({
  selector: 'app-delete-action',
  templateUrl: './delete-action.component.html',
  styleUrls: ['./delete-action.component.scss']
})
export class DeleteActionComponent implements OnInit {
  pages: any;
  isLoading: boolean;

  constructor(public dialogRef: MatDialogRef<DeleteActionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private actionService: ActionService,
              private pageService: PageService,
              private pageSetService: PageSetService) {
  }

  ngOnInit() {
    this.isLoading = false;
    if (this.data.type === 'page-set') {
      this.pageSetService.getPageSet(this.data.hasPageSet)
        .subscribe((result) => {
          this.pages = result.pageset.hasPages;
        });
    } else if (this.data.type === 'page') {
      this.pageService.getPage(this.data.hasPage)
        .subscribe((result) => {
          this.pages = [result.page];
        });
    }
  }

  OnDestroy() {
    this.isLoading = false;
  }

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    this.isLoading = true;
    this.actionService.deleteAction(this.data.id)
      .subscribe((result) => {
        if (result.status === 200) {
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
        }
      }, error => {
        this.dialogRef.close();
      });
  }

}
