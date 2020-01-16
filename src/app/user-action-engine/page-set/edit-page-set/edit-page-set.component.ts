import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PageSetService } from '../../mongodb/pageset/page-set.service';
import { PageSetModel } from '../../mongodb/pageset/page-set.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-page-set',
  templateUrl: './edit-page-set.component.html',
  styleUrls: ['./edit-page-set.component.scss']
})
export class EditPageSetComponent implements OnInit {
  isLoading: boolean;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditPageSetComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private pageSetService: PageSetService) {
    this.isLoading = false;
    console.log(data);
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
    const pageSet = this.data.pageSet;
    pageSet.id = this.data.id;
    pageSet.title = this.form.get('title').value;
    pageSet.description = this.form.get('description').value;
    pageSet.linkToImage = this.form.get('linkToImage').value;

    this.pageSetService.updatePageSet(pageSet)
      .subscribe((result) => {
        console.log(result);
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
