import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Page } from "../../../shared/nieOS/mongodb/page/page.model";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  newPage: Page;

  constructor(public dialogRef: MatDialogRef<EditPageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.newPage = this.data;
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(this.data.title, [Validators.required]),
      description: new FormControl(this.data.description, [Validators.required]),
    });
  }

  save() {
    this.newPage.title = this.form.get('title').value;
    this.newPage.description = this.form.get('description').value;
  }

  cancel() {
    this.dialogRef.close();
  }
}
