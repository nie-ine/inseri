import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ReactivateAccountComponent } from './reactivate-account/reactivate-account.component';
import { DeactivateNewsletterComponent } from './deactivate-newsletter/deactivate-newsletter.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {TermsAndConditions} from './register/termsAndConditions/termsAndConditions';
import {PageComponent} from '../app-engine/page/page/page.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'home', component: PageComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reactivate', component: ReactivateAccountComponent },
      { path: 'deactivate-newsletter', component: DeactivateNewsletterComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full'}
      ])
  ],
  declarations: [
    HomeComponent,
    RegisterComponent,
    ReactivateAccountComponent,
    DeactivateNewsletterComponent,
    ResetPasswordComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    TermsAndConditions
  ]
})
export class StaticPagesModule {
}
