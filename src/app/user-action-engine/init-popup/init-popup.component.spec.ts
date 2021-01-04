import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InitPopupComponent } from './init-popup.component';

describe('InitPopupComponent', () => {
  let component: InitPopupComponent;
  let fixture: ComponentFixture<InitPopupComponent>;

  beforeEach(waitForAsync(() => {
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
