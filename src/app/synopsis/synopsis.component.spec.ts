import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisComponent } from './synopsis.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SynopsisComponent', () => {
  let component: SynopsisComponent;
  let fixture: ComponentFixture<SynopsisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SynopsisComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
