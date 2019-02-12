import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActionService } from '../../../mongodb/action/action.service';
import { Action } from '../../../mongodb/action/action.model';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.scss']
})
export class EditActionComponent implements OnInit {
    form: FormGroup;
    isLoading: boolean;
    newAction: Action = {
      id: undefined,
      title: '',
      description: '',
      isFinished: false,
      deleted: false,
      type: '',
      hasPage: null,
      hasPageSet: null,
      creator: ''
    };

    constructor(public dialogRef: MatDialogRef<EditActionComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private actionService: ActionService) {
        this.newAction.id = this.data.id;
        this.newAction.title = this.data.title;
        this.newAction.description = this.data.description;
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

        this.actionService.updateAction(this.newAction)
          .subscribe((action) => {
            this.isLoading = false;
            this.dialogRef.close(action);
          });
    }

    cancel() {
        this.dialogRef.close();
    }

}
