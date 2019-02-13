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

  /**
   * Decide if a warning for a bad attempt to reset should be shown.
   * No warning on init, no warning after success.
   */
  wrongFormatAlert = false;

  /**
   * Special characters for passwords. Shown in GUI and used in check.
   */
  neededSpecialCharacters = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
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

  /**
   * Check if a candidate for a new password fulfils some typical password-specific requirements.
   * True if the password is valid, false if the password is invalid.
   * @param password: the candidate for the new password
   */
  checkProposedPassword(password): boolean {
    let isValidPassword = true;

    // Reject passwords without upper-case letters.
    if (/[A-Z]/.test(password) === false) {
      isValidPassword = false;
    }

    // Reject passwords without lower-case letters.
    if (/[a-z]/.test(password) === false) {
      isValidPassword = false;
    }

    // Reject passwords without numbers.
    if (/[0-9]/.test(password) === false) {
      isValidPassword = false;
    }

    // Reject passwords without special characters.
    const setOfSpecials = new RegExp('[' + this.neededSpecialCharacters + ']');
    if (setOfSpecials.test(password) === false) {
      isValidPassword = false;
    }

    // Reject passwords that are shorter than 9 characters.
    if (password.length < 9) {
      isValidPassword = false;
    }

    return isValidPassword;
  }

  resetPassword() {
    console.log( 'Reset Password' );

    if (this.checkProposedPassword(this.password)) {

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
