import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLightTableComponent } from './save-light-table.component';
import {MatDialogRef, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('SaveLightTableComponent', () => {
  let component: SaveLightTableComponent;
  let fixture: ComponentFixture<SaveLightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      declarations: [ SaveLightTableComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
