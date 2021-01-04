import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LightTableComponent} from './light-table.component';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {SynopsisObjectSerializerServiceStub} from '../stubs/synopsis-object-serializer-service-stub';

describe('LightTableComponent', () => {
  let component: LightTableComponent;
  let fixture: ComponentFixture<LightTableComponent>;
  const synopsisObjectSerializerServiceStub = new SynopsisObjectSerializerServiceStub();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LightTableComponent],
      providers: [
        SynopsisObjectModifierService,
        {provide: SynopsisObjectSerializerService, useValue: synopsisObjectSerializerServiceStub}
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
