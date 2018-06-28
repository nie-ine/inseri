import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourceModule } from '../../../create-resource/create-resource.module';
import { CreateResourceViewComponent } from './create-resource-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('CreateResourceViewComponent', () => {
  let component: CreateResourceViewComponent;
  let fixture: ComponentFixture<CreateResourceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreateResourceModule, HttpClientModule, HttpClientTestingModule],
      declarations: [ CreateResourceViewComponent ]
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
