import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceFormV2Component } from './resource-form-v2.component';

describe('ResourceFormV2Component', () => {
  let component: ResourceFormV2Component;
  let fixture: ComponentFixture<ResourceFormV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceFormV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceFormV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
