import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextLineComponent } from './text-line.component';

describe('TextLineComponent', () => {
  let component: TextLineComponent;
  let fixture: ComponentFixture<TextLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
