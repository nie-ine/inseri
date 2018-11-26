import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { BaseTypeFormsModule } from '../../shared/base-type-forms/base-type-forms.module';

import { ResourceValueHistoryComponent } from './resource-value-history.component';
import { ResourceValueHistoryValueComponent } from '../resource-value-history-value/resource-value-history-value.component';
import { KnoraV1RequestService } from '../../../shared/knora/knora-v1-request.service';

describe('ResourceValueHistoryComponent', () => {
  let component: ResourceValueHistoryComponent;
  let fixture: ComponentFixture<ResourceValueHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceValueHistoryComponent, ResourceValueHistoryValueComponent ],
      imports: [ BaseTypeFormsModule, HttpClientModule, HttpClientTestingModule ],
      providers: [ KnoraV1RequestService ]
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
