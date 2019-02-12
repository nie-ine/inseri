import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { BaseTypeFormsModule } from '../../shared/base-type-forms/base-type-forms.module';

import { ResourceValueHistoryValueComponent } from './resource-value-history-value.component';
import { KnoraV1RequestService } from '../../../../query-engine/knora/knora-v1-request.service';

describe('ResourceValueHistoryValueComponent', () => {
  let component: ResourceValueHistoryValueComponent;
  let fixture: ComponentFixture<ResourceValueHistoryValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BaseTypeFormsModule, HttpClientModule, HttpClientTestingModule ],
      declarations: [ ResourceValueHistoryValueComponent ],
      providers: [ KnoraV1RequestService ]
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
