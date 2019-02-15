import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService} from '../../query-engine/fake-backend/auth/altert.service';
import { AuthService } from '../mongodb/auth/auth.service';
import {ContactService} from '../mongodb/contact/contact.service';
import {environment} from '../../../environments/environment';
import { PasswordFormatCheckService } from '../shared/password-format-check.service';

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
  neededSpecialCharacters;
  wrongFormatAlert = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    public authService: AuthService,
    private contactService: ContactService,
    private passwordFormatCheckService: PasswordFormatCheckService
  ) {}

  ngOnInit() {
    this.model.newsletter = false;
    this.neededSpecialCharacters = this.passwordFormatCheckService.neededSpecialCharacters;
  }

  register() {
    if (this.passwordFormatCheckService.checkProposedPassword(this.model.password)) {
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
