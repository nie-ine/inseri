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
import {ViewService} from "./nie-OS/apps/view/view.service";
import {environment} from '../environments/environment';
import {KuiCoreModule} from "@knora/core";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    KuiCoreModule.forRoot({
      name: environment.name,
      api: environment.api,
      media: environment.media,
      app: environment.app
    }),
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
    fakeBackendProvider,
    ViewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
