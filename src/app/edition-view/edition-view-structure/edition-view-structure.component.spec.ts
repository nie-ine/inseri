import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionViewStructureComponent } from './edition-view-structure.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditionViewStructureComponent', () => {
  let component: EditionViewStructureComponent;
  let fixture: ComponentFixture<EditionViewStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionViewStructureComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionViewStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
