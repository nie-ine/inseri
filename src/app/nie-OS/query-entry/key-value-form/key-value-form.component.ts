import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

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
              value: b['controls'].value.value
          };
      });
      console.log(a);
  }

}
