import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionViewToolsComponent } from './edition-view-tools.component';

describe('EditionViewToolsComponent', () => {
  let component: EditionViewToolsComponent;
  let fixture: ComponentFixture<EditionViewToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionViewToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionViewToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
