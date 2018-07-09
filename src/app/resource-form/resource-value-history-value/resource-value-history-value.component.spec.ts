import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BaseTypeFormsModule } from '../../base-type-forms/base-type-forms.module';

import { ResourceValueHistoryValueComponent } from './resource-value-history-value.component';
import { ResourceValueHistoryLinkTargetComponent } from '../resource-value-history-link-target/resource-value-history-link-target.component';

describe('ResourceValueHistoryValueComponent', () => {
  let component: ResourceValueHistoryValueComponent;
  let fixture: ComponentFixture<ResourceValueHistoryValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BaseTypeFormsModule, HttpClientModule, HttpClientTestingModule ],
      declarations: [ ResourceValueHistoryValueComponent, ResourceValueHistoryLinkTargetComponent ]
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
