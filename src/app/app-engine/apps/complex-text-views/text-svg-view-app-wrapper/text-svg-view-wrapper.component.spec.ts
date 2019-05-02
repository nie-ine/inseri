import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSvgViewWrapperComponent } from './text-svg-view-wrapper.component';

describe('TextSvgViewWrapperComponent', () => {
  let component: TextSvgViewWrapperComponent;
  let fixture: ComponentFixture<TextSvgViewWrapperComponent>;

  beforeEach(async(() => {
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
