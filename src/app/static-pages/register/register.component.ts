import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService} from '../../shared/nieOS/fake-backend/auth/altert.service';
import { AuthService } from '../../shared/nieOS/mongodb/auth/auth.service';
import {ContactService} from '../../shared/nieOS/mongodb/contact/contact.service';
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

  constructor(
    private router: Router,
    private alertService: AlertService,
    public authService: AuthService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.model.newsletter = false;
  }

  register() {
    this.loading = true;
    this.authService.createUser(this.model.email, this.model.password, this.model.firstName, this.model.lastName, this.model.newsletter)
      .subscribe( response => {
        console.log( response );
        setTimeout(() => {
          this.userCreated = true;
          if ( this.model.newsletter ) {
            const message = 'Guten Tag, ' + this.model.firstName + ', Du hast Dich zu unserem Newsletter angemeldet.' +
              '\n\nBitte klicke auf den folgenden Link, wenn Du Dich abmelden möchtest: \n\n'
              + environment.app + '/deactivate-newsletter?user=' + response.result._id;
            this.contactService.sendMessage( message, this.model.email )
              .subscribe( response1 => {
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
        console.log( 'Error' );
      });
  }

    changeNewsletter(e: any) {
      this.model.newsletter = e.checked;
    }

  acceptTerms( change: any ) {
    console.log( change.checked );
    this.acceptTermsBoolean = change.checked;
  }

}
