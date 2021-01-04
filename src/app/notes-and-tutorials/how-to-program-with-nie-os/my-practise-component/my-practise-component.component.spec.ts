import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyPractiseComponentComponent } from './my-practise-component.component';

describe('MyPractiseComponentComponent', () => {
  let component: MyPractiseComponentComponent;
  let fixture: ComponentFixture<MyPractiseComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPractiseComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPractiseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
