import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FloatLightTableComponent} from './float-light-table.component';
import {LightTableStashService} from '../light-table-stash.service';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';

describe('FloatLightTableComponent', () => {
  let component: FloatLightTableComponent;
  let fixture: ComponentFixture<FloatLightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FloatLightTableComponent],
      providers: [
        {provide: LightTableStashService, useValue: {}},
        {provide: SynopsisObjectModifierService, useValue: {}},
        {provide: SynopsisObjectSerializerService, useValue: {}}
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
