import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RadialBarchartComponent } from './radial-barchart.component';

describe('RadialBarchartComponent', () => {
  let component: RadialBarchartComponent;
  let fixture: ComponentFixture<RadialBarchartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RadialBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
