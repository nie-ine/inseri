import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QueryListComponent } from './query-list.component';

describe('QueryListComponent', () => {
  let component: QueryListComponent;
  let fixture: ComponentFixture<QueryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
