import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAppComponent } from './demo-app.component';

describe('DemoAppComponent', () => {
  let component: DemoAppComponent;
  let fixture: ComponentFixture<DemoAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
