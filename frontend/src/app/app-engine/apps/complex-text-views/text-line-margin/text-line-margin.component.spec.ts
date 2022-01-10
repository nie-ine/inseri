import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextLineMarginComponent } from './text-line-margin.component';

describe('TextLineMarginComponent', () => {
  let component: TextLineMarginComponent;
  let fixture: ComponentFixture<TextLineMarginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextLineMarginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextLineMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
