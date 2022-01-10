import { Component, OnInit } from '@angular/core';
import { AuthService } from '../mongodb/auth/auth.service';
import {ContactService} from '../mongodb/contact/contact.service';
import {environment} from '../../../environments/environment';
import { PasswordFormatCheckService } from '../shared/password-format-check.service';
import { TermsAndConditions } from './termsAndConditions/termsAndConditions';
import {FileService} from '../file/file.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  userCreated = false;
  validEmail = false;
  acceptTermsBoolean = false;
  neededSpecialCharacters;
  wrongFormatAlert = false;
  newsletter = false;
  environment = environment.node;
  imagePreview: string;
  profilePic: File;

  constructor(
    public authService: AuthService,
    private contactService: ContactService,
    private passwordFormatCheckService: PasswordFormatCheckService,
    private termsAndConditions: TermsAndConditions,
    public fileService: FileService,
  ) {}

  ngOnInit() {
    console.log( this.environment );
    this.model.newsletter = false;
    this.neededSpecialCharacters = this.passwordFormatCheckService.neededSpecialCharacters;
    this.imagePreview = environment.app + '/assets/img/user-icon.png';
  }

  register() {
    console.log( this.newsletter );
    if (this.passwordFormatCheckService.checkProposedPassword(this.model.password)) {
      this.wrongFormatAlert = false;
      this.loading = true;
      if (this.imagePreview) {
        this.model.usrProfileFile = this.profilePic; // I am sending the file
      }
      this.authService.createUser(this.model.email, this.model.password, this.model.firstName, this.model.lastName, this.model.newsletter,
        this.model.usrProfileFile)
        .subscribe(response => {
          console.log(response);
          setTimeout(() => {
            this.userCreated = true;
            if (this.newsletter) {
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
      this.newsletter = e.checked;
    }

  acceptTerms( change: any ) {
    console.log( change.checked );
    this.acceptTermsBoolean = change.checked;
  }

  onProfilePicSelected(event: Event) {
     this.profilePic = (event.target as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(this.profilePic);
  }
}
