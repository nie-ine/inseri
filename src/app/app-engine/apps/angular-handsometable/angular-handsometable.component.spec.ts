import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularHandsometableComponent } from './angular-handsometable.component';

describe('AngularHandsometableComponent', () => {
  let component: AngularHandsometableComponent;
  let fixture: ComponentFixture<AngularHandsometableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularHandsometableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularHandsometableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
