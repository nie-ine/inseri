import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Page } from '../../../shared/nieOS/mongodb/page/page.model';
import { MongoPageService } from "../../../shared/nieOS/mongodb/page/page.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  newPage: Page;

  constructor(public dialogRef: MatDialogRef<EditPageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private mongoPageService: MongoPageService) {
    this.newPage = this.data;
    this.isLoading = false;
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(this.data.title, [Validators.required]),
      description: new FormControl(this.data.description, [Validators.required]),
    });
  }

  save() {
    this.isLoading = true;
    this.newPage.title = this.form.get('title').value;
    this.newPage.description = this.form.get('description').value;

    // Reqest to edit page Todo
    setTimeout(() => {
      this.isLoading = false;
      this.dialogRef.close();
      }, 500);
  }

  cancel() {
    this.dialogRef.close();
  }
}
