import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DuplicatePageComponent } from './duplicate-page.component';

describe('DuplicatePageComponent', () => {
  let component: DuplicatePageComponent;
  let fixture: ComponentFixture<DuplicatePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
