import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';
import {AlertService} from './shared/nieOS/fake-backend/auth/altert.service';
import {AuthenticationService} from './shared/nieOS/fake-backend/auth/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {fakeBackendProvider} from './shared/nieOS/fake-backend/fake-backend';
import {AuthGuard} from './shared/nieOS/fake-backend/auth/auth.guard';
import {environment} from '../environments/environment';
import {KuiCoreModule} from '@knora/core';

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

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
