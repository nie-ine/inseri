import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/nieOS/mongodb/auth/auth.service';

@Component({
  selector: 'app-reactivate-account',
  templateUrl: './reactivate-account.component.html',
  styleUrls: ['./reactivate-account.component.scss']
})
export class ReactivateAccountComponent {
  password: string;
  loginError = false;
  reactivated = false;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  reactivate() {
    this.authService.reactivateAccount(
      this.route.snapshot.queryParams['user'],
      this.password
    )
      .subscribe( result => {
        this.reactivated = true;
        this.loginError = false;
        console.log( result );
      }, error1 => {
        console.log( error1 );
        this.loginError = true;
      } );
  }

}
