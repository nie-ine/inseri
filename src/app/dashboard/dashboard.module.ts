import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent, DialogOverviewExampleDialog} from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: DashboardComponent}
    ])
  ],
  declarations: [
    DashboardComponent,
    DialogOverviewExampleDialog
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ]
})
export class DashboardModule { }
