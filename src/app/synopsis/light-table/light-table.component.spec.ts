import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LightTableComponent} from './light-table.component';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';

describe('LightTableComponent', () => {
  let component: LightTableComponent;
  let fixture: ComponentFixture<LightTableComponent>;

  const synopsisObjectSerializerService = jasmine
    .createSpyObj('SynopsisObjectSerializerService', ['makeLightTableSnapshot$', 'loadLightTableSnapshot$']);
  synopsisObjectSerializerService.loadLightTableSnapshot$.and.returnValue({ subscribe: () => {} });
  synopsisObjectSerializerService.makeLightTableSnapshot$.and.returnValue({ subscribe: () => {} });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LightTableComponent],
      providers: [
        SynopsisObjectModifierService,
        {provide: SynopsisObjectSerializerService, useValue: synopsisObjectSerializerService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
