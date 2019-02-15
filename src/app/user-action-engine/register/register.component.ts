import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService} from '../../query-engine/fake-backend/auth/altert.service';
import { AuthService } from '../mongodb/auth/auth.service';
import {ContactService} from '../mongodb/contact/contact.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
  model: any = {};
  loading = false;
  userCreated = false;
  validEmail = false;
  acceptTermsBoolean = false;
  neededSpecialCharacters = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  wrongFormatAlert = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    public authService: AuthService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.model.newsletter = false;
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

  register() {
    if (this.checkProposedPassword(this.model.password)) {
      this.wrongFormatAlert = false;
      this.loading = true;
      this.authService.createUser(this.model.email, this.model.password, this.model.firstName, this.model.lastName, this.model.newsletter)
        .subscribe(response => {
          console.log(response);
          setTimeout(() => {
            this.userCreated = true;
            if (this.model.newsletter) {
              const message = 'Guten Tag, ' + this.model.firstName + ', Du hast Dich zu unserem Newsletter angemeldet.' +
                '\n\nBitte klicke auf den folgenden Link, wenn Du Dich abmelden möchtest: \n\n'
                + environment.app + '/deactivate-newsletter?user=' + response.result._id;
              this.contactService.sendMessage(message, this.model.email)
                .subscribe(response1 => {
                  console.log(response1);
                }, error1 => {
                  console.log(error1);
                });
            }
            this.authService.login(
              this.model.email,
              this.model.password,
              false
            );
          }, 2000);
        }, error1 => {
          console.log('Error');
        });
    } else {
      this.wrongFormatAlert = true;
    }
  }

    changeNewsletter(e: any) {
      this.model.newsletter = e.checked;
    }

  acceptTerms( change: any ) {
    console.log( change.checked );
    this.acceptTermsBoolean = change.checked;
  }

}
