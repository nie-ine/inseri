import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMainComponentComponent } from './my-main-component.component';

describe('MyMainComponentComponent', () => {
  let component: MyMainComponentComponent;
  let fixture: ComponentFixture<MyMainComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMainComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
