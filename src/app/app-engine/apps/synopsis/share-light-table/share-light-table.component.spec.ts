import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShareLightTableComponent } from './share-light-table.component';
import {MatDialogRef} from '@angular/material';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {SynopsisObjectSerializerServiceStub} from '../stubs/synopsis-object-serializer-service-stub';
import {LightTableLayoutService} from '../light-table-layout.service';

describe('ShareLightTableComponent', () => {
  let component: ShareLightTableComponent;
  let fixture: ComponentFixture<ShareLightTableComponent>;
  const synopsisObjectSerializerServiceStub = new SynopsisObjectSerializerServiceStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareLightTableComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        LightTableLayoutService,
        {provide: SynopsisObjectSerializerService, useValue: synopsisObjectSerializerServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
