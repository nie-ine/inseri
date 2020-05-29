import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEnvironmentComponent } from './json-environment.component';

describe('JsonEnvironmentComponent', () => {
  let component: JsonEnvironmentComponent;
  let fixture: ComponentFixture<JsonEnvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonEnvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
