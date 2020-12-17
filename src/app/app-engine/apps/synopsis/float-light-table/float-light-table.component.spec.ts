import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {FloatLightTableComponent} from './float-light-table.component';
import {LightTableStashService} from '../light-table-stash.service';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {SynopsisObjectSerializerServiceStub} from '../stubs/synopsis-object-serializer-service-stub';

describe('FloatLightTableComponent', () => {
  let component: FloatLightTableComponent;
  let fixture: ComponentFixture<FloatLightTableComponent>;
  const synopsisObjectSerializerServiceStub = new SynopsisObjectSerializerServiceStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FloatLightTableComponent],
      providers: [
        {provide: LightTableStashService, useValue: {}},
        {provide: SynopsisObjectModifierService, useValue: {}},
        {provide: SynopsisObjectSerializerService, useValue: synopsisObjectSerializerServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*  it('should create', () => {
      expect(component).toBeTruthy();
    });*/
});
