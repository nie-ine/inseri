import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResourceViewComponent } from './edit-resource-view.component';

describe('EditResourceViewComponent', () => {
  let component: EditResourceViewComponent;
  let fixture: ComponentFixture<EditResourceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResourceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
