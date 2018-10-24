import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourceModule } from '../../../create-resource/create-resource.module';
import { CreateResourceViewComponent } from './create-resource-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KnoraV1RequestService } from '../../../shared/knora/knora-v1-request.service';

describe('CreateResourceViewComponent', () => {
  let component: CreateResourceViewComponent;
  let fixture: ComponentFixture<CreateResourceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreateResourceModule, HttpClientTestingModule],
      declarations: [ CreateResourceViewComponent ],
      providers: [ KnoraV1RequestService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
