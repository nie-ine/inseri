import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { QueryService } from '../../mongodb/query/query.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-duplicate-page',
  templateUrl: './duplicate-page.component.html',
  styleUrls: ['./duplicate-page.component.scss']
})
export class DuplicatePageComponent implements OnInit {
  isLoading: boolean;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<DuplicatePageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private queryService: QueryService
              ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.form = new FormGroup({
      queries: new FormArray([])
    });

    // Gets the query of the pages
    this.queryService.getAllQueriesOfPage(this.data.page._id)
      .subscribe(data => {

        // Adds the query to the form
        for (let i = 0; i < data.queries.length; i++) {
          (this.form.get('queries') as FormArray).push(new FormGroup({
            'selected': new FormControl(false, [Validators.requiredTrue]),
            'query': new FormControl(data.queries[i]),
          }));
        }

        this.isLoading = false;
      }, error1 => {
        console.log(error1);
        this.isLoading = false;
      });
  }

  getAllControls(): FormArray {
    return (this.form.get('queries') as FormArray);
  }

  // Will be called if checkbox of the query changed
  changeCheckbox(a: any) {
    console.log(a);
  }

  duplicate() {
    // Contains all the valid controls
    const validControls = (this.form.get('queries') as FormArray).controls.filter(a => a.valid);
    // Contains all the selected queries
    const validQueries = [];
    validControls.map( vc => {
      validQueries.push(vc['controls'].query.value);
    });

    console.log(validQueries);

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

}
