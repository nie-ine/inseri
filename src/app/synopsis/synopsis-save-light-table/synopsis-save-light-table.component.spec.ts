import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisSaveLightTableComponent } from './synopsis-save-light-table.component';
import {MatDialogRef, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('SynopsisSaveLightTableComponent', () => {
  let component: SynopsisSaveLightTableComponent;
  let fixture: ComponentFixture<SynopsisSaveLightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      declarations: [ SynopsisSaveLightTableComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisSaveLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
