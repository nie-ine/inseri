import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextSvgViewWrapperComponent } from './text-svg-view-wrapper.component';

describe('TextSvgViewWrapperComponent', () => {
  let component: TextSvgViewWrapperComponent;
  let fixture: ComponentFixture<TextSvgViewWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSvgViewWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSvgViewWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
