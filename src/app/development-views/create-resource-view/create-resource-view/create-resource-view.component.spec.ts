import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourceViewComponent } from './create-resource-view.component';

describe('CreateResourceViewComponent', () => {
  let component: CreateResourceViewComponent;
  let fixture: ComponentFixture<CreateResourceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateResourceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
