import {Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PageSetService } from '../model/page-set.service';
import { PageSetModel } from "../model/page-set.model";

@Component({
  selector: 'app-update-page-set',
  templateUrl: './update-page-set.component.html',
  styleUrls: ['./update-page-set.component.scss']
})
export class UpdatePageSetComponent {

  constructor(public dialogRef: MatDialogRef<UpdatePageSetComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private pageSetService: PageSetService) {
  }

  save() {
    console.log('f', this.data);
    const pageSet = new PageSetModel();
    pageSet.id = this.data.id;
    pageSet.title = this.data.title;
    pageSet.description = this.data.description;
    pageSet.linkToImage = this.data.linkToImage;
    this.pageSetService.updatePageSet(pageSet)
      .subscribe((result) => {
        console.log('point a', result);
        this.dialogRef.close(result.pageset);
      }, (error) => {
        console.log('ERROR in editing a pageSet');
        this.cancel();
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
