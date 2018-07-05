import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceValueHistoryValueComponent } from './resource-value-history-value.component';

describe('ResourceValueHistoryValueComponent', () => {
  let component: ResourceValueHistoryValueComponent;
  let fixture: ComponentFixture<ResourceValueHistoryValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceValueHistoryValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceValueHistoryValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
