import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OpenbisLoginComponent } from './openbis-login.component';

describe('OpenbisLoginComponent', () => {
  let component: OpenbisLoginComponent;
  let fixture: ComponentFixture<OpenbisLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenbisLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenbisLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
