import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import {AlertService} from "./shared/altert.service";
import {AuthenticationService} from "./shared/authentication.service";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./shared/_helpers/jwt.interceptor";
import {fakeBackendProvider} from "./shared/_helpers/fake-backend";
import {AuthGuard} from "./shared/auth.guard";
import {UserService} from "./shared/user.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
