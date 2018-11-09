import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent, DialogOverviewExampleDialog} from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { ActionService } from '../shared/nieOS/fake-backend/action/action.service';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
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
  ],
  providers: [
    ActionService
  ]
})
export class DashboardModule { }
