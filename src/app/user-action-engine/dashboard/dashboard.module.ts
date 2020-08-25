import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {DashboardComponent, DialogOverviewExampleDialog} from './dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EditActionComponent } from './dashboard/edit-action/edit-action.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { DeleteActionComponent } from './dashboard/delete-action/delete-action.component';
import { ImpressumComponent } from './impressum/impressum.component';
import {TermsAndConditions} from '../register/termsAndConditions/termsAndConditions';
import {StaticPagesModule} from '../static-pages.module';
import { HeaderComponent } from '../header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {NIEOSModule} from '../../app-engine/nie-OS.module';


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
        StaticPagesModule,
        MatTooltipModule,
        MatChipsModule,
        MatSelectModule,
        RouterModule.forRoot([
            {path: 'dashboard', component: DashboardComponent},
            {path: 'impressum', component: ImpressumComponent}
        ]),
        NIEOSModule
    ],
  declarations: [
    DashboardComponent,
    DialogOverviewExampleDialog,
    EditActionComponent,
    DeleteActionComponent,
    ImpressumComponent,
    HeaderComponent
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    EditActionComponent,
    DeleteActionComponent
  ],
  providers: [
    TermsAndConditions,
    DatePipe
  ],
  exports: [DashboardComponent, HeaderComponent]
})
export class DashboardModule { }
