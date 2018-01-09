import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AboutComponent, HomeComponent]
})
export class StaticPagesModule { }
