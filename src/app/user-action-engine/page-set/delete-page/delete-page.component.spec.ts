import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePageComponent } from './delete-page.component';

describe('DeletePageComponent', () => {
  let component: DeletePageComponent;
  let fixture: ComponentFixture<DeletePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
