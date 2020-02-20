import {Component, OnInit} from '@angular/core';
import {AuthService} from './user-action-engine/mongodb/auth/auth.service';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
