import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Observable, Subject } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private static API_BASE_URL_USER = 'http://localhost:3000/api/users';
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getToken() {
    return this.token;
  }

  createUser(email: string, password: string, firstName: string, lastName: string, newsletter: boolean): Observable<any> {
    const authData: AuthData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      newsLetter: newsletter
    };
    return this.http.post(`${AuthService.API_BASE_URL_USER}/signup`, authData);
  }

  updateUser(userId: string, email: string, firstName: string, lastName: string, newsletter: boolean): Observable<any> {
    const user: any = {
      userId: userId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      newsletter: newsletter
    };

    return this.http.put<
      {
        token: string,
        expiresIn: number,
        firstName: string,
        userId: string
      }
      >(`${AuthService.API_BASE_URL_USER}/${userId}`, user)
      .map(response => {
        const token = response.token;
        this.token = token;
        const expiresInDuration = response.expiresIn;
        const now = new Date();
        const expirationDate = new Date (now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, response.firstName, response.userId);
        return response;
      });
  }

  updatePwd(userId: string, oldPwd: string, newPwd: string): Observable<any> {
    const pwd: any = {
      userId: userId,
      oldPwd: oldPwd,
      newPwd: newPwd
    };
    return this.http.put(`${AuthService.API_BASE_URL_USER}/${userId}/pwd`, pwd);
  }

  getUser(userId: string): Observable<any> {
    return this.http.get(`${AuthService.API_BASE_URL_USER}/${userId}`);
  }

  login(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http.post<
      {
        token: string,
        expiresIn: number,
        firstName: string,
        userId: string
      }
      >(`${AuthService.API_BASE_URL_USER}/login`, authData)
      .subscribe( response => {
        const token = response.token;
        this.token = token;
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer((expiresInDuration));
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date (now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, response.firstName, response.userId);
        this.router.navigate(['/dashboard' ], {fragment: 'top'});
      });
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // console.log(authInformation, expiresIn);
    if (expiresIn > 0) {
      this.isAuthenticated = true;
      this.token = authInformation.token;
      this.authStatusListener.next(true);
      this.setAuthTimer( expiresIn / 1000);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/home']);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }

  private setAuthTimer(duration: number) {
    // console.log('Setting timer:' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, firstName: string, userId: string) {
    localStorage.setItem(
      'token',
      token
    );
    localStorage.setItem(
      'expiration',
      expirationDate.toISOString()
    );
    localStorage.setItem(
      'firstName',
      firstName
    );
    localStorage.setItem(
      'userId',
      userId
    );
    console.log(localStorage);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

}
