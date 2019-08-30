/**
 * This component is the key value form for the query-entry.component
 * */

import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-key-value-form',
  templateUrl: './key-value-form.component.html',
  styleUrls: ['./key-value-form.component.scss']
})
export class KeyValueFormComponent implements OnInit {
  form: FormGroup;
  @Input() param: {key: string, value: string}[];

  constructor() { }

  ngOnInit() {
      this.form = new FormGroup({
          param: new FormArray([
              new FormGroup({
                  'key': new FormControl('', [Validators.required]),
                  'value': new FormControl('', [])
              })
          ])
      });

      this.fillParams();
  }

  fillParams() {
      for (let i = 0; i < this.param.length; i++) {
          if (i === 0) {
              (this.form.get('param') as FormArray).controls[i].setValue({key: this.param[i].key, value: this.param[i].value});
          } else {
              this.addRow(this.param[i].key, this.param[i].value);
          }
      }
  }

  addRow(key: string, value: string) {
    (this.form.get('param') as FormArray).push(new FormGroup({
        'key': new FormControl(key, [Validators.required]),
        'value': new FormControl(value)
    }));
  }

  deleteControl(control: number) {
      (this.form.get('param') as FormArray).removeAt(control);
  }

  getAllControls(): FormArray {
    return (this.form.get('param') as FormArray);
  }

  getValidParams(): {key: string, value: string}[] {
      const validControls = (this.form.get('param') as FormArray).controls.filter(param => param.get('key').valid);

      return validControls.map(b => {
          return {
              'key': b['controls'].key.value,
              'value': b['controls'].value.value
          };
      });
  }

}
