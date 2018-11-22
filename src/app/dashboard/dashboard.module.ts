import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent, DialogOverviewExampleDialog} from './dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { ActionService } from '../shared/nieOS/fake-backend/action/action.service';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EditActionComponent } from './dashboard/edit-action/edit-action.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { DeleteActionComponent } from './dashboard/delete-action/delete-action.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCardModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: DashboardComponent}
    ])
  ],
  declarations: [
    DashboardComponent,
    DialogOverviewExampleDialog,
    EditActionComponent,
    DeleteActionComponent
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    EditActionComponent,
    DeleteActionComponent
  ],
  providers: [
    ActionService
  ]
})
export class DashboardModule { }
