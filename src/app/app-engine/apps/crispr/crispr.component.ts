import { Component } from '@angular/core';
import {Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-crispr',
  templateUrl: './crispr.component.html',
  styleUrls: ['./crispr.component.scss']
})
export class CrisprComponent {
  fileToUpload: any;
  form = new FormData();
  showSubmitButton = false;
  constructor(
    private http: HttpClient
  ) {}

  onFileChange(files: FileList): void {

    if ( files.item(0) ) {
      this.fileToUpload = files.item(0);
      this.showSubmitButton = true;
    }

    this.form.append('data', this.fileToUpload, 'data' );
  }

  submitFile() {
    this.http.post('http://localhost:4321', this.form)
      .subscribe((val) => {
        console.log(val);
    }, error => console.log( error ));
  }
}
