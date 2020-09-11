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
  formData = new FormData();
  showSubmitButton = false;
  constructor(
    private http: HttpClient
  ) {}

  onFileChange(files: FileList): void {

    if ( files.item(0) ) {
      this.fileToUpload = files.item(0);
      this.showSubmitButton = true;
    }

    this.formData.append('file', this.fileToUpload, this.fileToUpload.name);
  }

  submitFile() {
    this.http.post('http://localhost:4321', this.formData)
      .subscribe((val) => {
        console.log(val);
    }, error => console.log( error ));
  }

}
