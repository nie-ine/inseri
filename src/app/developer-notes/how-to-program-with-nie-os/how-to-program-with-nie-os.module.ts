import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPractiseComponentComponent } from './my-practise-component/my-practise-component.component';
import {RouterModule} from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forRoot([
      {path: 'my-practise-component', component: MyPractiseComponentComponent}
    ])
  ],
  declarations: [MyPractiseComponentComponent, NavigationComponent]
})
export class HowToProgramWithNieOSModule { }
