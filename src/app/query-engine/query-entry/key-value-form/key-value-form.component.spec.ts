import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KeyValueFormComponent } from './key-value-form.component';

describe('KeyValueFormComponent', () => {
  let component: KeyValueFormComponent;
  let fixture: ComponentFixture<KeyValueFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyValueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyValueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
