import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceValueHistoryComponent } from './resource-value-history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ResourceValueHistoryComponent', () => {
  let component: ResourceValueHistoryComponent;
  let fixture: ComponentFixture<ResourceValueHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceValueHistoryComponent ],
      imports: [ HttpClientModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceValueHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
