import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserlingComponent } from './browserling.component';

describe('BrowserlingComponent', () => {
  let component: BrowserlingComponent;
  let fixture: ComponentFixture<BrowserlingComponent>;

  beforeEach(async(() => {
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
