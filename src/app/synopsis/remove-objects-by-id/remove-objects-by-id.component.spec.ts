import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RemoveObjectsByIdComponent} from './remove-objects-by-id.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';

describe('RemoveObjectsByIdComponent', () => {
  let component: RemoveObjectsByIdComponent;
  let fixture: ComponentFixture<RemoveObjectsByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveObjectsByIdComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        SynopsisObjectModifierService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveObjectsByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
