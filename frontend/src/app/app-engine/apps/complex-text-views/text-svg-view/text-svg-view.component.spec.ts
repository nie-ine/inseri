import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextSvgViewComponent } from './text-svg-view.component';

describe('TextSvgViewComponent', () => {
  let component: TextSvgViewComponent;
  let fixture: ComponentFixture<TextSvgViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSvgViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSvgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
