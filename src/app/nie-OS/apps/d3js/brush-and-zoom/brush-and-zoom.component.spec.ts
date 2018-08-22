import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushAndZoomComponent } from './brush-and-zoom.component';

describe('BrushAndZoomComponent', () => {
  let component: BrushAndZoomComponent;
  let fixture: ComponentFixture<BrushAndZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrushAndZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushAndZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
