import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.scss']
})
export class EditActionComponent implements OnInit {
    form: FormGroup;
    isLoading: boolean;
    newAction: any;

    constructor(public dialogRef: MatDialogRef<EditActionComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.newAction = this.data;
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
        this.newAction.title = this.form.get('title').value;
        this.newAction.description = this.form.get('description').value;

        console.log(this.newAction);

        // Reqest to edit action Todo
        setTimeout(() => {
            this.isLoading = false;
            this.dialogRef.close();
        }, 500);
    }

    cancel() {
        this.dialogRef.close();
    }

}
