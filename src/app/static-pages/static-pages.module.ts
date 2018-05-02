import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { ArithmeticModule } from 'nie-ine';
import { ExampleComponent } from 'nie-ine';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ArithmeticModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'about', component: AboutComponent },
      { path: 'home', component: HomeComponent },
      { path: 'example', component: ExampleComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full'}
      ])
  ],
  declarations: [
    AboutComponent,
    HomeComponent,
    RegisterComponent],
  exports: [
    AboutComponent,
    HomeComponent]
})
export class StaticPagesModule {
}
