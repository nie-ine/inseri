import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService} from '../../shared/nieOS/fake-backend/auth/altert.service';
import { UserService } from '../../shared/nieOS/fake-backend/user/user.service';
import { AuthService } from '../../shared/nieOS/mongodb/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    public authService: AuthService
  ) { }

  register() {
    this.loading = true;
    this.authService.createUser(
      this.model.username,
      this.model.password,
      this.model.firstName,
      this.model.lastName
    );
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


}
