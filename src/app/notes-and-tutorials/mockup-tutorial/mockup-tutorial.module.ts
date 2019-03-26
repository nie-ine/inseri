import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMainComponentComponent } from './my-main-component/my-main-component.component';
import {RouterModule} from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import {MatButtonModule} from '@angular/material/button';
import { TextDisplayComponent } from './text-display/text-display.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forRoot([
      {path: 'my-main-component', component: MyMainComponentComponent}
    ])
  ],
  declarations: [MyMainComponentComponent, NavigationComponent, TextDisplayComponent]
})
export class MockupTutorialModule { }
