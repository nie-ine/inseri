import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisObjectManagerComponent } from './synopsis-object-manager.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SynopsisObjectStorageService } from '../synopsis-object-storage.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SynopsisObjectManagerComponent', () => {
  let component: SynopsisObjectManagerComponent;
  let fixture: ComponentFixture<SynopsisObjectManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [SynopsisObjectManagerComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        SynopsisObjectStorageService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisObjectManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
