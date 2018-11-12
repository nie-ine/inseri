import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PageSetService } from '../model/page-set.service';
import { PageSetModel } from '../model/page-set.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-page-set',
  templateUrl: './update-page-set.component.html',
  styleUrls: ['./update-page-set.component.scss']
})
export class UpdatePageSetComponent implements OnInit {
  isLoading: boolean;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdatePageSetComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private pageSetService: PageSetService) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(this.data.title, [Validators.required]),
      description: new FormControl(this.data.description, [Validators.required]),
      linkToImage: new FormControl(this.data.linkToImage, [])
    });
  }

  save() {
    this.isLoading = true;
    const pageSet = new PageSetModel();
    pageSet.id = this.data.id;
    pageSet.title = this.form.get('title').value;
    pageSet.description = this.form.get('description').value;
    pageSet.linkToImage = this.form.get('linkToImage').value;

    this.pageSetService.updatePageSet(pageSet)
      .subscribe((result) => {
        this.isLoading = false;
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
