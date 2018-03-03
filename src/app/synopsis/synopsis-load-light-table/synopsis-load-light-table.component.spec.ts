import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisLoadLightTableComponent } from './synopsis-load-light-table.component';
import {MatDialogRef, MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('SynopsisLoadLightTableComponent', () => {
  let component: SynopsisLoadLightTableComponent;
  let fixture: ComponentFixture<SynopsisLoadLightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule
      ],
      declarations: [ SynopsisLoadLightTableComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisLoadLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
