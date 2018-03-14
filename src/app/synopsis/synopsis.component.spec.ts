import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SynopsisComponent} from './synopsis.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../../testing/activated-route-stub';
import {SynopsisObjectSerializerServiceStub} from './stubs/synopsis-object-serializer-service-stub';
import {SynopsisObjectSerializerService} from './synopsis-object-serializer.service';

describe('SynopsisComponent', () => {
  let component: SynopsisComponent;
  let fixture: ComponentFixture<SynopsisComponent>;
  const activatedRouteStub = new ActivatedRouteStub();
  const synopsisObjectSerializerStub = new SynopsisObjectSerializerServiceStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SynopsisComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: SynopsisObjectSerializerService, useValue: synopsisObjectSerializerStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
