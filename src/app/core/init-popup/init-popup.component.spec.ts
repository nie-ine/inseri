import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitPopupComponent } from './init-popup.component';

describe('InitPopupComponent', () => {
  let component: InitPopupComponent;
  let fixture: ComponentFixture<InitPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
