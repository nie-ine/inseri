import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialBarchartComponent } from './radial-barchart.component';

describe('RadialBarchartComponent', () => {
  let component: RadialBarchartComponent;
  let fixture: ComponentFixture<RadialBarchartComponent>;

  beforeEach(async(() => {
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
