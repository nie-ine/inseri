import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ResourceValueHistoryLinkTargetComponent } from './resource-value-history-link-target.component';

describe('ResourceValueHistoryLinkTargetComponent', () => {
  let component: ResourceValueHistoryLinkTargetComponent;
  let fixture: ComponentFixture<ResourceValueHistoryLinkTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceValueHistoryLinkTargetComponent ],
      imports: [ HttpClientModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceValueHistoryLinkTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
