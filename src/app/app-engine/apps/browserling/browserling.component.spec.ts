import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrowserlingComponent } from './browserling.component';

describe('BrowserlingComponent', () => {
  let component: BrowserlingComponent;
  let fixture: ComponentFixture<BrowserlingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
