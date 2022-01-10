import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-demo-app',
  templateUrl: './demo-app.component.html',
  styleUrls: ['./demo-app.component.scss']
})
export class DemoAppComponent implements OnChanges {

  @Input() ourTestInput: any = 'test';
  inputType: string;
  httpResponse: any;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnChanges(): void {
    if ( this.ourTestInput?.search( 'http' ) !== -1 ) {
      this.inputType = 'we have a url!!';
      this.http.get( this.ourTestInput, { responseType: 'text' } )
      .subscribe(
        data => {
          console.log( data );
          this.httpResponse = data;
        }
      , error => console.log( error )
      ); 
    }
    // for updating and saving a file, please have a look at my-files.component.ts, line 767, service "fileService.updateFile"
  }

}
