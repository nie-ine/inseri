import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionViewStructureComponent } from './edition-view-structure.component';

describe('EditionViewStructureComponent', () => {
  let component: EditionViewStructureComponent;
  let fixture: ComponentFixture<EditionViewStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionViewStructureComponent ]
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
