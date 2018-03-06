import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadLightTableComponent } from './load-light-table.component';
import {MatDialogRef, MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('LoadLightTableComponent', () => {
  let component: LoadLightTableComponent;
  let fixture: ComponentFixture<LoadLightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule
      ],
      declarations: [ LoadLightTableComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
