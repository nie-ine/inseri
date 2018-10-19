import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import {AlertService} from "./shared/nieOS/fake-backend/auth/altert.service";
import {AuthenticationService} from "./shared/nieOS/fake-backend/auth/authentication.service";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./shared/nieOS/fake-backend/auth/jwt.interceptor";
import {fakeBackendProvider} from "./shared/nieOS/fake-backend/fake-backend";
import {AuthGuard} from "./shared/nieOS/fake-backend/auth/auth.guard";
import {UserService} from "./shared/nieOS/fake-backend/user/user.service";
import {ViewService} from "./nie-OS/apps/view/view.service";
import {environment} from '../environments/environment';
import {KuiCoreConfig, KuiCoreModule} from '@knora/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KuiCoreModule.forRoot({
      name: environment.name,
      api: environment.api,
      media: environment.media,
      app: environment.app
    }),
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
    fakeBackendProvider,
    ViewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
