import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonEnvironmentComponent } from './python-environment.component';

describe('PythonEnvironmentComponent', () => {
  let component: PythonEnvironmentComponent;
  let fixture: ComponentFixture<PythonEnvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PythonEnvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PythonEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
