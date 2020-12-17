import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QueryEntryComponent } from './query-entry.component';

describe('QueryEntryComponent', () => {
  let component: QueryEntryComponent;
  let fixture: ComponentFixture<QueryEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
