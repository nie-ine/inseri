import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { BaseTypeFormsModule } from '../../shared/base-type-forms/base-type-forms.module';

import { ResourceFormComponent } from './resource-form.component';
import { ResourceValueHistoryComponent } from '../resource-value-history/resource-value-history.component';
import { ResourceValueHistoryValueComponent } from '../resource-value-history-value/resource-value-history-value.component';
import { KnoraV1RequestService } from '../../../../query-engine/knora/knora-v1-request.service';

describe('ResourceFormComponent', () => {
  let component: ResourceFormComponent;
  let fixture: ComponentFixture<ResourceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResourceFormComponent,
        ResourceValueHistoryComponent,
        ResourceValueHistoryValueComponent
      ],
      imports: [ FormsModule, BaseTypeFormsModule, HttpClientTestingModule, HttpClientModule ],
      providers: [ KnoraV1RequestService ]
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
