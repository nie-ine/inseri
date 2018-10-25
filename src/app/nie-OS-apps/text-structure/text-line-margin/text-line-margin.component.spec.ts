import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLineMarginComponent } from './text-left-margin.component';

describe('TextLeftMarginComponent', () => {
  let component: TextLineMarginComponent;
  let fixture: ComponentFixture<TextLineMarginComponent>;

  beforeEach(async(() => {
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
