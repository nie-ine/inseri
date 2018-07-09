import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BaseTypeFormsModule } from '../../base-type-forms/base-type-forms.module';

import { ResourceValueHistoryComponent } from './resource-value-history.component';
import { ResourceValueHistoryValueComponent } from '../resource-value-history-value/resource-value-history-value.component';
import { ResourceValueHistoryLinkTargetComponent } from '../resource-value-history-link-target/resource-value-history-link-target.component';

describe('ResourceValueHistoryComponent', () => {
  let component: ResourceValueHistoryComponent;
  let fixture: ComponentFixture<ResourceValueHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceValueHistoryComponent, ResourceValueHistoryValueComponent, ResourceValueHistoryLinkTargetComponent ],
      imports: [ BaseTypeFormsModule, HttpClientModule, HttpClientTestingModule ]
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
