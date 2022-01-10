import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../mongodb/auth/auth.service';
import { PasswordFormatCheckService } from '../shared/password-format-check.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loginError = false;
  password: string;
  resetSuccessfully = false;

  /**
   * Decide if a warning for a bad attempt to reset should be shown.
   * No warning on init, no warning after success.
   */
  wrongFormatAlert = false;

  /**
   * Special characters for passwords. Shown in GUI and used in check.
   */
  neededSpecialCharacters;
  email: string;
  temp: string;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private passwordFormatCheckService: PasswordFormatCheckService
  ) { }

  ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'];
    this.temp = this.route.snapshot.queryParams['temp'];
    this.neededSpecialCharacters = this.passwordFormatCheckService.neededSpecialCharacters;
  }

  resetPassword() {
    console.log( 'Reset Password' );

    if (this.passwordFormatCheckService.checkProposedPassword(this.password)) {

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
            console.log(error1);
          }
        );

      this.wrongFormatAlert = false;
    } else {
      this.wrongFormatAlert = true;
    }
  }
}
