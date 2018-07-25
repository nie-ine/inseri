import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseTreeComponent } from './response-tree.component';

describe('ResponseTreeComponent', () => {
  let component: ResponseTreeComponent;
  let fixture: ComponentFixture<ResponseTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
