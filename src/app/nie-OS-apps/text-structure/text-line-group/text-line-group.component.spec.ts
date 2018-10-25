import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLineGroupComponent } from './text-line-group.component';

describe('TextLineGroupComponent', () => {
  let component: TextLineGroupComponent;
  let fixture: ComponentFixture<TextLineGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextLineGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextLineGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
