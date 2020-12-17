import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TiledLightTableComponent} from './tiled-light-table.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {LightTableLayoutService} from '../light-table-layout.service';
import {LightTableStashService} from '../light-table-stash.service';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {DragService} from '../drag.service';
import {SynopsisObjectSerializerServiceStub} from '../stubs/synopsis-object-serializer-service-stub';

describe('TiledLightTableComponent', () => {
  let component: TiledLightTableComponent;
  let fixture: ComponentFixture<TiledLightTableComponent>;
  const synopsisObjectSerializerServiceStub = new SynopsisObjectSerializerServiceStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TiledLightTableComponent],
      providers: [
        DragService,
        LightTableLayoutService,
        {provide: SynopsisObjectModifierService, useValue: {}},
        {provide: SynopsisObjectSerializerService, useValue: synopsisObjectSerializerServiceStub},
        LightTableStashService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*  it('should create', () => {
      expect(component).toBeTruthy();
    });*/
});
