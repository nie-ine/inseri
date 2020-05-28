import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CoreModule} from './user-action-engine/core.module';
import {AppComponent} from './app.component';
import {FakeBackendInterceptor} from './query-engine/fake-backend/fake-backend';
import {environment} from '../environments/environment';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {AuthService} from './user-action-engine/mongodb/auth/auth.service';
import { JsonEnvironmentComponent } from './app-engine/apps/json-environment/json-environment.component';


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
    // provider used to create fake backend
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JsonEnvironmentComponent, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
