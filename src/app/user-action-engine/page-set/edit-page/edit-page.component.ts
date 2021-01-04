import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Page } from '../../mongodb/page/page.model';
import { PageService } from '../../mongodb/page/page.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  newPage: Page = {
    id: undefined,
    title : '',
    description: '',
    hash: ''
  };
  pageSetID: string;

  constructor(public dialogRef: MatDialogRef<EditPageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private pageService: PageService) {
    this.newPage.id = this.data.page._id;
    this.newPage.title = this.data.page.title;
    this.newPage.description = this.data.page.description;
    this.pageSetID = this.data.pageSetID;
    this.isLoading = false;
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(this.newPage.title, [Validators.required]),
      description: new FormControl(this.newPage.description, [Validators.required]),
    });
  }

  save() {
    this.isLoading = true;
    this.newPage.title = this.form.get('title').value;
    this.newPage.description = this.form.get('description').value;
    console.log(this.newPage);

    this.pageService.updatePageOfPageSet(this.pageSetID, this.newPage)
      .subscribe(result => {
        if (result.status === 200) {
          console.log(result.body);
          this.isLoading = false;
          this.dialogRef.close();
        } else {
          this.isLoading = false;
          this.dialogRef.close();
        }
      }, error1 => {
        this.isLoading = false;
        this.dialogRef.close();
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
