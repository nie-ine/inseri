import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPractiseComponentComponent } from './my-practise-component/my-practise-component.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: 'my-practise-component', component: MyPractiseComponentComponent}
    ])
  ],
  declarations: [MyPractiseComponentComponent]
})
export class HowToProgramWithNieOSModule { }
