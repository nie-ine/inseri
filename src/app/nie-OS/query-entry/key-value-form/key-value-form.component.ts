import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-key-value-form',
  templateUrl: './key-value-form.component.html',
  styleUrls: ['./key-value-form.component.scss']
})
export class KeyValueFormComponent implements OnInit {
  form: FormGroup;
  param: any = [];

  constructor() { }

  ngOnInit() {
      this.form = new FormGroup({
          param: new FormArray([
              new FormGroup({
                  'key': new FormControl('', [Validators.required]),
                  'val': new FormControl('', [])
              })
          ])
      });
  }

  addRow() {
    (this.form.get('param') as FormArray).push(new FormGroup({
        'key': new FormControl('', [Validators.required]),
        'val': new FormControl('')
    }));
  }

  deleteRow(row: number) {
      (this.form.get('param') as FormArray).removeAt(row);
  }

  test() {
      console.log('test');
      const bla = (this.form.get('param') as FormArray).controls.filter(param => param.get('key').valid);
      // for (let co of (this.form.get('param') as FormArray).controls) {
      //     console.log(co, typeof(co));
      // }
      const a = bla.map(b => {
          // console.log(b, b['controls']);
          return {
              key: b['controls'].key.value,
              value: b['controls'].val.value
          };
      });
      console.log(a);
  }

}
