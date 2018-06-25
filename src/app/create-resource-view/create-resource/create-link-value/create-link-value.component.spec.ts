import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLinkValueComponent } from './create-link-value.component';

describe('CreateLinkValueComponent', () => {
  let component: CreateLinkValueComponent;
  let fixture: ComponentFixture<CreateLinkValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLinkValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLinkValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
