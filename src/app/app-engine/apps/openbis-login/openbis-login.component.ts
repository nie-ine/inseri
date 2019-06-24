import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-openbis-login',
  templateUrl: './openbis-login.component.html',
  styleUrls: ['./openbis-login.component.scss']
})
export class OpenbisLoginComponent implements OnInit {
  token: string;
  date: any;
  tokenEntered: string;
  constructor() { }

  ngOnInit() {
    this.checkTokenAndDate();
  }

  checkTokenAndDate() {
    setTimeout(() => {
      this.token = localStorage.getItem( 'openBisToken' );
      // console.log( this.token );
      this.date = new Date();
      // console.log( this.date );
      this.checkTokenAndDate();
    }, 2000);
  }

  setToken() {
    localStorage.setItem( 'openBisToken', this.tokenEntered );
  }

}
