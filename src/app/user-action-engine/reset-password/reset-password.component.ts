import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../mongodb/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loginError = false;
  password: string;
  resetSuccessfully = false;
  email: string;
  temp: string;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'];
    this.temp = this.route.snapshot.queryParams['temp'];
  }

  resetPasswort() {
    console.log( 'Reset Passwort' );
    this.authService.resetPasswordSetNewPassword(
      this.email,
      this.temp,
      this.password
    )
      .subscribe(
        response => {
          console.log(response);
          this.resetSuccessfully = true;
        }, error1 => {
          console.log( error1 );
        }
      );
  }
}
