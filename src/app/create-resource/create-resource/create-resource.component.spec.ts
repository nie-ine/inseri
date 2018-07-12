import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BaseTypeFormsModule } from '../../base-type-forms/base-type-forms.module';

import { CreateResourceComponent } from './create-resource.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KnoraV1RequestService } from '../../shared/knora-v1-request.service';

describe('CreateResourceComponent', () => {
  let component: CreateResourceComponent;
  let fixture: ComponentFixture<CreateResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, BaseTypeFormsModule],
      declarations: [ CreateResourceComponent ],
      providers: [ KnoraV1RequestService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
