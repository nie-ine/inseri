import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PageSetService } from '../model/page-set.service';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.scss']
})
export class DeletePageComponent implements OnInit{
  isLoading: boolean;

  constructor(public dialogRef: MatDialogRef<DeletePageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private pageSetService: PageSetService) {}

  ngOnInit() {
    this.isLoading = false;
  }

  OnDestroy() {
    this.isLoading = false;
  }

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    this.isLoading = true;
    this.pageSetService.deletePage(this.data.pageSetID, this.data.page._id)
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
