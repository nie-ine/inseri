import {Component, OnInit} from '@angular/core';
import {AuthService} from './user-action-engine/mongodb/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
