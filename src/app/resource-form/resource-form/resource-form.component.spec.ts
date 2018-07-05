import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BaseTypeFormsModule } from '../../base-type-forms/base-type-forms.module';

import { ResourceFormComponent } from './resource-form.component';
import { ResourceValueHistoryComponent } from '../resource-value-history/resource-value-history.component';
import { ResourceValueHistoryValueComponent } from '../resource-value-history-value/resource-value-history-value.component';

describe('ResourceFormComponent', () => {
  let component: ResourceFormComponent;
  let fixture: ComponentFixture<ResourceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceFormComponent, ResourceValueHistoryComponent, ResourceValueHistoryValueComponent ],
      imports: [ FormsModule, BaseTypeFormsModule, HttpClientTestingModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
