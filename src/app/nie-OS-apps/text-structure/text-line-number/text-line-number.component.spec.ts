import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLineNumberComponent } from './text-line-number.component';

describe('TextLineNumberComponent', () => {
  let component: TextLineNumberComponent;
  let fixture: ComponentFixture<TextLineNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextLineNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextLineNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
