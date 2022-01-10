import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../mongodb/auth/auth.service';

@Component({
  selector: 'app-deactivate-newsletter',
  templateUrl: './deactivate-newsletter.component.html'
})
export class DeactivateNewsletterComponent implements OnInit {
  password: string;
  loginError = false;
  reactivated = false;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log( this.route.snapshot.queryParams['user'] );
    this.authService.deactivateNewsletter(
      this.route.snapshot.queryParams['user']
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
