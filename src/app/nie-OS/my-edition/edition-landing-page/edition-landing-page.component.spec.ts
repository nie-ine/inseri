import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionLandingPageComponent } from './edition-landing-page.component';

describe('EditionLandingPageComponent', () => {
  let component: EditionLandingPageComponent;
  let fixture: ComponentFixture<EditionLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
