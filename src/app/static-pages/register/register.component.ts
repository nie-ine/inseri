import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService} from '../../shared/nieOS/fake-backend/auth/altert.service';
import { AuthService } from '../../shared/nieOS/mongodb/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
  model: any = {};
  loading = false;
  userCreated = false;
  validEmail = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.model.newsletter = true;
  }

  register() {
    this.loading = true;
    this.authService.createUser(this.model.email, this.model.password, this.model.firstName, this.model.lastName, this.model.newsletter)
      .subscribe( response => {
        this.userCreated = true;
      });
/*    this.userService.create(this.model)
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        });*/
  }

    changeNewsletter(e: any) {
      this.model.newsletter = e.checked;
    }

}
