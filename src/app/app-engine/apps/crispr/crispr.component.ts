import { Component } from '@angular/core';
import {Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-crispr',
  templateUrl: './crispr.component.html',
  styleUrls: ['./crispr.component.scss']
})
export class CrisprComponent {
  fileToUpload: any;
  form = new FormData();
  showSubmitButton = false;
  pathToFile: SafeResourceUrl;
  fileHasChanged = false;
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  onFileChange(files: FileList): void {

    if ( files.item(0) ) {
      this.fileToUpload = files.item(0);
      this.showSubmitButton = true;
      this.fileHasChanged = true;
    }

    this.form.append('data', this.fileToUpload, 'data' );
  }

  submitFile() {
    this.http.post('http://localhost:4321', this.form, { responseType: 'blob' })
      .subscribe((val) => {
        const blob = new Blob([ val as any ], { type: 'application/pdf' });
        console.log( blob );
        const url = URL.createObjectURL(blob);
        this.pathToFile = this.sanitizer.bypassSecurityTrustResourceUrl( url );
        this.fileHasChanged = false;
    }, error => console.log( error ));
  }
}
