import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-our-new-component',
  templateUrl: './our-new-component.component.html',
  styleUrls: ['./our-new-component.component.scss']
})
export class OurNewComponentComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }
  ourFirstVariable: string;
  secondVariable: string;
  name: string;
  description: string;

  ngOnInit() {
    this.ourFirstVariable = 'Hello, this is our first classwide variable';
    this.secondVariable = this.ourFirstVariable + ' and sth added to the first string';

  }

  createNewUserGroup() {
    this.http.post(
      'http://localhost:3000/api/userGroups',
      {
        title: this.name,
        description: this.description
      },  )
      .subscribe(
        response => {
          console.log( response );
        }, error => {
          console.log( error );
        }
      );
  }

}
