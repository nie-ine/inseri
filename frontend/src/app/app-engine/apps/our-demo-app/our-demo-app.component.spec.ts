import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OurDemoAppComponent } from './our-demo-app.component';

describe('OurDemoAppComponent', () => {
  let component: OurDemoAppComponent;
  let fixture: ComponentFixture<OurDemoAppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OurDemoAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurDemoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
